import React from 'react';
import {
  Navbar, NavbarBrand, NavLink, NavItem,
} from 'reactstrap';
import rsImg from '../images/rs_school_js.svg';

export default function Footer() {
  return (
    <footer id="footer">
      <div className="wrapper">
        <Navbar className="w-100 justify-content-between align-items-center h-100" light expand="md">
          <NavbarBrand href="https://rs.school/js/" className="garamond ">
            <img src={rsImg} alt="Logo" />
          </NavbarBrand>
          <NavItem>
            <NavLink className="active flex-fill">
              2021
            </NavLink>
          </NavItem>
          <div className="d-flex">
            <NavItem>
              <NavLink href="https://github.com/RomanFilipenia" className="active">
                RomanFilipenia
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/Qairkhan" className="active">
                Qairkhan
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/CmrdCat" className="active">
                CmrdCat
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/dmitriy-homza" className="active">
                dmitriy-homza
              </NavLink>
            </NavItem>
          </div>
        </Navbar>
      </div>
    </footer>
  );
}
