import React from "react";
import styled from "styled-components";
import Confetti from "react-confetti";
import { Howl, Howler } from "howler";

import {
  ToyTrainButton,
  ToyTrainFadeTransition,
  GameScore,
  ToyTrainTheme,
} from "../index";

import { Congratulations, Score } from "./toy-train-typography";

interface ToyTrainScoreScreenProps {
  score: GameScore;
  onFinished: () => void;
  theme: ToyTrainTheme;
}

export default class ToyTrainScoreScreen extends React.Component<
  ToyTrainScoreScreenProps,
  any
> {
  constructor(props: ToyTrainScoreScreenProps) {
    super(props);
    this.state = {
      sound:
        this.props.theme?.sounds?.congratulations &&
        new Howl(this.props.theme.sounds.congratulations),
    };
  }

  render() {
    const score = this.props.score;

    const displayedScore = score.points;

    if (displayedScore > 0) {
      this.state.sound.play();
    }

    return (
      <ToyTrainFadeTransition key="Score">
        <Congratulations theme={this.props.theme}>
          Congratulations
        </Congratulations>
        <Score theme={this.props.theme}>
          {displayedScore} Point{displayedScore === 1 ? "" : "s"}
        </Score>
        {displayedScore > 0 && <Confetti width={1920} height={1080} />}
        <ToyTrainButton
          theme={this.props.theme}
          x={700}
          y={670 - 33}
          width={500}
          onClick={() => {
            this.props.onFinished();
          }}
        >
          CONTINUE
        </ToyTrainButton>
      </ToyTrainFadeTransition>
    );
  }
}
