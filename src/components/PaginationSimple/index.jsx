import React from 'react';
import PropTypes from 'prop-types';
import { Button, Label } from 'reactstrap';
import * as IoIcons from 'react-icons/io';
import './PaginationSimple.scss';

PaginationSimple.propTypes = {
  currentPage: PropTypes.number,
  lastPage: PropTypes.number,
  handlePageClick: PropTypes.func,
};

PaginationSimple.defaultProps = {
  currentPage: 1,
  lastPage: 1,
  handlePageClick: null
}

function PaginationSimple(props) {
  const {currentPage, lastPage, handlePageClick} = props;

  return (
    <>
      <div className="pagination-simple">
        <Button
          type="button"
          disabled={currentPage === 1}
          // color={currentPage === 1 ? "secondary" : "primary"}
          style={
            currentPage === 1 ? { cursor: "default" } : { cursor: "pointer" }
          }
          onClick={(e) => handlePageClick(e, 0)}
        >
          <IoIcons.IoIosArrowBack
            style={currentPage === 1 ? { color: "var(--secondary)" } : { color: "var(--success)" }}
            className="paginate-icon"
          />
        </Button>
        <Label className="paginate-totalPage">{currentPage}/{lastPage}</Label>
        <Button
          type="button"
          style={
            currentPage === lastPage ? { cursor: "default" } : { cursor: "pointer" }
          }
          cursor="default"
          disabled={currentPage === lastPage && true}
          onClick={(e) => handlePageClick(e, 1)}
        >
          <IoIcons.IoIosArrowForward
            style={currentPage === lastPage ? { color: "var(--secondary)" } : { color: "var(--success)" }}
            className="paginate-icon"
          />
        </Button>
      </div>
    </>
  );
}

export default PaginationSimple;