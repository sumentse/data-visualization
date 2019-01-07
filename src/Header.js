import React from 'react';
import {Navbar, NavItem, Icon} from 'react-materialize';
import './Header.css';

const Header = (props) => {
  return (
    <Navbar className="light-blue" brand={props.brand} right />
  );

};

export default Header;
