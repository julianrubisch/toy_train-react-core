import React from "react";
import styled from "styled-components";
import {
  ToyTrainButton,
  ToyTrainButtonProps,
  ToyTrainButtonState,
  ToyTrainTheme,
} from "../index";

interface AnswerButtonProps {
  correct?: boolean;
  incorrect?: boolean;
  fade?: boolean;
  theme: ToyTrainTheme;
}

export default class ToyTrainAnswerButton extends React.Component<
  ToyTrainButtonProps & AnswerButtonProps,
  ToyTrainButtonState
> {
  render() {
    const theme = {
      ...this.props.theme,
      button: {
        ...this.props.theme.button,
        background:
          this.props.correct || this.props.incorrect
            ? this.props.correct
              ? this.props.theme.palette.text
              : this.props.theme.palette.error
            : this.props.theme.palette.accent,
        color: this.props.correct
          ? this.props.theme.palette.background
          : "white",
        padding: "0 30px",
        margin: "20px",
        fontSize: "30px",
        opacity: this.props.fade === true ? "0.5" : "1",
      },
    };

    return (
      <ToyTrainButton theme={theme} onClick={this.props.onClick}>
        {this.props.children}
      </ToyTrainButton>
    );
  }
}
