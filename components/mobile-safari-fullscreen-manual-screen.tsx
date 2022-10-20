import React from "react";
import styled from "styled-components";

import {
  ToyTrainButton,
  ToyTrainFadeTransition,
  ToyTrainTheme,
} from "../index";

interface Props {
  onFinished: () => void;
  theme: ToyTrainTheme;
}

export default class MobileSafariFullscreenManualScreen extends React.Component<
  Props,
  any
> {
  render() {
    return (
      <ToyTrainFadeTransition key="Introduction">
        <Container>
          <Headline>Fullscreen Mode</Headline>
          <Description width={580}>
            <Paragraph>
              Please go to fullscreen mode by clicking on aA on the left side in
              your Safari address bar and click on &quot;hide toolbar&quot;
            </Paragraph>
          </Description>
          {/* <GameInfo src={SampleImage} draggable="false" /> */}
          <ToyTrainButton
            theme={this.props.theme}
            x={710}
            y={820}
            width={500}
            onClick={() => {
              this.props.onFinished();
            }}
          >
            Dismiss
          </ToyTrainButton>
        </Container>
      </ToyTrainFadeTransition>
    );
  }
}

const GameInfo = styled.img`
  position: fixed;
  top: 240px;
  left: 850px;
  width: 1030px;

  pointer-events: none;
`;

const Container = styled.div`
  position: fixed;
  left: 0px;
  bottom: 0px;
  top: 0px;
  right: 0px;
`;

const Description = styled.div`
  position: absolute;
  top: 215px;
  left: 266px;
  width: ${(props) => (props.width ? props.width : 580)}px;

  color: white;

  font-family: ${(props) => props.theme.text.fontFamily || "sans-serif"};
  font-size: 50px;

  text-align: left;
`;

const Headline = styled(Description)`
  font-family: ${(props) => props.theme.text.fontFamily || "sans-serif"};

  top: 100px;
  left: 266px;

  width: unset;
  right: 0px;
`;

const Paragraph = styled.div`
  margin-bottom: 42px;
`;
