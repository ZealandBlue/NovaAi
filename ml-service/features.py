"""Feature engineering for the AI trading widget.

Transforms raw candlestick and order book tensors into model-ready features.
"""

from __future__ import annotations

from typing import Dict, Tuple

import numpy as np


def normalize_prices(prices: np.ndarray) -> np.ndarray:
  """Simple price normalization by last close.

  Args:
    prices: array [..., 4] with OHLC.
  """

  ref = prices[..., -1].reshape(*prices.shape[:-1], 1)
  ref = np.where(ref == 0, 1.0, ref)
  return prices / ref


def compute_returns(closes: np.ndarray, window: int = 1) -> np.ndarray:
  """Compute log returns over a given window."""

  shifted = np.roll(closes, window, axis=0)
  shifted[:window] = closes[:window]
  eps = 1e-8
  return np.log((closes + eps) / (shifted + eps))


def build_feature_tensor(candle_arr: np.ndarray, book_arr: np.ndarray) -> np.ndarray:
  """Combine candle and order book arrays into single feature tensor.

  Result shape: [T, F]. For a real system you might return [T, C, H, W]
  for CNNs or [T, D] for LSTMs. Here we keep it simple.
  """

  # Candle columns: [open, high, low, close, volume, ts]
  ohlcv = candle_arr[:, :5]
  norm_ohlcv = normalize_prices(ohlcv)
  closes = candle_arr[:, 3]
  rets = compute_returns(closes)
  rets = rets.reshape(-1, 1)

  # Concatenate everything along feature dimension
  return np.concatenate([norm_ohlcv, rets, book_arr], axis=1)


def build_model_inputs(candle_arr: np.ndarray, book_arr: np.ndarray, seq_len: int = 64) -> Tuple[np.ndarray, Dict[str, float]]:
  """Prepare model inputs and meta info.

  Returns:
    x: feature tensor [1, seq_len, F]
    meta: dict with helper values (e.g. last price)
  """

  feats = build_feature_tensor(candle_arr, book_arr)
  if feats.shape[0] < seq_len:
    # Pad by repeating earliest rows
    pad = np.repeat(feats[:1], seq_len - feats.shape[0], axis=0)
    feats = np.concatenate([pad, feats], axis=0)
  else:
    feats = feats[-seq_len:]

  last_close = float(candle_arr[-1, 3])

  x = feats[None, ...].astype(np.float32)
  meta = {"last_close": last_close}
  return x, meta
