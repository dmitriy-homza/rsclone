import React, { useState } from 'react';
import { Link } from 'gatsby';
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
} from 'reactstrap';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <header className="col-12">
      <div className="wrapper">
        <Navbar className="d-flex w-100 justify-content-between" color="light" light expand="md">
          <NavbarBrand className="garamond">
            <Link to="/">Terassa</Link>
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
                <NavLink tag={Link} to="/contacts" activeClassName="active">
                  Contacts
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/login" activeClassName="active">
                  Login
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
