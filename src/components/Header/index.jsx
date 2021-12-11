import { Button } from 'components/Button';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

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

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            WORK
            <i className="fab fa-linode"></i>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/event' className='nav-links' onClick={closeMobileMenu}>
                Event
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/find-job'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Find Job
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/employer'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Employer
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>SIGN IN</Button>}
        </div>
      </nav>
    </>
  );
}

export default Header;