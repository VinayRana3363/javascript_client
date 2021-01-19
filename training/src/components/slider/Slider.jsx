import React, { Component } from 'react';
import PropType from 'prop-types';
import { getRandomNumber, getNextRoundRobin } from './libs/utils/math';
import { Image } from './style';

class Slider extends Component {
  constructor(props) {
    super(props);
    const { defaultBanner } = this.props;
    this.state = {
      image: defaultBanner,
    };
  }

  componentDidMount() {
    const { banners, duration, random } = this.props;
    let currentImageIndex = 0;
    let currentImage;
    this.id = setInterval(() => {
      if (random) currentImage = banners[getRandomNumber(banners.length)];
      else {
        currentImageIndex = getNextRoundRobin(banners.length, currentImageIndex);
        currentImage = banners[currentImageIndex];
      }
      this.setState({
        image: currentImage,
      });
    }, duration);
  }

  componentWillUnmount() {
    clearInterval(this.id);
  }

  render() {
    const { altText, height } = this.props;
    const { image } = this.state;
    return (
      <>
        <Image src={image} alt={altText} height={height} />
      </>
    );
  }
}

Slider.defaultProps = {
  altText: 'Default Banner',
  banners: ['../images/default.png'],
  defaultBanner: 'default.png',
  duration: 2000,
  height: 200,
  random: true,
};

Slider.propTypes = {
  altText: PropType.string,
  banners: PropType.arrayOf(PropType.string),
  defaultBanner: PropType.string,
  duration: PropType.number,
  height: PropType.number,
  random: PropType.bool,
};

export default Slider;
