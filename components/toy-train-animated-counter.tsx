import React from "react";
import { motion } from "framer-motion/dist/framer-motion";
import styled, { ThemeProvider } from "styled-components";

import { ToyTrainTheme, ToyTrainDefaultTheme } from "../index";

export interface ToyTrainAnimatedCounterProps {
  theme: ToyTrainTheme;
  x: number;
  y: number;
  width?: number;
  from?: number;
  to?: number;
  displayFinal?: boolean;
  hidden?: boolean;
  onFinished: () => void;
}

export interface ToyTrainAnimatedCounterState {
  count: number;
  to: number;
  step: number;
}

export default class ToyTrainAnimatedCounter extends React.Component<
  ToyTrainAnimatedCounterProps,
  ToyTrainAnimatedCounterState
> {
  constructor(props: ToyTrainAnimatedCounterProps) {
    super(props);
    const from = this.props.from !== undefined ? this.props.from : 0;
    const to = this.props.to !== undefined ? this.props.to : 0;
    this.state = { count: from, to, step: from < to ? 1 : -1 };

    if (from === to) {
      this.props.onFinished();
    }
  }

  next() {
    const count = this.state.count + this.state.step;
    if (count === this.state.to && this.props.displayFinal !== true) {
      this.props.onFinished();
    } else {
      this.setState({ count });
    }
  }

  render() {
    const theme = this.props.theme || ToyTrainDefaultTheme;
    const rotation = 90;
    const initial = {
      position: "fixed" as "fixed",
      fontFamily: theme.animatedCounter.fontFamily,
      fontSize: theme.animatedCounter.fontSize,
      color: theme.animatedCounter.color,
      x: this.props.x,
      y: this.props.y,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: this.props.width,
      rotate: -rotation,
      originX: 0.5,
      originY: 0.75,
      opacity: 0,
      visibility:
        this.props.hidden === true
          ? ("hidden" as "hidden")
          : ("visible" as "visible"),
    };
    const counter = {
      opacity: [0, 1, 0],
      rotate: [-rotation, 0, rotation],
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    };
    const final = {
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    };

    return (
      <ThemeProvider theme={theme}>
        {this.state.count !== this.state.to && (
          <motion.div
            key={this.state.count}
            initial={initial}
            animate={counter}
            onAnimationComplete={() => {
              this.next();
            }}
          >
            {this.state.count}
          </motion.div>
        )}
        {this.state.count === this.state.to && this.props.displayFinal && (
          <motion.div
            key={this.state.count}
            initial={initial}
            animate={final}
            onAnimationComplete={() => {
              this.props.onFinished();
            }}
          >
            {this.state.count}
          </motion.div>
        )}
      </ThemeProvider>
    );
  }
}
