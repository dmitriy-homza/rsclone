import React, { useState } from 'react';
import { Link } from 'gatsby';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <header>
      <Navbar color="light" light expand="md">
        <NavbarBrand><Link to="/">Terassa</Link></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink><Link to="/">Main</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link to="/book/">Book</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link to="/contacts/">Contacts</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link to="/login/">Login</Link></NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
