import DefaultHeader from 'components/DefaultHeader';
import RecruiterHeader from 'components/RecruiterHeader';
import StudentHeader from 'components/StudentHeader';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Header.scss';

Header.propTypes = {

}

Header.defaultProps = {

}

function Header(props) {
  const history = useHistory();
  // const user = useSelector((state) => state.user.current);
  // const [user] = useState({
  //   ...currentUser,
  //   s_profile: currentUser.s_profile ?? null,
  //   r_profile: currentUser.r_profile ?? null
  // });
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const roleId = parseInt(localStorage.getItem('role_id'), 10);
  let isRecruiterPath = localStorage.getItem('isRecruiterPath') === "true";

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const handleChangeRole = () => {
    localStorage.setItem("isRecruiterPath", !isRecruiterPath);
    history.push(isRecruiterPath ? "/" : "/recruiter");
  }

  const currentUI = !roleId ? (
    <DefaultHeader
      isRecruiterPath={isRecruiterPath}
      closeMobileMenu={closeMobileMenu}
      handleClick={handleClick}
      click={click}
      handleChangeRole={handleChangeRole}
      button={button}
    />
  ) : roleId === 2 ? (
    <RecruiterHeader
      closeMobileMenu={closeMobileMenu}
      handleClick={handleClick}
      click={click}
    />
  ) : (
    <StudentHeader
      closeMobileMenu={closeMobileMenu}
      handleClick={handleClick}
      click={click}
    />
  );

  return <>{currentUI}</>;
}

export default Header;