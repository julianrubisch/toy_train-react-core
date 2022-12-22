import React from "react";
import styled from "styled-components";

import {
  ToyTrainQuestion,
  ToyTrainButton,
  ToyTrainAnswerButton,
  ToyTrainFadeTransition,
  ToyTrainTypography,
  ToyTrainTheme,
} from "../index";

interface Props {
  question: ToyTrainQuestion;
  theme: ToyTrainTheme;
  onAnswer: (corrent: boolean) => void;
}

interface State {
  revealAnswer: boolean;
  selectedAnswer?: number;
}

export default class ToyTrainQuestionBox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { revealAnswer: false, selectedAnswer: undefined };
  }

  render() {
    const question = this.props.question;
    const answerCount = question.answers.length;
    return (
      <Container>
        {!this.state.revealAnswer && (
          <QuestionLabel theme={this.props.theme}>
            {question.question}
          </QuestionLabel>
        )}
        {this.state.revealAnswer && (
          <Explanation theme={this.props.theme}>
            {question.explanation}
          </Explanation>
        )}
        <Answers count={answerCount}>
          {question.answers.map((answer, index) => {
            const reveal = this.state.revealAnswer;
            const correct = index === question.correct;
            const selected = this.state.selectedAnswer === index;
            return (
              <ToyTrainAnswerButton
                key={index}
                theme={this.props.theme}
                correct={reveal && correct}
                incorrect={reveal && !correct}
                fade={reveal && !selected && !correct}
                onClick={() => {
                  if (!this.state.revealAnswer) {
                    this.setState({
                      revealAnswer: true,
                      selectedAnswer: index,
                    });
                    this.props.onAnswer(index === question.correct);
                  }
                }}
              >
                {answer}
              </ToyTrainAnswerButton>
            );
          })}
        </Answers>
      </Container>
    );
  }
}

const Container = styled.div`
  position: absolute;
  bottom: 190px;
  left: 200px;
  right: 200px;
`;

const QuestionLabel = styled(ToyTrainTypography.Headline)`
  text-align: center;

  height: 210px;

  display: grid;
  place-content: center;
`;

const Explanation = styled.div`
  color: ${(props) =>
    props.theme.explanation.color || props.theme.palette.text};
  font-family: ${(props) => props.theme.explanation.fontFamily || "sans-serif"};
  font-size: 30px;
  text-align: center;

  height: 210px;

  display: grid;
  place-content: center;
`;

const Answers = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.count < 5 ? "1fr 1fr" : "1fr 1fr 1fr"};
  grid-template-rows: 1fr 1fr;

  height: 265px;
`;
