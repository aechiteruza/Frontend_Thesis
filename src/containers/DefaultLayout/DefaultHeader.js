import React, { Component } from 'react';
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
  constructor(){
    super();
    this.state = {
      loggedin: false,
      username: undefined
    }
  }
  componentDidMount() {
    const getstate = localStorage.getItem('USERS_LOGGED');
    if (getstate != undefined){
      const username = localStorage.getItem('USERS_FIRSTNAME');
      this.setState({
        loggedin: getstate,
        username: username
      })
      console.log("SHOW STATE LOGIN : ", getstate)
      console.log("Welcome  : ", username)
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
        
          <NavItem className="px-3">
            <NavLink href="#/Pages/Login">{this.state.username}</NavLink>
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
