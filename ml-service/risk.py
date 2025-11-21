"""Risk management utilities (position sizing, stop loss, take profit)."""

from __future__ import annotations

from typing import Dict


def compute_position_size(balance: float, risk_per_trade: float, stop_distance: float) -> float:
  """Basic fixed-fractional position sizing.

  Args:
    balance: account equity in quote currency.
    risk_per_trade: fraction of equity to risk (0.0 - 1.0).
    stop_distance: relative distance between entry and stop (e.g. 0.01).
  """

  if stop_distance <= 0:
    return 0.0
  risk_amount = balance * risk_per_trade
  size = risk_amount / stop_distance
  return max(size, 0.0)


def propose_risk_parameters(last_price: float, mode: str, base_risk: float = 0.005) -> Dict[str, float]:
  """Return stop loss & take profit multipliers and position sizing fraction."""

  if mode == "AUTONOMOUS":
    risk = base_risk
    stop_mult = 0.01
    tp_mult = 0.02
  elif mode == "LEARNING":
    risk = base_risk * 0.5
    stop_mult = 0.015
    tp_mult = 0.03
  else:  # SIMULATION or fallback
    risk = base_risk
    stop_mult = 0.012
    tp_mult = 0.024

  return {
    "risk_per_trade": risk,
    "stop_distance": stop_mult * last_price,
    "take_profit_distance": tp_mult * last_price,
  }
