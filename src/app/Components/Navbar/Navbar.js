import React from 'react';
import {  Navbar, NavbarBrand} from 'reactstrap';
import './Navbar.css';
import logo from './../../Assets/brand.svg'
import { Link } from 'react-router-dom';


export default class NavigationBar extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Navbar dark expand="md">
          <img src={logo} alt="logo" className="brandLogo"/>
          <NavbarBrand href="/" className="mr-auto brand">Kiran Kembari</NavbarBrand>
          <div className="navDiv">
          <Link to="/">Home</Link>
          <Link to="/Player" >Players</Link>
          </div>
        </Navbar>
        
      </div>
    );
  }
}
  