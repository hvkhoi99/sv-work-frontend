import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import "./ImageSlider.scss";

ImageSlider.propTypes = {
  sliderData: PropTypes.array
};

ImageSlider.defaultProps = {
  sliderData: []
}

function ImageSlider(props) {
  const { sliderData } = props;
  const [current, setCurrent] = useState(0);
  const length = sliderData.length;

  // useEffect(() => {
  //   while (isLoop) {
  //     setTimeout(() => {
  //       setCurrent(current === 0 ? length - 1 : current - 1);
  //     }, 2000)
  //   }
  // }, [isLoop, current, length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [current, length]);


  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(sliderData) || sliderData.length <= 0) {
    return null;
  }

  return (
    <div className="image-slider">
      {sliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? 'image-slider__bg slide active' : 'slide'}
            key={index}
          >
            {
              index === current && (
                <img src={slide.image} alt='event-bg' />
              )
            }
          </div>
        );
      })}
      <div className='image-slider__dots'>
        {
          sliderData.map((data, index) => {
            return <div
              key={index}
              className={index === current
                ? 'image-slider__dots__dot dot-active'
                : 'image-slider__dots__dot'}
            />
          })
        }
      </div>
      <div className="image-slider__btn-group">
        <FaIcons.FaChevronLeft className="image-slider__btn-group__icon" onClick={prevSlide} />
        <FaIcons.FaChevronRight className="image-slider__btn-group__icon" onClick={nextSlide} />
      </div>
    </div>
  );
}

export default ImageSlider;