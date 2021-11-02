import React, { Component } from 'react';
import { ModalHeader, ModalBody, ModalFooter, Modal, Button, Card, CardBody, CardGroup, Col, Container, Form, Badge, DropdownItem, DropdownMenu, DropdownToggle, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
class Main extends Component {

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
    console.log("jjjkjk")
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
  render() {
    return (
      {
        this.state.logged === true ?
      
      <div className="app flex-row align-items-center">
                <Container>
                  <Row className="justify-content-center">
                    <Col md="8">
                      <Card className="mx-8">
                        <CardBody className="p-8">
                          <Form>
                            <div align='center'>
                          <img src={'assets/img/bannermqtt.jpg'} alt="Cloud MQTT Platform" />
                          </div>
                          </Form>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </div>
              : 
              <div className="app flex-row align-items-center">
              {
                <Redirect to='/Login'  />
                }
              </div>
            }
    );
  } 

}

export default Main;
