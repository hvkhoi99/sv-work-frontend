import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as FiIcons from 'react-icons/fi';
import './StudentProfileMoreOptions.scss';
import PopupUpdateStudentSkill from '../../PopupUpdateStudentProfile/PopupUpdateStudentSkills';
import PopupUpdateStudentProfile from '../../PopupUpdateStudentProfile/PopupUpdatePersonalInfo';
import PopupUpdateStudentOverview from '../../PopupUpdateStudentProfile/PopupUpdateStudentOverview';
import PopupUpdateStudentExperience from '../../PopupUpdateStudentProfile/PopupUpdateStudentExperience';
import PopupUpdateStudentEducation from '../../PopupUpdateStudentProfile/PopupUpdateStudentEducation';
import PopupUpdateStudentCertificate from '../../PopupUpdateStudentProfile/PopupUpdateStudentCertificate';
import PopupUpdateStudentLanguages from '../../PopupUpdateStudentProfile/PopupUpdateStudentLanguages';

StudentProfileMoreOptions.propTypes = {
  typeIcon: PropTypes.string,
  typePopup: PropTypes.string,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,

  label: PropTypes.string,
  initData: PropTypes.string,
  onTextChange: PropTypes.func,
  onDelete: PropTypes.func,
  isUpdating: PropTypes.bool,
  isDeleting: PropTypes.bool
};

StudentProfileMoreOptions.defaultProps = {
  typeIcon: '',
  typePopup: '',
  initialValues: {},
  onSubmit: null,

  label: '',
  initData: '',
  onTextChange: null,
  onDelete: null,
  isUpdating: false,
  isDeleting: false,
}

function StudentProfileMoreOptions(props) {
  const {
    typePopup, initialValues, onSubmit,
    label, initData, onTextChange, isUpdating, onDelete, isDeleting
  } = props;
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

  const handleDelete = () => {
    onDelete();
    setIsHidden(true);
  }

  const renderPopup = (type) => {
    switch (type) {
      case "personal-info":
        return (
          <PopupUpdateStudentProfile
            typeIcon="more-edit"
            initialValues={initialValues}
            onSubmit={onSubmit}
          />
        );
      case "overview":
        return (
          <PopupUpdateStudentOverview
            typeIcon="more-edit"
            label={label}
            initData={initData}
            onTextChange={onTextChange}
            isUpdating={isUpdating}
          />
        );
      case "experiences":
        return (
          <PopupUpdateStudentExperience
            typeIcon="more-edit"
            initialValues={initialValues}
            onSubmit={onSubmit}
          />
        );
      case "educations":
        return (
          <PopupUpdateStudentEducation
            typeIcon="more-edit"
            initialValues={initialValues}
            onSubmit={onSubmit}
          />
        );
      case "skills":
        return (
          <PopupUpdateStudentSkill
            typeIcon="more-edit"
            initialValues={initialValues}
            onSubmit={onSubmit}
          />
        );
      case "certificates":
        return (
          <PopupUpdateStudentCertificate
            typeIcon="more-edit"
            initialValues={initialValues}
            onSubmit={onSubmit}
          />
        );
      case "languages":
        return (
          <PopupUpdateStudentLanguages
            typeIcon="more-edit"
            initialValues={initialValues}
            onSubmit={onSubmit}
          />
        );
      default:
        break;
    }
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
      >
        <ul>
          <li onClick={handleHidden}>{renderPopup(typePopup)}</li>
          {
            ["overview", "experiences", "educations", "skills", "certificates", "languages"]
              .includes(typePopup) &&
            <li onClick={handleDelete}>
              {isDeleting && <span className="spinner-border spinner-border-sm mr-1"></span>}
              Delete
            </li>
          }
        </ul>
      </div>
    </div>
  );
}

export default StudentProfileMoreOptions;