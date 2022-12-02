import React from "react";
import styled from "styled-components";
import { Howl, Howler, HowlOptions } from "howler";

import ToyTrainAnimatedCounter from "./toy-train-animated-counter";
import ToyTrainFadeTransition from "./toy-train-fade-transition";
import { Timer } from "./toy-train-typography";
import { ToyTrainTheme } from "..";

interface ToyTrainCountdownProps {
  onFinished: () => void;
  theme: ToyTrainTheme;
}

export default class ToyTrainCountdownScreen extends React.Component<
  ToyTrainCountdownProps,
  any
> {
  constructor(props: ToyTrainCountdownProps) {
    super(props);
    this.state = {
      sound:
        this.props.theme?.sounds?.countdown &&
        new Howl(this.props.theme.sounds.countdown),
    };
  }

  componentDidMount() {
    this.state.sound?.play();
  }

  render() {
    return (
      <ToyTrainFadeTransition key="Countdown">
        <ToyTrainAnimatedCounter
          theme={this.props.theme}
          x={1920 / 2 - 115}
          y={250}
          from={3}
          onFinished={this.props.onFinished}
        />
        <Label theme={this.props.theme}>READY</Label>
      </ToyTrainFadeTransition>
    );
  }
}

const Label = styled(Timer)`
  font-size: 83px;
  position: absolute;
  top: 550px;
`;
