import React from "react";
import styled from "styled-components";

import ImagePreloader from "./image-preloader";
import FontPreloader from "./font-preloader";
import SoundPreloader from "./sound-preloader";
import { ToyTrainFontDefinition } from "./font-preloader";

export interface AssetPreloaderProps {
  images: Array<string>;
  sounds: Array<string>;
  fonts: Array<ToyTrainFontDefinition>;
  onProgress?: (progress: number) => void;
  onFinished(): void;
}

interface AssetPreloaderState {
  imageProgress: number;
  fontProgress: number;
  soundProgress: number;
}

export default class AssetPreloader extends React.Component<
  AssetPreloaderProps,
  AssetPreloaderState
> {
  constructor(props: AssetPreloaderProps) {
    super(props);
    this.state = {
      imageProgress: 0,
      fontProgress: 0,
      soundProgress: 0,
    };
  }

  render() {
    const progessUpdate = () => {
      const progress =
        (this.state.fontProgress +
          this.state.imageProgress +
          this.state.soundProgress) /
        3;
      if (this.props.onProgress !== undefined) {
        this.props.onProgress(progress);
      }
      if (progress === 1) {
        this.props.onFinished();
      }
    };

    return (
      <Container>
        <ImagePreloader
          images={this.props.images}
          onProgress={(imageProgress) => {
            this.setState({ imageProgress }, progessUpdate);
          }}
          onFinished={() => {
            this.setState({ imageProgress: 1 }, progessUpdate);
          }}
        />
        <FontPreloader
          fonts={this.props.fonts}
          onProgress={(fontProgress) => {
            this.setState({ fontProgress }, progessUpdate);
          }}
          onReady={() => {
            this.setState({ fontProgress: 1 }, progessUpdate);
          }}
        />
        <SoundPreloader
          sounds={this.props.sounds}
          onProgress={(soundProgress) => {
            this.setState({ soundProgress }, progessUpdate);
          }}
          onReady={() => {
            this.setState({ soundProgress: 1 }, progessUpdate);
          }}
        />
      </Container>
    );
  }
}

const Container = styled.div`
  display: none;
`;
