import React from 'react';
import { Link } from 'gatsby';
import { Navbar, NavbarBrand } from 'reactstrap';

export default function Footer() {
  return (
    <footer>
      <div className="wrapper">
        <Navbar className="w-100 justify-content-between" light expand="md">
          <NavbarBrand tag={Link} to="/" className="garamond">
            Terassa
          </NavbarBrand>
        </Navbar>
      </div>
    </footer>
  );
}
