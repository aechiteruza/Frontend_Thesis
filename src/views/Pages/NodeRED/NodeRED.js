import React, { Component } from 'react';
import {  FormGroup,Button, Card, ModalHeader, InputGroup,InputGroupAddon,InputGroupText,ModalBody, ModalFooter, Modal,CardBody, Col, Container, Form, Row ,Input,Label,Table} from 'reactstrap';
import List from './List';
import  { Link, Redirect } from 'react-router-dom';


class NodeRED extends Component {

  constructor() {
    super();
    this.togglepopup = this.togglepopup.bind(this);
    //this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handlelist = this.handlelist.bind(this);
    this.toggle = this.toggle.bind(this);
    
    this.toggleDuplicateUser = this.toggleDuplicateUser.bind(this);
    this.SuccessRegister = this.SuccessRegister.bind(this);
    this.savedatacontainner = this.savedatacontainner.bind(this);
   // this.checklist = this.checklist.bind(this);

    this.toggleToken = this.toggleToken.bind(this);
    this.state = {
     
      namered: undefined,
      userred:undefined,
      passred:undefined,
     

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
            username: localStorage.getItem("USERS_USERNAME"), //managesuser
            error: undefined,
            logged: true
          })
          console.log("VERIFY node red page");
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
    //e.preventDefault();  
    let dataToSend = {
      userData: {
        username: this.state.username,
      }
    };
    let url = 'http://192.168.56.103:3000/nameredd/listusers';
    fetch(url, {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        console.log(responseJson.data[0].namered)
        console.log("--test--")
        if (responseJson.success) {
          localStorage.setItem('NODERED_LOGGED', true);
          localStorage.setItem('NODERED_NAMERED', JSON.stringify(responseJson.data));

          this.setState({
            namered: responseJson.data,
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
    let pwd1 = this.refs.passred.value;
    let dataToSend = {
      userData: {
        username: this.state.username,
        namered: this.refs.namered.value,
        userred: this.refs.userred.value,
        passred: pwd1

      }
    };
    let url = 'http://192.168.56.103:3000/nameredd/register';
    fetch(url, {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
         if(responseJson.success){
           console.log("SUCCESS ADD NEW CONTAINER")
           
           setTimeout(() => {
            this.setState({modalpopup: !this.state.modalpopup})
          }, 200)
          this.handlelist()
         }   
      }).catch(err => this.setState({ error: err }));

  }

/*
  handleSignUpSubmit(e) {
    e.preventDefault();
    let dataToSend = {
      userData: {
        username : this.state.username,
        namered: this.refs.namered.value,
      },

    };
      let url = 'http://192.168.56.103:3000/nameredd/register';

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
      this.refs.namered.value = '';

    } 


  */


  

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
    }, 200)

   
    
    return (
      <div className="container">
        {
          this.state.DetailPage === false ? (
            this.state.logged === true ?
              ///CREATE NAME NODERED
              <div>
              <p></p>
              <form >
              <Col md="12" sm={{ size: 1, offset: 10 }}>
                  <diV>
                  <Row>
                      <Button color="primary" onClick={this.togglepopup}><i class="fa fa-plus-square-o"></i> Create</Button>{' '}
          {/*<Button color="secondary" onSubmit={this.runcontainer}><i class="fa fa-edit"></i> List</Button>*/}
                   </Row>
                   </diV>
              </Col>
              <p></p>  
              <br />
              </form>       
                      
              <Col md="12" sm={{ size: 1 }}>

              <List details={this.state} />
              </Col>

              <Modal isOpen={this.state.modalpopup} toggle={this.togglepopup} className={this.props.className}>
                  <ModalHeader toggle={this.togglepopup}>Create Node-Red</ModalHeader>
                  <ModalBody>
                  
                  <Container>
                      <Row className="justify-content-center">
                          <Col md="10">
                          <Card className="mx-4">
                           <CardBody className="p-4">

                  
                  <p className="text-muted">Create your Node-RED Container</p>
                  <form onSubmit={this.savedatacontainner}>
                    <div className="form-group">
                    
            
                    
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="icon-user"></i></InputGroupText>
                        </InputGroupAddon>
                        <input type="namered" ref="namered" className="form-control" id="namered" placeholder="NameContainer" autoComplete="namecontainer" />
                      
                       
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="icon-user"></i></InputGroupText>
                        </InputGroupAddon>
                        <input type="userred" ref="userred" className="form-control" id="userred" placeholder="UserName" autoComplete="userred" />
                      
                       
                      </InputGroup>
                      
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="icon-lock"></i></InputGroupText>
                        </InputGroupAddon>
                        <input type="text" ref="passred" className="form-control" id="passred" placeholder="Password" autoComplete="passred" />
                      
                       
                      </InputGroup>
                      
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary" >Create Node-RED Container</button>
                      
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
             
                  <Modal isOpen={this.state.successregister} toggle={this.SuccessRegister} className={this.props.className}>
                    <ModalHeader toggle={this.SuccessRegister}>Message</ModalHeader>
                    <ModalBody>
                    Create Name success.
                  </ModalBody>
                    <ModalFooter>
                      <Link to='/Pages/NodeRED'><Button color="secondary" onClick={this.SuccessRegister}>Close</Button></Link>
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

export default NodeRED;
