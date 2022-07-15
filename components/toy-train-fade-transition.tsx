import React from "react";
import { motion } from "framer-motion/dist/framer-motion";

export default class ToyTrainFadeTransition extends React.Component<any, any> {
  render() {
    const initial = {
      position: "fixed" as "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0,
    };
    const enter = {
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    };
    const exit = {
      opacity: 0,
      transition: {
        delay: 0,
      },
    };
    return (
      <motion.div initial={initial} animate={enter} exit={exit}>
        {this.props.children}
      </motion.div>
    );
  }
}
