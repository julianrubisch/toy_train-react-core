import React from "react";
import { motion } from "framer-motion/dist/framer-motion";

export default class ToyTrainRotateTransition extends React.Component<
  any,
  any
> {
  render() {
    const rotation = 20;
    const initial = {
      position: "fixed" as "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0,
      rotateY: rotation,
    };
    const enter = {
      opacity: [0, 1, 1],
      rotateY: [rotation, rotation, 0],
      transition: {
        ease: "easeIn",
        duration: 1,
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
