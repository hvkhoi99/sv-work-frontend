import { SORT_OPTIONS_CANDIDATE } from 'constants/global';
import React, { useEffect, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import * as BsIcons from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './SortByItem.scss';

SortByItem.propTypes = {

};

function SortByItem(props) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const [byName, setByName] = useState('Default');

  const handleShow = (e, name) => {
    e.preventDefault();
    setShow(!show);
    setByName(name);
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

  return (
    <div ref={ref} className="sort-by-item">
      <div className="sort-by-item__main" onClick={() => setShow(!show)}>
        <span
          className="sort-by-item__main__count-result"
        >
          15 results of...
        </span>
        <div className="sort-by-item__main__sort-type">
          <span className="sort-by-item__main__sort-type__name">
            Sort: {byName}
          </span>
          <BsIcons.BsFillCaretDownFill className="sort-by-item__main__sort-type__icon" />
        </div>
      </div>
      <div className={show ? "sort-by-item__dropdown show-dropdown-menu" : "sort-by-item__dropdown"}>
        {
          SORT_OPTIONS_CANDIDATE.map((option, index) => {
            return <Link
              to="#"
              key={index}
              className="sort-by-item__dropdown__link"
              onClick={(e) => handleShow(e, option.label)}
            >{option.label}</Link>
          })
        }
      </div>
    </div>
  );
}

export default SortByItem;