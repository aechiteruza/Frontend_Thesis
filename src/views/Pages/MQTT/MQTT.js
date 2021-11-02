import React, { Component } from 'react';
import { Button, Card, InputGroup,InputGroupAddon,InputGroupText, ModalHeader, ModalBody, ModalFooter, Modal,CardBody, Col, Container, Form, Row} from 'reactstrap';
import List from './List';
import { Link, Redirect } from 'react-router-dom';

class MQTT extends Component {



  constructor() {
    super();
    this.togglepopup = this.togglepopup.bind(this);
    
    this.handlelist = this.handlelist.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleDuplicateUser = this.toggleDuplicateUser.bind(this);
    this.SuccessRegister = this.SuccessRegister.bind(this);
    this. savedatacontainner = this.savedatacontainner.bind(this);

    this.toggleToken = this.toggleToken.bind(this);
    this.state = {

      namemqtt: undefined,

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
    }

  }

  static displayName = 'ui-LoginForm';


  componentDidMount() {
    this.verifytoken();
  }

  toggleToken() {
    this.setState({
      modalToken: !this.state.modalToken,
    });
  }

  togglepopup(){
    this.setState({modalpopup: !this.state.modalpopup})
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
            username: localStorage.getItem("USERS_USERNAME"), 
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

  toggleDuplicateUser() {
    this.setState({
      modalDup: !this.state.modalDup,
    });
  }

  handlelist() {
   let dataToSend = {
    userData: {
      username: this.state.username,
    }
  };
    let url = 'http://192.168.56.103:3000/namemqttt/listusers';
    fetch(url, {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        console.log(responseJson.data[0].namemqtt)
        console.log("--test--")
        if (responseJson.success) {
          localStorage.setItem('NAMEMQTT_LOGGED', true);
          localStorage.setItem('NAMEMQTT_NAMEMQTT', responseJson.namemqtt);

          this.setState({
            namemqtt: responseJson.data,
            logged: true,
            error: undefined,
          })
          console.log("HDNL")
        } else {
          this.setState({
            modal: !this.state.modal,
          });
        }
      }).catch(err => this.setState({ error: err }));
    

  }

  savedatacontainner() {
    let dataToSend = {
      userData: {
        username: this.state.username,
        namemqtt: this.refs.namemqtt.value,
      }
    };
            let url = 'http://192.168.56.103:3000/namemqttt/register';
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
                  console.log("SUCCESS ADD NEW CONTAINER")
                  this.setState({modalpopup: !this.state.modalpopup})
                  window.location.reload();
                    }
      }).catch(err => this.setState({ error: err }));

  }


  handleDetailPageChange(e) {
    this.setState({
      DetailPage: e.target.value
    })
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
          this.state.DetailPage === false ? (
            this.state.logged === true ?

             <div>
             <p></p>
             <form onSubmit={this.handlelist}>
              <Col md="12" sm={{ size: 1, offset: 10 }}>
                  <diV>
                  <Row>
                      <Button color="primary" onClick={this.togglepopup}><i class="fa fa-plus-square-o"></i> Create</Button>{' '}
                   </Row>
                   </diV>
              </Col>
              <p></p>  
              <br />
              </form>
              <Col md="12" sm={{ size: 2 }}>
              <List details={this.state} />
              </Col>
              <Modal isOpen={this.state.modalpopup} toggle={this.togglepopup} className={this.props.className}>
                  <ModalHeader toggle={this.togglepopup}>Create MQTT</ModalHeader>
                  <ModalBody>
                  
                  <Container>
                      <Row className="justify-content-center">
                          <Col md="10">
                          <Card className="mx-4">
                           <CardBody className="p-4">              
                  <p className="text-muted">Create your MQTT Container</p>
                  <form onSubmit={this. savedatacontainner}>
                    <div className="form-group">
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="icon-user"></i></InputGroupText>
                        </InputGroupAddon>
                        <input type="namemqtt" ref="namemqtt" className="form-control" id="namemqtt" placeholder="Name Container" autoComplete="Username" />
                      </InputGroup>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">Create MQTT Container</button>
                    </div>
                  </form>
                  {/* Duplicate username */}
                  <Modal isOpen={this.state.modalDup} toggle={this.toggleDuplicateUser} className={this.props.className}>
                    <ModalHeader toggle={this.toggleDuplicateUser}>Message</ModalHeader>
                    <ModalBody>
                      Username already exists.
                  </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggleDuplicateUser}>Close</Button>
                    </ModalFooter>
                  </Modal>
                  {/* Success register */}
                  <Modal isOpen={this.state.successregister} toggle={this.SuccessRegister} className={this.props.className}>
                    <ModalHeader toggle={this.SuccessRegister}>Message</ModalHeader>
                    <ModalBody>
                      Create Name success.
                  </ModalBody>
                    <ModalFooter>
                      <Link to='/Pages/MQTT'><Button color="secondary" onClick={this.SuccessRegister}>Close</Button></Link>
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
            ///END DETAIL FORM AREA
              :
              <div className="app flex-row align-items-center">
              {
                <Redirect to='/Login'  />
                }
              </div>
              
          ) : ''
        }
      </div>
    );
  } 

}

export default MQTT;
