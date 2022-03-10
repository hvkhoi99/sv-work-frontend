import Images from 'constants/images';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import "./ImageSlider.scss";

ImageSlider.propTypes = {
  sliderData: PropTypes.array,
  onViewDetailEvent: PropTypes.func
};

ImageSlider.defaultProps = {
  sliderData: [],
  onViewDetailEvent: null
}

function ImageSlider(props) {
  const { sliderData, onViewDetailEvent } = props;
  const [current, setCurrent] = useState(0);
  const length = sliderData.length;
  const timeout = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const nextSlide = () => {
      setCurrent((current) => (current === length - 1 ? 0 : current + 1));
      // setCurrent(current === length - 1 ? 0 : current + 1);
    };
    if (!isHovering)
      timeout.current = setTimeout(nextSlide, 2000);

    return function () {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [current, length, isHovering]);

  function handleMouseEnter(e) {
    // stop the timeout function to be set
    setIsHovering(true);
    // clear any existing timeout functions
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }
  function handleMouseLeave(e) {
    // to trigger the useeffect function
    setIsHovering(false);
  }

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
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="image-slider"
    >
      {sliderData.map((slide, index) => {
        return (
          <div

            className={index === current ? 'image-slider__bg slide active' : 'slide'}
            key={index}
          >
            {
              index === current && (
                <div className="image-slider__bg__img">
                  <img src={slide.image_link ?? Images.bachkhoaEvent} alt='event-bg' />
                  <div className="image-slider__bg__img__overlay" onClick={() => onViewDetailEvent(slide)}>
                    <span className="image-slider__bg__img__overlay__title">{slide.title}</span>
                    <span className="image-slider__bg__img__overlay__location">{slide.location}</span>
                    <div className="image-slider__bg__img__overlay__count">
                      Join: <span>{slide.count_participants}</span>
                    </div>
                  </div>
                </div>
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
      {/* <div className="image-slider__btn-group"> */}
        <FaIcons.FaChevronLeft className="image-slider__icon-prev" onClick={prevSlide} />
        <FaIcons.FaChevronRight className="image-slider__icon-next" onClick={nextSlide} />
      {/* </div> */}
    </div>
  );
}

export default ImageSlider;