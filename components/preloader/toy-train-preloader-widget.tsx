import React from "react";
import { motion } from "framer-motion/dist/framer-motion";

import AssetPreloader from "./asset-preloader";
import { AssetPreloaderProps } from "./asset-preloader";

interface PreloaderWidgetState {
  preloadProgress: number;
}

export default class ToyTrainPreloaderWidget extends React.Component<
  AssetPreloaderProps,
  PreloaderWidgetState
> {
  constructor(props: AssetPreloaderProps) {
    super(props);
    this.state = { preloadProgress: 0 };
  }

  render() {
    return (
      <React.Fragment>
        <AssetPreloader
          fonts={this.props.fonts}
          images={this.props.images}
          sounds={this.props.sounds}
          onProgress={(preloadProgress) => {
            if (this.props.onProgress !== undefined) {
              this.props.onProgress(preloadProgress);
            }
            this.setState({ preloadProgress });
          }}
          onFinished={() => {
            this.props.onFinished();
          }}
        />

        <motion.div
          initial={{
            position: "fixed" as "fixed",
            x: 1920 / 2 - 200,
            y: 1080 / 2 - 5,
            width: 400,
            height: 10,
            background: "rgba(255,255,255, 0.5)",
            borderRadius: 5,
            opacity: 0,
          }}
          animate={{ opacity: 1, transition: { duration: 3, delay: 1 } }}
        >
          <motion.div
            animate={{
              width: `${this.state.preloadProgress * 100}%`,
              height: "100%",
              background: "#ffffff",
              borderRadius: 5,
              transition: { ease: "easeInOut" },
            }}
          />
        </motion.div>
      </React.Fragment>
    );
  }
}
