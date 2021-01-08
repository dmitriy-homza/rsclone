import React from 'react';
import Header from './header';
import Footer from './footer';

// eslint-disable-next-line react/prop-types
export default ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);
