import React, { Component } from 'react';
import { ModalHeader, ModalBody, ModalFooter, Input, Modal, Button, Card, CardBody, Col, Container, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import List from './List';

class Datastore extends Component {



  constructor() {
    super();
    this.handlelist = this.handlelist.bind(this);

    this.togglepopup = this.togglepopup.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
    this.toggle = this.toggle.bind(this);
    // this.toggleDuplicateUser = this.toggleDuplicateUser.bind(this);
    this.SuccessRegister = this.SuccessRegister.bind(this);
    this.changedropdown = this.changedropdown.bind(this);

    this.toggleToken = this.toggleToken.bind(this);
    this.state = {

      dropdownOpen: false,
      selectdb: undefined,
      dbname: undefined,
      name: undefined,
      password: undefined,
      repeatpassword: undefined,


      firstname: undefined,
      lastname: undefined,
      username: undefined,
      email: undefined,
      password: undefined,
      signUp: {
        success: undefined,
        message: undefined
      },
      DetailPage: true,
      logged: false,
      users: undefined,
      error: undefined,
      modal: false,
      modalToken: false,

      successregister: false,
      dropdownvalue: "InfluxDB",
    }

  }


  componentDidMount() {
    this.verifytoken();
  }

  toggleToken() {
    this.setState({
      modalToken: !this.state.modalToken,
    });
  }

  passwordCheck(e) {
    e.preventDefault();
    console.log(this.refs.password.value)

    console.log(this.refs.repeatpassword.value)

  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggledrop() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  SuccessRegister() {
    this.setState({
      successregister: !this.state.successregister,
    });
  }
  changedropdown(e) {
    e.preventDefault();
    console.log("CHANGE");
    this.setState({
      dropdownvalue: e.target.value,
    });
    console.log(this.state.dropdownvalue);
  }

  togglepopup() {
    this.setState({ modalpopup: !this.state.modalpopup })
  }

  handleSubmit(e) {
    e.preventDefault();
    let pwd = this.refs.password.value;
    let rpwd = this.refs.repeatpassword.value;
    let dataToSend = {
      userData: {
        username: this.state.username,
        selectdb: this.state.dropdownvalue,
        dbname: this.refs.dbname.value,
        name: this.refs.name.value,

        password: pwd,
      },

    };
    if (pwd === rpwd) {
      let url = 'http://192.168.56.103:3000/createdb/register';

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
            this.setState({
              ...this.state,
              signUp: {
                success: true,
                message: responseJson.message

              }
            });
            this.setState({ modalpopup: !this.state.modalpopup })
            window.location.reload();
          } else {
            this.setState({
              ...this.state,
              signUp: {
                success: false,
                message: responseJson.message
              }
            });
          }
        }).catch(err => this.setState({ error: err }));

      this.refs.selectdb.value = '';
      this.refs.dbname.value = '';
      this.refs.name.value = '';
      this.refs.password.value = '';
      this.refs.repeatpassword.value = '';
    } else {
      this.setState({
        modal: !this.state.modal,
      });
      this.refs.password.value = '';
      this.refs.repeatpassword.value = '';
    }


  }


  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }
  handleRepeatPasswordChange(e) {
    this.setState({
      repeatpassword: e.target.value
    })
  }

  verifytoken() {
    let url = 'http://192.168.56.103:3000/auth/verifytoken';
    let token = localStorage.getItem('USERS_TOKEN');
    if (!token) {
      this.setState({
        error: "No token defined.",
        logged: false
      })
      this.toggleToken()
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
            username: localStorage.getItem("USERS_USERNAME"), //managesuser
            error: undefined,
            logged: true
          })
          console.log("VERIFY");
          this.handlelist();
        } else {
          localStorage.clear();
          this.setState({
            error: responseJson.error.message,
            logged: false
          })
        }
      }).catch(err => this.setState({ error: err }));

  }

  handleDetailPageChange(e) {
    this.setState({
      DetailPage: e.target.value
    })
  }

  handlelist() {
    //e.preventDefault();
    let dataToSend = {
      userData: {
        username: this.state.username,
      }
    };
    let url = 'http://192.168.56.103:3000/createdb/listusers';
    fetch(url, {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(responseJson => {
        /*
        console.log(responseJson)
        console.log(responseJson.data[0].selectdb)
        console.log(responseJson.data[0].dbname)
        console.log(responseJson.data[0].name)
        console.log(responseJson.data[0].host)
        console.log(responseJson.data[0].link)
*/
        console.log("--test--")
        if (responseJson.success) {
          /*
          localStorage.setItem('CREATEDB_LOGGED', true);
          localStorage.setItem('CREATEDB_SELECTDB', responseJson.selectdb);
          localStorage.setItem('CREATEDB_DBNAME', responseJson.dbname);
          localStorage.setItem('CREATEDB_NAME', responseJson.name);          
          localStorage.setItem('CREATEDB_HOST', responseJson.host);
          localStorage.setItem('CREATEDB_LINK', responseJson.link);
          */
          this.setState({
            selectdb: responseJson.data,
            dbname: responseJson.data,
            name: responseJson.data,
            host: responseJson.data,
            link: responseJson.data,
            logged: true,
            error: undefined,
          })
        } else {
          this.setState({
            modal: !this.state.modal,
          });
        }
      }).catch(err => this.setState({ error: err }));


  }

  render() {
    setTimeout(() => {
      this.setState({
        DetailPage: false
      })
    }, 100)
    return (
      <div className="container">
        {

          ///BEGIN DETAIL FORM AREA
          this.state.DetailPage === false ? (
            this.state.logged === true ?
              <div><p></p>
                <form>
                  <Col md="12" sm={{ size: 1, offset: 10 }}>
                    <diV>
                      <Row>

                        <Button color="primary" onClick={this.togglepopup}><i class="fa fa-plus-square-o"></i> Create</Button>{' '}

                      </Row><p></p>
                    </diV>
                  </Col>
                </form>


                <Col md="12" sm={{ size: 1 }}>

                  <List details={this.state} />
                </Col>

                <Modal isOpen={this.state.modalpopup} toggle={this.togglepopup} className={this.props.className}>

                  <ModalBody>
                    <Container>
                      <Row className="justify-content-center">
                        <Col md="12">
                          <Card className="mx-8">
                            <CardBody className="p-4">

                              <h1>Database</h1>
                              <p className="text-muted">Create your database</p>
                              <form onSubmit={this.handleSubmit}>
                                <div className="form-group">

                                  <InputGroup className="mb-3">
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>Select database</InputGroupText>
                                    </InputGroupAddon>

                                    <Col sm={4}>
                                      <Input type="select" value={this.state.dropdownvalue} onChange={this.changedropdown} ref="selectdb" className="form-control" id="selectdb" >
                                        <option value="InfluxDB">InfluxDB</option>
                                        <option value="MongoDB">MongoDB</option>
                                        <option value="MySQL">MySQL</option>
                                      </Input>
                                    </Col>
                                  </InputGroup>
                                  <InputGroup className="mb-3">
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText><i className="icon-user"></i></InputGroupText>
                                    </InputGroupAddon>
                                    <input type="text" ref="dbname" className="form-control" id="dbname" placeholder="Database Name" />
                                  </InputGroup>
                                  <InputGroup className="mb-3">
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText><i className="icon-user"></i></InputGroupText>
                                    </InputGroupAddon>
                                    <input type="name" ref="name" className="form-control" id="name" placeholder="Username" autoComplete="Username" />
                                  </InputGroup>
                                  <InputGroup className="mb-3">
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <i className="icon-lock"></i>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <input type="password" ref="password" className="form-control" id="password" placeholder="Password" autoComplete="Password" />
                                  </InputGroup>
                                  <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <i className="icon-lock"></i>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <input type="password" ref="repeatpassword" className="form-control" id="repeatpassword" placeholder="Repeat Password" autoComplete="New-Password" />
                                  </InputGroup>

                                </div>
                                <div className="modal-footer">
                                  <button type="submit" className="btn btn-primary">Create Database</button>
                                </div>
                              </form>
                              {/* Password not same */}
                              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader toggle={this.toggle}>Message</ModalHeader>
                                <ModalBody>
                                  Please put password and re-password with same words.
                  </ModalBody>
                                <ModalFooter>
                                  <Button color="secondary" onClick={this.toggle}>Close</Button>
                                </ModalFooter>
                              </Modal>



                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </Container>
                  </ModalBody>
                </Modal>

              </div>

              :
              <div className="app flex-row align-items-center">
              {
                <Redirect to='/Login'  />
                }
              </div>

          ) : ""
        }
      </div>
    );
  }

}

export default Datastore;
