"""Data loading utilities for candlesticks and order book snapshots.

This module defines lightweight abstractions around market data sources.
Real integrations (centralized exchanges, BlockDAG L1 indexers, etc.)
should plug in by implementing the abstract interfaces here.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import Iterable, List, Optional

import numpy as np


@dataclass
class Candle:
  """Single OHLCV candle."""

  timestamp: datetime
  open: float
  high: float
  low: float
  close: float
  volume: float


@dataclass
class OrderBookLevel:
  price: float
  size: float


@dataclass
class OrderBookSnapshot:
  """Simplified order book snapshot (top N levels)."""

  timestamp: datetime
  bids: List[OrderBookLevel]
  asks: List[OrderBookLevel]


class MarketDataSource:
  """Abstract source of market data.

  Implementations should provide access to historical candles
  and recent order book snapshots.
  """

  def get_recent_candles(self, symbol: str, timeframe: str, limit: int = 500) -> List[Candle]:  # pragma: no cover - interface
    raise NotImplementedError

  def get_recent_orderbooks(self, symbol: str, limit: int = 50) -> List[OrderBookSnapshot]:  # pragma: no cover - interface
    raise NotImplementedError


class InMemoryMarketDataSource(MarketDataSource):
  """Toy in-memory implementation useful for tests or dry runs."""

  def __init__(self, candles: Iterable[Candle], orderbooks: Iterable[OrderBookSnapshot]):
    self._candles = list(candles)
    self._orderbooks = list(orderbooks)

  def get_recent_candles(self, symbol: str, timeframe: str, limit: int = 500) -> List[Candle]:  # noqa: ARG002
    return self._candles[-limit:]

  def get_recent_orderbooks(self, symbol: str, limit: int = 50) -> List[OrderBookSnapshot]:  # noqa: ARG002
    return self._orderbooks[-limit:]


def candles_to_numpy(candles: List[Candle]) -> np.ndarray:
  """Convert list of Candle objects to numpy array [T, 6]."""

  arr = np.zeros((len(candles), 6), dtype=np.float32)
  for i, c in enumerate(candles):
    arr[i] = [c.open, c.high, c.low, c.close, c.volume, c.timestamp.timestamp()]
  return arr


def orderbooks_to_numpy(books: List[OrderBookSnapshot], depth: int = 10) -> np.ndarray:
  """Convert order books to numpy array [T, 4*depth].

  Layout: [bid_price_0, bid_size_0, ..., ask_price_0, ask_size_0, ...].
  """

  arr = np.zeros((len(books), depth * 4), dtype=np.float32)
  for t, ob in enumerate(books):
    for i in range(depth):
      if i < len(ob.bids):
        arr[t, 2 * i] = ob.bids[i].price
        arr[t, 2 * i + 1] = ob.bids[i].size
      if i < len(ob.asks):
        offset = 2 * depth
        arr[t, offset + 2 * i] = ob.asks[i].price
        arr[t, offset + 2 * i + 1] = ob.asks[i].size
  return arr
