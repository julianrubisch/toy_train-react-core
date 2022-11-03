import * as React from "react";
import styled from "styled-components";

interface SoundPreloaderProps {
  sounds: Array<string>;
  onProgress?: (progress: number) => void;
  onReady(): void;
}

interface SoundPreloaderState {
  soundsToLoad: number;
}

export default class SoundPreloader extends React.Component<
  SoundPreloaderProps,
  SoundPreloaderState
> {
  constructor(props) {
    super(props);
    this.state = {
      soundsToLoad: this.props.sounds.length,
    };
    if (this.props.sounds.length < 1) {
      this.props.onReady();
    }
  }

  soundReady(src: string) {
    console.log("loaded sound", src);
    const soundsToLoad = this.state.soundsToLoad - 1;
    this.setState({ soundsToLoad }, () => {
      if (this.state.soundsToLoad > 0) {
        if (this.props.onProgress !== undefined) {
          const total = this.props.sounds.length;
          const loaded = total - this.state.soundsToLoad;
          this.props.onProgress(loaded / total);
        }
      } else {
        this.props.onReady();
      }
    });
  }

  render() {
    return (
      <Preloader hidden={true}>
        {this.props.sounds.map((src, index) => {
          return (
            <audio
              ref={(ref) => {
                // explicity start loading audio for iOS compatibility:
                const iOS =
                  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                  !window["MSStream"];
                if (ref !== null && iOS) {
                  ref.load();
                }
              }}
              src={src}
              key={index}
              onError={(e) => {
                console.log("error loading", src, e);
                this.soundReady(src);
              }}
              onCanPlayThrough={(e) => {
                this.soundReady(src);
              }}
            />
          );
        })}
      </Preloader>
    );
  }
}

const Preloader = styled.div`
	display: ${(props) => (props.hidden === true ? "none" : "block")}
	position: fixed;

	left: 0px;
	right: 0px;
	top: 400px;

	background: #999;
`;
