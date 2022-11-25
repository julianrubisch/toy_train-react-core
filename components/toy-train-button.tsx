import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Howl, Howler, HowlOptions } from "howler";

import { ToyTrainTheme, ToyTrainDefaultTheme } from "../index";

interface ToyTrainButtonProps {
  x?: number;
  y?: number;
  width?: number;
  theme: ToyTrainTheme;
  onClick?: () => void;
}

interface ToyTrainButtonState {
  pressed: boolean;
  sound?: Howl;
}

export type { ToyTrainButtonProps, ToyTrainButtonState };

export default class ToyTrainButton extends React.Component<
  ToyTrainButtonProps,
  ToyTrainButtonState
> {
  constructor(props: ToyTrainButtonProps) {
    super(props);
    this.state = {
      pressed: false,
      sound:
        this.props.theme.sounds.buttonClick &&
        new Howl(this.props.theme.sounds.buttonClick),
    };
  }

  render() {
    const press = () => {
      this.setState({ pressed: true });
      this.state.sound?.play();
    };
    const release = () => {
      this.setState({ pressed: false });
    };
    const theme = this.props.theme || ToyTrainDefaultTheme;

    return (
      <ThemeProvider theme={theme}>
        <ButtonElement
          onClick={this.props.onClick}
          onMouseDown={() => {
            press();
          }}
          onMouseUp={() => {
            release();
          }}
          onMouseLeave={() => {
            release();
          }}
          onTouchStart={() => {
            press();
          }}
          onTouchEnd={() => {
            release();
          }}
          onTouchCancel={() => {
            release();
          }}
          x={this.props.x}
          y={this.props.y}
          width={this.props.width}
          pressed={this.state.pressed}
        >
          {this.props.children}
        </ButtonElement>
      </ThemeProvider>
    );
  }
}

const ButtonElement = styled.button<ToyTrainButtonProps & { pressed: boolean }>`
  background: ${(props) =>
    props.theme.button.background || props.theme.palette.background};
  color: ${(props) => props.theme.button.color || props.theme.palette.text};
  border: ${(props) =>
    props.theme.button.border ||
    `10px solid ${props.theme.palette.buttonBorder}`};
  border-radius: ${(props) => props.theme.button.borderRadius || "0px"};

  padding: ${(props) => props.theme.button.padding || "30px 70px 23px 70px"};
  margin: ${(props) => props.theme.button.margin || "0px"};

  font-family: ${(props) => props.theme.button.fontFamily || "sans-serif"};
  font-size: ${(props) => props.theme.button.fontSize || "40px"};
  font-weight: ${(props) => props.theme.button.fontWeight || "normal"};

  display: inline-block;

  position: ${(props) =>
    props.x !== undefined && props.y !== undefined ? "fixed" : "static"};
  left: ${(props) =>
    props.x !== undefined && props.y !== undefined ? props.x : undefined}px;
  top: ${(props) =>
    props.x !== undefined && props.y !== undefined ? props.y : undefined}px;

  width: ${(props) =>
    props.width !== undefined ? `${props.width}px` : undefined};

  text-align: center;

  opacity: ${(props) => props.theme.button.opacity || 1};
  transform: scale(${(props) => (props.pressed === true ? 0.9 : 1)});
  transition: 0.1s all;
`;
