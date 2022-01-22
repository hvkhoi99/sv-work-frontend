import React, { useEffect, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import * as FiIcons from 'react-icons/fi';
import './StudentProfileMoreOptions.scss';

StudentProfileMoreOptions.propTypes = {

};

function StudentProfileMoreOptions(props) {
  const ref = useRef(null);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        isHidden === false && setIsHidden(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isHidden]);

  const handleHidden = () => {
    setIsHidden(!isHidden);
  }

  return (
    <div className="student-profile-more-options" ref={ref}>
      <FiIcons.FiMoreHorizontal
        className="student-profile-more-options__icon"
        onClick={handleHidden}
      />
      <div
        className={
          isHidden
            ? "student-profile-more-options__options hidden"
            : "student-profile-more-options__options"
        }
        onClick={handleHidden}
      >
        <ul>
          <li>Edit</li>
          <li>Delete</li>
        </ul>
      </div>
    </div>
  );
}

export default StudentProfileMoreOptions;