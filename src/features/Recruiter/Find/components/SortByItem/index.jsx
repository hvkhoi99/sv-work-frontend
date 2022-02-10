import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import * as BsIcons from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './SortByItem.scss';

SortByItem.propTypes = {
  candidatesLength: PropTypes.number,
  options: PropTypes.array,
  name: PropTypes.string,
  onSortCandidates: PropTypes.func,
  isSearching: PropTypes.bool,
  isLoadingChild: PropTypes.bool
};

SortByItem.defaultProps = {
  candidatesLength: 0,
  options: [],
  onSortCandidates: null,
  name: '',
  isSearching: false,
  isLoadingChild: false,
}

function SortByItem(props) {
  const { onSortCandidates, options, name, candidatesLength, isSearching, isLoadingChild } = props;
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const [byName, setByName] = useState('Default');

  const handleShow = (e, option) => {
    e.preventDefault();
    setShow(!show);
    setByName(option.label);
    onSortCandidates(option);
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
          {(isSearching || isLoadingChild) ? "..." : candidatesLength} {candidatesLength > 1
            ? "results"
            : "result"} of "<strong>{name}</strong>"
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
          options.length > 0 &&
          options.map((option, index) => {
            return <Link
              to="#"
              key={index}
              className="sort-by-item__dropdown__link"
              onClick={(e) => handleShow(e, option)}
            >{option.label}</Link>
          })
        }
      </div>
    </div>
  );
}

export default SortByItem;