import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};


const defaultProps = {};

class DefaultHeader extends Component {
  constructor() {
    super();
    this.getName = this.getName.bind(this);
    this.state = {
      firstname: undefined,
      lastname: undefined,
      username: undefined,
      email: undefined,
      messagegg: "",
    }

  }
  
  getName(){
    let getuserfirstname = localStorage.getItem('USERS_FIRSTNAME');


    if(getuserfirstname != null){
      this.setState({
        messagegg: "Have",
        firstname: getuserfirstname,
      })
    }else{
      this.setState({
        messagegg: "Don't Have",
      })
    }
  
  }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
        //<img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
          full={{ src: 'assets/img/bannermqtt.jpg', width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-12">
          {localStorage.getItem('USERS_FIRSTNAME') !== null ? <div><NavLink href="#/Pages/Login">
          <i className="icon-user">  {localStorage.getItem('USERS_FIRSTNAME')}   {localStorage.getItem('USERS_LASTNAME')}</i>
          </NavLink> </div>
          : <NavLink href="#/Pages/Login">Login</NavLink> }

          </NavItem>

        </Nav>
        <Nav className="ml-auto" navbar>
          
          
        </Nav>

        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
