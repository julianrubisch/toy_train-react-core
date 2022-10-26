import React from "react";
import styled from "styled-components";
import Measure from "react-measure";

interface ToyTrainContainerState {
  contentScale: number;
  containerWidth: number;
  containerHeight: number;
}

export type { ToyTrainContainerState };

export const ContentScaleContext = React.createContext(1);

export default class ToyTrainContainer extends React.Component<
  any,
  ToyTrainContainerState
> {
  constructor(props) {
    super(props);
    this.state = {
      contentScale: 1,
      containerWidth: 1920,
      containerHeight: 1080,
    };
  }

  render() {
    const children = this.props.children;

    return (
      <Measure
        bounds
        onResize={(contentRect) => {
          const { width, height } = contentRect.bounds;
          const scaleByWidth = () => Math.min(width / 1920, 1);
          const scaleByHeight = () => Math.min(height / 1080, 1);

          if (width < height || width < 1920) {
            let contentScale = scaleByWidth();
            const scaledHeight = 1080 * contentScale;
            if (scaledHeight > height) {
              contentScale = scaleByHeight();
            }
            this.setState({
              contentScale,
              containerWidth: width,
              containerHeight: height,
            });
          } else {
            const contentScale = scaleByHeight();
            this.setState({
              contentScale,
              containerWidth: width,
              containerHeight: height,
            });
          }
        }}
      >
        {({ measureRef }) => (
          <Container ref={measureRef} data-testid="container">
            <AspectContainer
              scale={this.state.contentScale}
              containerWidth={this.state.containerWidth}
              containerHeight={this.state.containerHeight}
            >
              <ContentScaleContext.Provider value={this.state.contentScale}>
                {children}
              </ContentScaleContext.Provider>
            </AspectContainer>
          </Container>
        )}
      </Measure>
    );
  }
}

const AspectContainer = styled.div`
  position: absolute;
  left: ${(props) => props.containerWidth / 2 - (1920 * props.scale) / 2}px;
  top: ${(props) => props.containerHeight / 2 - (1080 * props.scale) / 2}px;
  width: 1920px;
  height: 1080px;

  transform-origin: top left;
  transform: scale(${(props) => props.scale});

  overflow: hidden;
  perspective: 300px;
`;

const Container = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
`;
