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

import ToyTrainContainer, {
  ToyTrainContainerState,
} from "./components/toy-train-container";

import ToyTrainAnimatedCounter, {
  ToyTrainAnimatedCounterProps,
  ToyTrainAnimatedCounterState,
} from "./components/toy-train-animated-counter";

import ToyTrainFadeTransition from "./components/toy-train-fade-transition";
import ToyTrainFullscreen from "./components/toy-train-fullscreen";
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

interface ThemeTextStyles {
  color?: string;
  fontFamily?: string;
  fontSize?: string;
}

interface ThemeTimerStyles extends ThemeTextStyles {
  background?: string;
}

interface ThemePaletteStyles {
  text: string;
  background: string;
  accent: string;
}

export interface ToyTrainTheme {
  button: ThemeButtonStyles;
  text: ThemeTextStyles;
  timer: ThemeTimerStyles;
  animatedCounter: ThemeTextStyles;
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
  ToyTrainContainerState,
};

export {
  ToyTrainButton,
  ToyTrainTimer,
  ToyTrainDefaultTheme,
  ToyTrainFadeTransition,
  ToyTrainRotateTransition,
  ToyTrainAnimatedCounter,
  ToyTrainFullscreen,
  ToyTrainContainer,
};
