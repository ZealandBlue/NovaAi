"""Reinforcement learning control loop for live adaptation.

This is a simplified on-policy update loop stub. The actual algorithm
(PPO, A2C, DQN, etc.) is left to you.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List


@dataclass
class Experience:
  state: Any
  action: int
  reward: float
  next_state: Any
  done: bool


@dataclass
class RLLearnerState:
  episodes_trained: int = 0
  last_reward: float = 0.0
  last_action: str = "hold"
  running_return: float = 0.0
  buffer: List[Experience] = field(default_factory=list)


class RLLearner:
  """Tiny RL facade around the trading model.

  For now, it just tracks rewards and could be extended with a real RL alg.
  """

  def __init__(self) -> None:
    self.state = RLLearnerState()

  def record_experience(self, exp: Experience) -> None:
    self.state.buffer.append(exp)
    self.state.last_reward = exp.reward

  def train_step(self) -> Dict[str, Any]:
    """Perform a single training iteration over the buffer.

    Returns a dict summarizing training progress.
    """

    if not self.state.buffer:
      return {"status": "no_data"}

    total_reward = sum(e.reward for e in self.state.buffer)
    self.state.running_return = 0.9 * self.state.running_return + 0.1 * total_reward
    self.state.episodes_trained += 1
    self.state.buffer.clear()

    return {
      "status": "ok",
      "episodes_trained": self.state.episodes_trained,
      "running_return": self.state.running_return,
    }
