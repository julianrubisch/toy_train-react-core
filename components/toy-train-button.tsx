import * as React from "react";
import styled from "styled-components";
import { Howl, Howler } from "howler";

interface Props {
  x?: number;
  y?: number;
  width?: number;
  onClick?: () => void;
  newDesign?: boolean;
  paddingOverride?: string;
}

interface State {
  pressed: boolean;
}

export default class ToyTrainButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { pressed: false };
  }

  render() {
    const press = () => {
      this.setState({ pressed: true });
      // sound.play();
    };
    const release = () => {
      this.setState({ pressed: false });
    };

    return <div></div>;
  }
}
