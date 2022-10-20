import React from "react";
import styled, { ThemeProvider } from "styled-components";
import fscreen from "fscreen";
import platform from "platform-detect";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";

import ToyTrainButton from "./toy-train-button";
import MobileSafariFullscreenManualScreen from "./mobile-safari-fullscreen-manual-screen";
import { ToyTrainTheme, ToyTrainDefaultTheme } from "../index";

interface ToyTrainFullscreenProps {
  buttonImage?: HTMLImageElement | string;
  buttonText?: string;
  fullscreenId: string;
  theme: ToyTrainTheme;
}

interface ToyTrainFullscreenState {
  fullscreen: boolean;
  dismissedOverlay: boolean;
}

export default class ToyTrainFullscreen extends React.Component<
  ToyTrainFullscreenProps,
  ToyTrainFullscreenState
> {
  constructor(props: ToyTrainFullscreenProps) {
    super(props);
    this.state = {
      fullscreen:
        fscreen.fullscreenElement !== null &&
        fscreen.fullscreenElement !== undefined,
      dismissedOverlay: false,
    };

    this.fullscreenHandler = this.fullscreenHandler.bind(this);
    fscreen.addEventListener("fullscreenchange", this.fullscreenHandler);
  }

  componentWillUnmount() {
    fscreen.removeEventListener("fullscreenchange", this.fullscreenHandler);
  }

  fullscreenHandler() {
    this.setState({ fullscreen: fscreen.fullscreenElement !== null });
  }

  render() {
    const theme = this.props.theme || ToyTrainDefaultTheme;

    return (
      <ThemeProvider theme={theme}>
        <Container>
          {fscreen.fullscreenEnabled && !this.state.fullscreen && (
            <FullscreenButton>
              <ToyTrainButton
                theme={{
                  ...theme,
                  button: { ...theme.button, padding: "20px 30px" },
                }}
                onClick={() => {
                  const element = document.getElementById(
                    this.props.fullscreenId
                  );
                  if (element !== null) {
                    fscreen.requestFullscreen(element);

                    this.forceUpdate();
                  }
                }}
              >
                <FullscreenButtonContent>
                  <div>{this.props.buttonText || "fit to screen"}</div>
                  {this.props.buttonImage ? (
                    <Icon src={this.props.buttonImage} />
                  ) : (
                    <ArrowsPointingOutIcon />
                  )}
                </FullscreenButtonContent>
              </ToyTrainButton>
            </FullscreenButton>
          )}
          {!fscreen.fullscreenEnabled &&
            platform.ios &&
            platform.safari &&
            !platform.chrome &&
            !this.state.dismissedOverlay && (
              <MobileSafariFullscreenManualScreen
                theme={theme}
                onFinished={() => {
                  this.setState({ dismissedOverlay: true });
                }}
              />
            )}
        </Container>
      </ThemeProvider>
    );
  }
}

const Container = styled.div``;

const FullscreenButton = styled.div`
  position: fixed;
  top: 45px;
  right: 45px;
`;

const FullscreenButtonContent = styled.div`
  font-size: 30px;
  display: grid;
  grid-template-columns: auto 48px;
  column-gap: 10px;
  align-items: center;
`;

const Icon = styled.img`
  pointer-events: none;
`;
