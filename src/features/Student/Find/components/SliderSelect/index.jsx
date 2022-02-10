import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './SliderSelect.scss';
import * as HiIcons from 'react-icons/hi';
import * as RiIcons from 'react-icons/ri';
import { Slider, styled } from '@mui/material';
import { Button } from '@material-ui/core';

SliderSelect.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeSalary: PropTypes.func
};

SliderSelect.defaultProps = {
  title: '',
  placeholder: '',
  onChangeSalary: null
}

const PrettoSlider = styled(Slider)({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

function SliderSelect(props) {
  const { title, placeholder, onChangeSalary } = props
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const [salary, setSalary] = useState({
    minSalary: 20,
    maxSalary: 50
  })
  const [value, setValue] = useState([salary.minSalary, salary.maxSalary]);

  function valuetext(value) {
    return `${value * 100}`;
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        show === true && setShow(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, show]);

  const handleShow = () => {
    setShow(!show);
  }

  const handleChangeSalary = () => {
    onChangeSalary(`${salary.minSalary*100}~${salary.maxSalary*100}`, "salary");
    handleShow();
  }

  const handleClearSalary = () => {
    onChangeSalary("", "salary");
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSalary(({
      minSalary: event.target.value[0],
      maxSalary: event.target.value[1]
    }));
  };

  return (
    <div className="slider-select" >
      <div className="slider-select__select" onClick={handleShow}>
        <div className="slider-select__select__container">
          <div className="slider-select__select__container__title">
            {
              title !== ""
                ? <div className="slider-select__select__container__title__name">
                  $
                  <span>{title}</span>
                  <RiIcons.RiCloseLine
                    className="slider-select__select__container__title__name__close"
                    onClick={handleClearSalary}
                  />
                </div>
                : <span className="slider-select__select__container__title__placehoder">{placeholder}</span>
            }
          </div>
          <div className="slider-select__select__container__down-arrow">
            <HiIcons.HiChevronDown
              className="slider-select__select__container__down-arrow__icon"
              style={show ? { color: 'var(--secondary)' } : { color: 'lightgrey' }}
            />
          </div>
        </div>
      </div>
      {
        show && <div className="slider-select__slider">
          <PrettoSlider
            // getAriaLabel={() => 'Temperature range'}
            // min={0}
            // max={100}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="on"
            getAriaValueText={valuetext}
            valueLabelFormat={valuetext}
          // color="secondary"
          />
          <div className="slider-select__slider__salary">
            Salary:
            <span className="slider-select__slider__salary__min-max">
              ${salary.minSalary * 100} ~ ${salary.maxSalary * 100}
            </span>
          </div>
          <div className="slider-select__slider__group-button">
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={handleChangeSalary}
            >OK</Button>
            <Button
              type="button"
              variant="contained"
              color="default"
              onClick={handleShow}
            >Cancel</Button>
          </div>
        </div>
      }
    </div>
  );
}

export default SliderSelect;