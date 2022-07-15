import * as React from "react";

import { defaultTheme as ToyTrainDefaultTheme } from "./default-theme";
import ToyTrainButton, {
  ToyTrainButtonProps,
  ToyTrainButtonState,
} from "./components/toy-train-button";
import ToyTrainTimer, {
  ToyTrainTimerProps,
  ToyTrainTimerState,
} from "./components/toy-train-timer";

import ToyTrainAnimatedCounter, {
  ToyTrainAnimatedCounterProps,
  ToyTrainAnimatedCounterState,
} from "./components/toy-train-animated-counter";

import ToyTrainFadeTransition from "./components/toy-train-fade-transition";
import ToyTrainRotateTransition from "./components/toy-train-rotate-transition";

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

interface ThemeTimerStyles {
  background?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
}

interface ThemePaletteStyles {
  text: string;
  background: string;
  accent: string;
}

interface ThemeAnimatedCounterStyles {
  color?: string;
  fontFamily?: string;
  fontSize?: string;
}

export interface ToyTrainTheme {
  button: ThemeButtonStyles;
  timer: ThemeTimerStyles;
  animatedCounter: ThemeAnimatedCounterStyles;
  palette: ThemePaletteStyles;
}

export type {
  GameScore,
  GameState,
  State,
  ToyTrainButtonProps,
  ToyTrainButtonState,
  ToyTrainTimerProps,
  ToyTrainTimerState,
  ToyTrainAnimatedCounterProps,
  ToyTrainAnimatedCounterState,
};

export {
  ToyTrainButton,
  ToyTrainTimer,
  ToyTrainDefaultTheme,
  ToyTrainFadeTransition,
  ToyTrainRotateTransition,
  ToyTrainAnimatedCounter,
};
