/* eslint-disable implicit-arrow-linebreak */
import React, { useState } from 'react';
import { Link } from 'gatsby';
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink, NavItem,
} from 'reactstrap';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <header className="col-12">
      <div className="wrapper">
        <Navbar className="d-flex w-100 justify-content-between" color="light" light expand="md">
          <NavbarBrand tag={Link} to="/" className="garamond">
            Terassa
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/" activeClassName="active">
                  Main
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/book" activeClassName="active">
                  Book
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/login" activeClassName="active">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/admin-additions" activeClassName="active">
                  Admin-additions
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/order" activeClassName="active">
                  Order
                </NavLink>
              </NavItem>
              <NavItem>

                <NavLink tag={Link} to="/private" activeClassName="active">
                  Private
                </NavLink>
              </NavItem>    
     <NavItem>
                <NavLink tag={Link} to="/adminPanel" activeClassName="active">
                  AdminPanel
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/userPanel" activeClassName="active">
                  UserPanel
                 </NavLink>
              </NavItem>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
