import React, { Component } from 'react';
import { Dropdown, ModalHeader, ModalBody, ModalFooter, Modal, Button, Card, CardBody, Col, Container, Form, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import  { Redirect } from 'react-router-dom';

class Login extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.togglelogout = this.togglelogout.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleChangePassword = this.toggleChangePassword.bind(this);
    this.handleFirstPasswordChange = this.handleFirstPasswordChange.bind(this);
    this.handleSecondPasswordChange = this.handleSecondPasswordChange.bind(this);
    this.toggleChangeEmail = this.toggleChangeEmail.bind(this);
    this.handleFirstEmailChange = this.handleFirstEmailChange.bind(this);
    this.handleSecondEmailChange = this.handleSecondEmailChange.bind(this);
    this.loggedOut = this.loggedOut.bind(this);
    this.state = {
      firstname: undefined,
      lastname: undefined,
      username: undefined,
      email: undefined,
      password: undefined,
      dropdownOpen: new Array(6).fill(false),
      changepasswordst: undefined,
      changepasswordnd: undefined,
      changeemailst: undefined,
      changeemailnd: undefined,
      signUp: {
        success: undefined,
        message: undefined
      },
      DetailPage: true,
      logged: false,
      users: undefined,
      error: undefined,
      modal: false,
      modallogout: false,
      modalChangePassword: false,
      modalChangeEmail: false,
    }

  }

  static displayName = 'ui-LoginForm';


  componentDidMount() {
    this.verifytoken();
  }

  toggleDropdown(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  togglelogout() {
    this.setState({
      modallogout: !this.state.modallogout,
    });
  }

  toggleChangePassword() {
    this.setState({
      modalChangePassword: !this.state.modalChangePassword,
    });
  }

  toggleChangeEmail() {
    this.setState({
      modalChangeEmail: !this.state.modalChangeEmail,
    });
  }

  getnameandemail() {
    let getuserfirstname = localStorage.getItem('USERS_FIRSTNAME');
    let getuserlastname = localStorage.getItem('USERS_LASTNAME');
    let getemail = localStorage.getItem('USERS_EMAIL');
    let getusername = localStorage.getItem('USERS_USERNAME');

    this.setState({
      firstname: getuserfirstname,
      lastname: getuserlastname,
      email: getemail,
      username: getusername
    })
  }

  verifytoken() {
    let url = 'http://192.168.56.103:3000/auth/verifytoken';
    let token = localStorage.getItem('USERS_TOKEN');
    if (!token) {
      this.setState({
        error: "No token defined. Please Login.",
        logged: false
      })
      return
    }
    fetch(url, {
      method: "GET",
      body: undefined,
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      }
    }).then(response => response.json())
      .then(responseJson => {
        if (responseJson.success) {
          this.setState({
            users: responseJson.success,
            error: undefined,
            logged: true
          })
          this.getnameandemail();
        } else {
          localStorage.clear();
          this.setState({
            error: responseJson.error.message,
            logged: false
          })
        }
      }).catch(err => this.setState({ error: err }));

  }

  loggedOut() {
    this.setState({
      firstname: undefined,
      lastname: undefined,
      username: undefined,
      email: undefined,
      password: undefined,
      logged: false,
      users: undefined,
      error: undefined
    })
    localStorage.clear();
    this.setState({
      modallogout: !this.state.modallogout,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let dataToSend = {
      userData: {
        username: this.state.username,
        password: this.state.password
      }
    };
    let url = 'http://192.168.56.103:3000/auth/login';
    fetch(url, {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        if (responseJson.success) {
          localStorage.setItem('USERS_TOKEN', responseJson.token);
          localStorage.setItem('USERS_LOGGED', true);
          localStorage.setItem('USERS_EMAIL', responseJson.email);
          localStorage.setItem('USERS_USERNAME', this.state.username);
          localStorage.setItem('USERS_FIRSTNAME', responseJson.firstname);
          localStorage.setItem('USERS_LASTNAME', responseJson.lastname);
          this.setState({
            firstname: responseJson.firstname,
            lastname: responseJson.lastname,
            username: this.state.username,
            email: responseJson.email,
            logged: true,
            error: undefined,
          })
        } else {
          this.setState({
            modal: !this.state.modal,
          });
        }
      }).catch(err => this.setState({ error: err }));
    //e.target.reset()

  }



  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    })
  }
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleFirstPasswordChange(e) {
    this.setState({
      changepasswordst: e.target.value
    })
  }

  handleSecondPasswordChange(e) {
    this.setState({
      changepasswordnd: e.target.value
    })
  }

  handleFirstEmailChange(e) {
    this.setState({
      changeemailst: e.target.value
    })
  }

  handleSecondEmailChange(e) {
    this.setState({
      changeemailnd: e.target.value
    })
  }

  handleDetailPageChange(e) {
    this.setState({
      DetailPage: e.target.value
    })
  }

  render() {
    return (
      <div className="container">
        {
          this.state.logged !== true ? 
              <div className="row" style={{ paddingTop: '50px' }}>
                
                <div className="col">
                </div>
                <div className="col">
                  <div className="card" style={{ width: '20rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>

                    <div className="card-body">
                      <form onSubmit={this.handleSubmit}>
                        <div><img className="card-img-top" src={'assets/img/bannermqtt.jpg'} alt="Card image cap" /></div>
                        <div className="form-group">
                          <label htmlFor="exampleInputUsername">Username</label>
                          <input type="username" onChange={this.handleUsernameChange} className="form-control" id="exampleInputUsername" aria-describedby="usernameHelp" placeholder="Username" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">Password</label>
                          <input type="password" onChange={this.handlePasswordChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <div className="form-check">
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                        <small id="emailHelp" className="form-text text-muted">If you are not registered. Plese <Link to='/Register'><a href='#' data-toggle="modal" data-target="#signupModel" data-whatever="@mdo" >Signup</a></Link></small>
                        <br />
                      </form>
                      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Message</ModalHeader>
                        <ModalBody>
                          Username or Password donsn't match
                  </ModalBody>
                        <ModalFooter>
                          <Button color="secondary" onClick={this.toggle}>Close</Button>
                        </ModalFooter>
                      </Modal>

                    </div>
                  </div>

                </div>
                <div className="col">
                </div>
              </div>
              ///END LOGIN FORM AREA
              : <Redirect to='pages/login'  />
        }
      </div>
    );
  }
}

export default Login;
