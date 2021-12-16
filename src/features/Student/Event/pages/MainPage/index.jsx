import React from 'react';
import { Link } from 'react-router-dom';

StudentMainEventPage.propTypes = {

};

function StudentMainEventPage(props) {
  return (
    <div className="event-main">
      Main event page.
      <Link to="/event/create">Create</Link>
    </div>
  );
}

export default StudentMainEventPage;