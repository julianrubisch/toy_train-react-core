import * as React from "react";

import { withRoot, ToyTrainRootProps } from "./components/toy-train-root";

import * as ToyTrainTypography from "./components/toy-train-typography";
import { defaultTheme as ToyTrainDefaultTheme } from "./default-theme";
import ToyTrainButton, {
  ToyTrainButtonProps,
  ToyTrainButtonState,
} from "./components/toy-train-button";

import ToyTrainQuestionBox from "./components/toy-train-question-box";
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

import { HowlOptions } from "howler";

interface ToyTrainGameState {
  gameState: GameState;
  score: GameScore | undefined;
}

export abstract class ToyTrainGame<
  P = any,
  S = ToyTrainGameState
> extends React.Component<P, S> {}

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

enum IntroductionAlignment {
  Full,
  Left,
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
    align: IntroductionAlignment;
  };
  score?: {
    congratulations: ThemeTextStyles;
    score: ThemeTextStyles;
  };
  sounds?: ToyTrainThemeSounds;
}

interface ToyTrainQuestion {
  question: string;
  answers: Array<string>;
  correct: number;
  explanation: string;
}

export type {
  ToyTrainGameState,
  ToyTrainRootProps,
  GameScore,
  GameConfig,
  State,
  ToyTrainQuestion,
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
  IntroductionAlignment,
  ToyTrainButton,
  ToyTrainTimer,
  ToyTrainQuestionBox,
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
  withRoot,
};
