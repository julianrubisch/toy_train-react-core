import * as React from "react";

import { defaultTheme as ToyTrainDefaultTheme } from "./default-theme";
import ToyTrainButton, {
  ToyTrainButtonProps,
  ToyTrainButtonState,
} from "./components/toy-train-button";

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

interface ThemeButtonStyles {
  background?: string;
  color?: string;
  border?: string;
  borderRadius?: string;
  padding?: string;
  margin?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  opacity?: string;
}

interface ThemePaletteStyles {
  text: string;
  background: string;
  accent: string;
}

export interface ToyTrainTheme {
  button: ThemeButtonStyles;
  palette: ThemePaletteStyles;
}

export type {
  GameScore,
  GameState,
  State,
  ToyTrainButtonProps,
  ToyTrainButtonState,
};

export { ToyTrainButton, ToyTrainDefaultTheme };
