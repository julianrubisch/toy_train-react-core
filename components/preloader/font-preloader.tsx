import * as React from "react";
import styled from "styled-components";

// https://developer.mozilla.org/en-US/docs/Web/API/FontFace/FontFace

export interface ToyTrainFontDefinition {
  fontFamily: string; // Specifies a name that will be used as the font face value for font properties
  source: string; // a URL or binary font data
}

interface FontPreloaderProps {
  fonts: Array<ToyTrainFontDefinition>;
  onProgress?: (progress: number) => void;
  onReady(): void;
  hidden?: boolean;
}

interface FontPreloaderState {
  fontsToLoad: Array<ToyTrainFontDefinition>;
}

export default class FontPreloader extends React.Component<
  FontPreloaderProps,
  FontPreloaderState
> {
  constructor(props) {
    super(props);
    this.state = {
      fontsToLoad: this.props.fonts,
    };
  }

  componentDidMount() {
    if (typeof FontFace === "undefined") {
      console.warn("CSS Font Loading API not supported - skipping preload");
      this.props.onReady();
    } else {
      this.loadNext();
    }
  }

  loadNext() {
    const fontsToLoad = this.state.fontsToLoad.slice();
    const next = fontsToLoad.pop();
    this.setState({ fontsToLoad }, () => {
      if (!next) return;

      const font = new FontFace(next.fontFamily, `url(${next.source})`);
      document.fonts.add(font);
      font.loaded.then(() => {
        console.log(`${next.fontFamily} loaded`);
        if (this.state.fontsToLoad.length > 0) {
          if (this.props.onProgress !== undefined) {
            const total = this.props.fonts.length;
            const loaded = total - this.state.fontsToLoad.length;
            this.props.onProgress(loaded / total);
          }
          this.loadNext();
        } else {
          this.props.onReady();
        }
      });
      font.load();
    });
  }

  render() {
    const total = this.props.fonts.length;
    const loaded = total - this.state.fontsToLoad.length;

    return (
      <Preloader hidden={this.props.hidden}>
        Font Preloader [{loaded}/{total}]
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
