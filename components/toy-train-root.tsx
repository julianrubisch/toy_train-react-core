import { post } from "@rails/request.js";
import React from "react";
import styled from "styled-components";
import { Howler } from "howler";

import {
  ToyTrainContainer,
  ToyTrainFullscreen,
  ToyTrainTheme,
  ToyTrainGameState,
  ToyTrainGame,
  GameScore,
} from "../index";

import { underscore } from "inflected";

const FULLSCREEN_ID = "fullscreen-id";

export type ToyTrainRootProps = {
  onGameFinished: (score: GameScore) => void;
};

export function withRoot<P>(Game: React.ComponentType<P & ToyTrainRootProps>) {
  return class extends React.Component<any, ToyTrainGameState> {
    constructor(props: any) {
      super(props);
      Howler.volume(0.7);
    }

    async onGameFinished(score) {
      const newGameRecordForm = document.querySelector("#new_game_record");
      const formData = new FormData(newGameRecordForm as HTMLFormElement);
      for (const prop in score) {
        const serializedValue =
          typeof score[prop] === "object"
            ? JSON.stringify(score[prop])
            : score[prop];
        formData.append(`game_record[${underscore(prop)}]`, serializedValue);
      }

      const response = await post(
        (newGameRecordForm as HTMLFormElement).getAttribute("action"),
        {
          body: formData,
          redirect: "manual",
        }
      );

      if ((window as any).Turbo) {
        if (response.redirected) {
          (window as any).Turbo.visit(
            new URL(response.url.toString(), document.baseURI)
          );
        }
      } else {
        // Turbolinks won't set response.redirected
        window.location.href = response.headers.get("Location");
      }
    }

    render() {
      return (
        <Container id={FULLSCREEN_ID} theme={this.props.theme}>
          <ToyTrainContainer>
            <Game
              {...(this.props as P)}
              onGameFinished={(score) => this.onGameFinished(score)}
            />
            <ToyTrainFullscreen
              fullscreenId={FULLSCREEN_ID}
              theme={this.props.theme}
            />
          </ToyTrainContainer>
        </Container>
      );
    }
  };
}
const Container = styled.div`
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;

  touch-action: none;

  background: ${(props) => props.theme.palette.background};
`;
