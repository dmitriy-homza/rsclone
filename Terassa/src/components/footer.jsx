import React from 'react';
import {
  Navbar, NavbarBrand, NavLink, NavItem,
} from 'reactstrap';
import rsImg from '../images/rs_school_js.svg';

export default function Footer() {
  return (
    <footer id="footer">
      <div className="wrapper">
        <Navbar className="w-100 justify-content-between" light expand="md">
          <NavbarBrand href="https://rs.school/js/" className="garamond">
            <img src={rsImg} alt="Logo" />
          </NavbarBrand>
          <NavItem>
            <NavLink href="https://rs.school/js/" activeClassName="active">
              2021
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/RomanFilipenia" activeClassName="active">
              RomanFilipenia
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/Qairkhan" activeClassName="active">
              Qairkhan
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/CmrdCat" activeClassName="active">
              CmrdCat
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/dmitriy-homza" activeClassName="active">
              dmitriy-homza
            </NavLink>
          </NavItem>
        </Navbar>
      </div>
    </footer>
  );
}
