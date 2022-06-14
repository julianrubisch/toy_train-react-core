import * as React from "react";
import styled from "styled-components";
import { Howl, Howler, HowlOptions } from "howler";

interface ToyTrainButtonProps {
  styles: ToyTrainButtonStyles;
  sound?: HowlOptions;
  onClick?: () => void;
}

interface ToyTrainButtonStyles {
  x?: number;
  y?: number;
  width?: number;
  padding?: string;
  background?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  border?: string;
  borderRadius?: string;
}

interface ToyTrainButtonState {
  pressed: boolean;
  sound?: Howl;
}

export type { ToyTrainButtonStyles, ToyTrainButtonProps };

export default class ToyTrainButton extends React.Component<
  ToyTrainButtonProps,
  ToyTrainButtonState
> {
  constructor(props: ToyTrainButtonProps) {
    super(props);
    this.state = {
      pressed: false,
      sound: this.props.sound && new Howl({ html5: true, ...this.props.sound }),
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

    return (
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
        x={this.props.styles.x}
        y={this.props.styles.y}
        width={this.props.styles.width}
        padding={this.props.styles.padding}
        pressed={this.state.pressed}
      >
        {this.props.children}
      </ButtonElement>
    );
  }
}

const ButtonElement = styled.button<
  ToyTrainButtonStyles & { pressed: boolean }
>`
  background: ${(props) => props.background || "white"}
  color: ${(props) => props.color || "black"};
  border: ${(props) => props.border || "10px solid #b3b3b3"};
  border-radius: ${(props) => props.borderRadius || "0px"};

  padding: ${(props) =>
    props.padding ? props.padding : "30px 70px 23px 70px"};

  font-family: ${(props) => props.fontFamily || "sans-serif"};
  font-size: ${(props) => props.fontSize || "40px"};
  font-weight: ${(props) => props.fontWeight || "normal"};

  display: inline-block;

  position: ${(props) =>
    props.x !== undefined && props.y !== undefined ? "fixed" : "static"};
  left: ${(props) =>
    props.x !== undefined && props.y !== undefined ? props.x : undefined}px;
  top: ${(props) =>
    props.x !== undefined && props.y !== undefined ? props.y : undefined}px;

  width: ${(props) =>
    props.width !== undefined ? `${props.width - 54 * 2}px` : undefined};

  text-align: center;

  transform: scale(${(props) => (props.pressed === true ? 0.9 : 1)});
  transition: 0.1s all;
`;
