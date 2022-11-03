import * as React from "react";

interface ImagePreloaderProps {
  images: Array<string>;
  onProgress?: (progress: number) => void;
  onFinished(images: Array<HTMLImageElement>): void;
}

interface ImagePreloaderState {
  images: Array<HTMLImageElement>;
  imagesToLoad: number;
}

export default class ImagePreloader extends React.Component<
  ImagePreloaderProps,
  ImagePreloaderState
> {
  constructor(props: ImagePreloaderProps) {
    super(props);
    this.state = {
      imagesToLoad: this.props.images.length,
      images: [],
    };
    if (this.props.images !== undefined && this.props.images.length === 0) {
      this.props.onFinished([]);
    }

    this.imageFinished = this.imageFinished.bind(this);
  }

  componentDidUpdate(
    prevProps: ImagePreloaderProps,
    prevState: ImagePreloaderState
  ) {
    if (prevProps.images !== this.props.images) {
      return { images: undefined };
    }
  }

  imageFinished(image: React.SyntheticEvent<HTMLImageElement>) {
    let images = this.state.images;
    if (this.state.images === undefined) {
      images = [];
    }
    images.push(image.target as HTMLImageElement);

    let imagesToLoad = this.state.imagesToLoad;
    imagesToLoad--;
    this.setState({ imagesToLoad, images });
    if (this.props.onProgress !== undefined) {
      const total = this.props.images.length;
      const loaded = total - imagesToLoad;
      this.props.onProgress(loaded / total);
    }
    if (imagesToLoad === 0 && this.props.onFinished !== undefined) {
      this.props.onFinished(images);
    }
  }

  render() {
    return (
      <div className="imagePreloader" style={{ display: "none" }}>
        {this.props.images.map((image, index) => {
          return (
            <img
              src={image}
              height={100}
              key={index}
              onLoad={(e) => this.imageFinished(e)}
              onError={this.imageFinished}
            />
          );
        })}
      </div>
    );
  }
}
