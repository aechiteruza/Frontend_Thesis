import React, { Component } from 'react';
import { Button, Card, ModalHeader, InputGroup,InputGroupAddon,InputGroupText,ModalBody, ModalFooter, Modal,CardBody, Col, Container, Row } from 'reactstrap';
import List from './List';
import { Link, Redirect } from 'react-router-dom';
class SparkContainer extends Component {

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
     
      namespark: undefined,
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
      //this.toggleToken()
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
          console.log("VERIFY spark page");
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
    let url = 'http://192.168.56.103:3000/namespark/listusers';
    fetch(url, {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        console.log(responseJson.data[0].namespark)
        console.log("--test--")
        if (responseJson.success) {
          localStorage.setItem('NODERED_LOGGED', true);
          localStorage.setItem('NODERED_NAMESPARK', JSON.stringify(responseJson.data));

          this.setState({
            namespark: responseJson.data,
            logged: true,
            error: undefined,
          })
          console.log("DATA FROM JSON RESPONSE",responseJson.data)
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
        namespark: this.refs.namespark.value,
        passwordspark: this.refs.passwordspark.value,
        packages: this.refs.packages.value,
        filename: this.refs.filename.value
      }
    };
    let url = 'http://192.168.56.103:3000/namespark/register';
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
              <Col md="10" sm={{ size: 1, offset: 8 }}>
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
                      
              <Col md="10" sm={{ size: 1 }}>

              <List details={this.state} />
              * Please store files to home directory before create spark container.<br/>
              * FTP : 192.168.56.103 with your username and password
              </Col>

              <Modal isOpen={this.state.modalpopup} toggle={this.togglepopup} className={this.props.className}>
                  <ModalHeader toggle={this.togglepopup}>Create pySpark</ModalHeader>
                  <ModalBody>
                  
                  <Container>
                      <Row className="justify-content-center">
                          <Col md="10">
                          <Card className="mx-4">
                           <CardBody className="p-4">

                  
                  <p className="text-muted">Create your pySpark Container</p>
                  <form onSubmit={this.savedatacontainner}>
                    <div className="form-group">
                    
            
                    
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="icon-user"></i></InputGroupText>
                        </InputGroupAddon>
                        <input type="namespark" ref="namespark" className="form-control" id="namespark" placeholder="NameContainer" autoComplete="" />
                      
                       
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="icon-lock"></i></InputGroupText>
                        </InputGroupAddon>
                        <input type="password" ref="passwordspark" className="form-control" id="passwordspark" placeholder="Password" autoComplete=""/>
                      
                       
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="icon-lock"></i></InputGroupText>
                        </InputGroupAddon>
                        <input type="text" ref="packages" className="form-control" id="packages" placeholder="Packages name" autoComplete=""/>
                      
                       
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="icon-cloud-download"></i></InputGroupText>
                        </InputGroupAddon>
                        <input type="text" ref="filename" className="form-control" id="filename" placeholder="File name" autoComplete=""/>
                      <br/><h7><font color="red">* Please make sure file already store in home directory.</font></h7>
                       
                      </InputGroup>
                      
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary" >Create pySpark Container</button>
                      
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
                      <Link to='/Pages/SparkContainer'><Button color="secondary" onClick={this.SuccessRegister}>Close</Button></Link>
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

export default SparkContainer;
