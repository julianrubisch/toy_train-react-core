import * as React from "react";

import { defaultTheme as ToyTrainDefaultTheme } from "./default-theme";
import ToyTrainButton, {
  ToyTrainButtonProps,
  ToyTrainButtonState,
} from "./components/toy-train-button";

import ToyTrainAnswerButton from "./components/toy-train-answer-button";

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
import ToyTrainCountdownScreen from "./components/toy-train-countdown-screen";
import ToyTrainScoreScreen from "./components/toy-train-score-screen";
import ToyTrainRotateTransition from "./components/toy-train-rotate-transition";
import ToyTrainPreloaderWidget from "./components/preloader/toy-train-preloader-widget";
import { ToyTrainFontDefinition } from "./components/preloader/font-preloader";

import * as ToyTrainTypography from "./components/toy-train-typography";
import { HowlOptions } from "howler";

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

interface GameConfig {
  name: string;
  maxPoints: number;
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

interface ThemeHeadlineStyles extends ThemeTextStyles {
  textTransform?: string;
}

interface ThemeTimerStyles extends ThemeTextStyles {
  background?: string;
}

interface ThemePaletteStyles {
  text: string;
  background: string;
  accent: string;
  error: string;
}

interface ToyTrainThemeSounds {
  buttonClick?: HowlOptions;
  countdown?: HowlOptions;
  congratulations?: HowlOptions;
}

export interface ToyTrainTheme {
  button: ThemeButtonStyles;
  text: ThemeTextStyles;
  headline?: ThemeHeadlineStyles;
  timer: ThemeTimerStyles;
  animatedCounter: ThemeTextStyles;
  palette: ThemePaletteStyles;
  introduction?: {
    em: ThemeTextStyles;
  };
  score?: {
    congratulations: ThemeTextStyles;
    score: ThemeTextStyles;
  };
  sounds?: ToyTrainThemeSounds;
}

export type {
  GameScore,
  GameConfig,
  State,
  ToyTrainButtonProps,
  ToyTrainButtonState,
  ToyTrainTimerProps,
  ToyTrainTimerState,
  ToyTrainAnimatedCounterProps,
  ToyTrainAnimatedCounterState,
  ToyTrainContainerState,
  ToyTrainFontDefinition,
  ToyTrainThemeSounds,
};

export {
  GameState,
  ToyTrainButton,
  ToyTrainTimer,
  ToyTrainAnswerButton,
  ToyTrainDefaultTheme,
  ToyTrainFadeTransition,
  ToyTrainRotateTransition,
  ToyTrainAnimatedCounter,
  ToyTrainFullscreen,
  ToyTrainContainer,
  ToyTrainCountdownScreen,
  ToyTrainScoreScreen,
  ToyTrainPreloaderWidget,
  ToyTrainTypography,
};
