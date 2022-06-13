import * as React from "react";

import ToyTrainButton from "./components/toy-train-button";

enum GameState {
  Preloading,
  Title,
  Introduction,
  Countdown,
  Game,
  Score,
}

interface GameScore {
  points: number;
  maxPoints: number;
  time: number;
  maxTime: number;
  data?: any;
}

interface State {
  gameState: GameState;
  score: GameScore;
}

export type { GameScore, GameState, State };

export { ToyTrainButton };
