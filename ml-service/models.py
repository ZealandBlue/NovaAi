"""Model definitions: LSTM + CNN hybrid for pattern recognition.

This is intentionally lightweight and suitable as a scaffold. The core idea:

- A 1D CNN stack extracts local temporal patterns from features.
- An LSTM processes the resulting sequence for longer-term dependencies.
- Final dense layers output an action logits vector and a value estimate.
"""

from __future__ import annotations

from typing import Tuple

import numpy as np
import torch
import torch.nn as nn


class HybridCnnLstm(nn.Module):
  def __init__(self, in_features: int, num_actions: int = 3, hidden_size: int = 64):
    super().__init__()
    self.conv = nn.Sequential(
      nn.Conv1d(in_channels=in_features, out_channels=32, kernel_size=3, padding=1),
      nn.ReLU(),
      nn.Conv1d(in_channels=32, out_channels=32, kernel_size=3, padding=1),
      nn.ReLU(),
    )
    self.lstm = nn.LSTM(input_size=32, hidden_size=hidden_size, batch_first=True)
    self.policy_head = nn.Linear(hidden_size, num_actions)
    self.value_head = nn.Linear(hidden_size, 1)

  def forward(self, x: torch.Tensor) -> Tuple[torch.Tensor, torch.Tensor]:
    # x: [B, T, F]
    x = x.transpose(1, 2)  # [B, F, T]
    x = self.conv(x)       # [B, C, T]
    x = x.transpose(1, 2)  # [B, T, C]
    out, _ = self.lstm(x)
    last = out[:, -1, :]
    logits = self.policy_head(last)
    value = self.value_head(last)
    return logits, value


ACTION_INDEX = {"hold": 0, "buy": 1, "sell": 2}


class PatternModel:
  """High-level wrapper around the hybrid model.

  In a real deployment you would load trained weights from disk.
  """

  def __init__(self, in_features: int, device: str = "cpu"):
    self.device = torch.device(device)
    self.net = HybridCnnLstm(in_features=in_features).to(self.device)
    self.net.eval()

  def predict(self, x: np.ndarray) -> Tuple[str, float, str]:
    """Run a forward pass.

    Args:
      x: feature tensor [1, T, F]
    Returns:
      action ("buy"/"sell"/"hold"), confidence, reasoning string
    """

    with torch.no_grad():
      tensor = torch.from_numpy(x).to(self.device)
      logits, _value = self.net(tensor)
      probs = torch.softmax(logits, dim=-1).cpu().numpy()[0]

    idx = int(probs.argmax())
    inv_map = {v: k for k, v in ACTION_INDEX.items()}
    action = inv_map.get(idx, "hold")
    confidence = float(probs[idx])

    reasoning = f"Hybrid CNN-LSTM detected pattern favouring {action} with confidence {confidence:.2f}."  # noqa: E501
    return action, confidence, reasoning
