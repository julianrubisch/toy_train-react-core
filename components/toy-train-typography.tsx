import React from "react";
import styled from "styled-components";

import { ToyTrainTimerProps } from "..";

export const Headline = styled.div`
  color: ${(props) => props.theme.headline.color};
  font-size: 40px;
  font-family: ${(props) => props.theme.headline.fontFamily || "sans-serif"};
  text-transform: uppercase;
`;

export const IntroductionText = styled(Headline)`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 158px;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: ${(props) => props.theme.text.fontFamily || "sans-serif"};
  text-transform: none;

  p {
    margin-top: 0px;
    margin-bottom: 40px;

    width: 1542px;
  }

  ul {
    margin: 0px;
    padding-left: 50px;
    margin-bottom: 40px;
    width: 1490px;

    li {
      padding-bottom: 0px;
    }
  }

  em {
    font-family: ${(props) =>
      props.theme.introduction.em.fontFamily || "sans-serif"};
    font-style: normal;
  }
`;

export const Timer = styled.div<ToyTrainTimerProps>`
  background: ${(props) =>
    props.theme.timer.background || props.theme.palette.background};
  color: ${(props) => props.theme.timer.color || props.theme.palette.text};
  font-family: ${(props) => props.theme.timer.fontFamily || "sans-serif"};
  font-size: ${(props) => props.theme.timer.fontSize || "100px"};

  position: absolute;
  top: ${(props) => props.top || "310px"};
  left: ${(props) => props.left || "0px"};
  right: ${(props) => props.right || "0px"};

  text-align: center;
`;

export const Congratulations = styled.div`
  color: ${(props) =>
    props.theme.score.congratulations.color || props.theme.palette.text};
  font-family: ${(props) =>
    props.theme.score.congratulations.fontFamily || "sans-serif"};
  font-size: ${(props) =>
    props.theme.score.congratulations.fontSize || "150px"};

  position: absolute;
  top: 140px;
  left: 0px;
  right: 0px;
  text-align: center;
`;

export const Score = styled.div`
  color: ${(props) =>
    props.theme.score.score.color || props.theme.palette.text};
  font-family: ${(props) => props.theme.score.score.fontFamily || "sans-serif"};
  font-size: ${(props) => props.theme.score.score.fontSize || "200px"};

  position: absolute;
  top: 300px;
  left: 0px;
  right: 0px;
  text-align: center;
`;
