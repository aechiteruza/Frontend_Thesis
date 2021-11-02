import React, { Component } from 'react';
import { ModalHeader, ModalBody, ModalFooter,Dropdown, DropdownMenu, DropdownToggle, Modal,FormGroup,Label,Input, Button, Card, CardBody, CardFooter, Col, Container, Form, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
class Createdatabase extends Component {
  constructor() {
    super();
    this.toggledrop = this.toggle.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
    this.toggle = this.toggle.bind(this);
   // this.toggleDuplicateUser = this.toggleDuplicateUser.bind(this);
    this.SuccessRegister = this.SuccessRegister.bind(this);
    this.changedropdown = this.changedropdown.bind(this);
 

    this.state = {

      dropdownOpen: false,
      selectdb: undefined,
      dbname: undefined,
      name: undefined,
      password: undefined,
      repeatpassword: undefined,
      signUp: {
        success: undefined,
        message: undefined
      },
      users: undefined,
      error: undefined,
      modal: false,
      modalDup: false,
      successregister: false,
      dropdownvalue: "InfluxDB",
    }

  }

  /*
  Register Form Area
  */
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

  toggledrop(){this.setState({
    dropdownOpen: !this.state.dropdownOpen
  });}

  SuccessRegister() {
    this.setState({
      successregister: !this.state.successregister,
    });
  }
  changedropdown(e){
    e.preventDefault();
    console.log("CHANGE");
    this.setState({
      dropdownvalue: e.target.value,
    }); 
    console.log(this.state.dropdownvalue);
  }



  handleSubmit(e) {
    e.preventDefault();
    let pwd = this.refs.password.value;
    let rpwd = this.refs.repeatpassword.value;
    let dataToSend = {
      userData: {
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
          this.SuccessRegister()
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
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">

                  <h1>Database</h1>
                
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
                        <input type="text" ref="dbname" className="form-control" id="dbname" placeholder="Databasename" />
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
                  
                  {/* Success register */}
                  <Modal isOpen={this.state.successregister} toggle={this.SuccessRegister} className={this.props.className}>
                    <ModalHeader toggle={this.SuccessRegister}>Message</ModalHeader>
                    <ModalBody>
                      Database success.
                  </ModalBody>
                    <ModalFooter>
                      <Link to='/Pages/Datastore'><Button color="secondary" onClick={this.SuccessRegister}>Close</Button></Link>
                    </ModalFooter>
                  </Modal>
                  
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Createdatabase;