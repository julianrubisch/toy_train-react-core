import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Howl, Howler, HowlOptions } from "howler";

import {
  ToyTrainTheme,
  ToyTrainDefaultTheme,
  ToyTrainTypography,
} from "../index";
import { Timer } from "./toy-train-typography";

interface ToyTrainTimerProps {
  theme: ToyTrainTheme;
  sound?: HowlOptions;
  seconds: number;
  onUpdate?: (seconds: number) => void;
  onFinished?: () => void;
  pause?: boolean;
  top?: string;
  left?: string;
  right?: string;
}

interface ToyTrainTimerState {
  seconds: number;
  sound?: Howl;
}

export type { ToyTrainTimerProps, ToyTrainTimerState };

export default class ToyTrainTimer extends React.Component<
  ToyTrainTimerProps,
  ToyTrainTimerState
> {
  private timer;

  constructor(props: ToyTrainTimerProps) {
    super(props);
    this.state = {
      seconds: this.props.seconds,
      sound: this.props.sound && new Howl({ html5: true, ...this.props.sound }),
    };
    this.resumeTimer = this.resumeTimer.bind(this);
  }

  shouldComponentUpdate(
    nextProps: ToyTrainTimerProps,
    nextState: ToyTrainTimerState
  ) {
    if (this.props.pause !== nextProps.pause) {
      if (nextProps.pause === true) {
        clearInterval(this.timer);
      } else {
        this.resumeTimer();
      }
    }
    return true;
  }

  componentDidMount() {
    this.resumeTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  resumeTimer() {
    this.timer = setInterval(() => {
      const seconds = this.state.seconds - 1;
      this.setState({ seconds });
      if (this.props.onUpdate) {
        this.props.onUpdate(seconds);
      }
      if (seconds === 6) {
        this.state.sound?.play();
      }
      if (seconds < 1) {
        if (this.props.onFinished) {
          this.props.onFinished();
        }
        clearInterval(this.timer);
        this.timer = null;
      }
    }, 1000);
  }

  render() {
    const theme = this.props.theme || ToyTrainDefaultTheme;
    const minutes = Math.floor(this.state.seconds / 60);
    const seconds = this.state.seconds - minutes * 60;
    const format = (num: number) => num.toString().padStart(2, "0");

    return (
      <ThemeProvider theme={theme}>
        <ToyTrainTypography.Timer>
          {format(minutes)}:{format(seconds)}
        </ToyTrainTypography.Timer>
      </ThemeProvider>
    );
  }
}
