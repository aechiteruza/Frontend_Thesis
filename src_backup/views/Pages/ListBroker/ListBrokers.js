import React, { Component } from 'react';
import { CardHeader, Table, Pagination, PaginationItem, Button, Card, CardBody, PaginationLink, Col, Container, Form, Badge, DropdownItem, DropdownMenu, DropdownToggle, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
class ListBroker extends Component {



  constructor() {
    super();
    this.toggleToken = this.toggleToken.bind(this);
    this.toggleAddBroker = this.toggleAddBroker.bind(this);
    this.handleAddBrokerName = this.handleAddBrokerName.bind(this);
    this.AddNewBrokerSubmit = this.AddNewBrokerSubmit.bind(this);
    this.handleAddBrokerDescription = this.handleAddBrokerDescription.bind(this);
    this.state = {
      firstname: undefined,
      lastname: undefined,
      username: undefined,
      email: undefined,
      password: undefined,
      signUp: {
        success: undefined,
        message: undefined
      },
      brokerlist: [{ brokername: "GG" }, { brokername: "GGG" }],
      DetailPage: true,
      logged: false,
      users: undefined,
      error: undefined,
      modal: false,
      modalToken: false,
      toggleaddnamebroker : false,
      AddNewBrokerZone: false,
      AddNewBrokerNameText: undefined,
      AddNewBrokerDescriptionText: undefined,
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

  toggleAddBroker() {

    this.setState({
      AddNewBrokerZone: !this.state.AddNewBrokerZone,
      toggleaddnamebroker: false,
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
    let url = 'http://localhost:3000/auth/verifytoken';
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
            users: responseJson.success,
            error: undefined,
            logged: true
          })
          this.getnameandemail();
          this.getbrokerlist()
        } else {
          localStorage.clear();
          this.setState({
            error: responseJson.error.message,
            logged: false
          })
        }
      }).catch(err => this.setState({ error: err }));

  }

  AddNewBrokerSubmit() {
    let url = 'http://localhost:3000/broker/addnewbroker';
    if (this.state.AddNewBrokerNameText === undefined) {
      this.setState({
        toggleaddnamebroker: true,
      })
      return
    }
    let dataToSend = {
      userData: {
        username: localStorage.getItem('USERS_USERNAME'),
        brokername: this.state.AddNewBrokerNameText,
        description: this.state.AddNewBrokerDescriptionText
      }
    }
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
          return(window.location.reload())
        } else {
          console.log("Can't Add Broker")
        }
      }).catch(err => this.setState({ error: err }));

    this.refs.AddNewBrokerNameText.value = '';
    this.refs.AddNewBrokerDescriptionText.value = '';

  }

  getbrokerlist() {
    let url = 'http://localhost:3000/broker/listbroker';
    let dataToSend = {
      userData: {
        username: localStorage.getItem('USERS_USERNAME'),
      }
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(responseJson => {
        if (responseJson.success) {
          this.setState({
            brokerlist: responseJson.data
          })
          console.log(this.state.brokerlist)
        } else {
          console.log("UN SUCCESS")
        }
      }).catch(err => this.setState({ error: err }));
  }

  handleDetailPageChange(e) {
    this.setState({
      DetailPage: e.target.value
    })
  }

  handleAddBrokerName(e) {
    this.setState({
      AddNewBrokerNameText: e.target.value
    })
    console.log(this.state.AddNewBrokerNameText)
  }

  handleAddBrokerDescription(e) {
    this.setState({
      AddNewBrokerDescriptionText: e.target.value
    })
    console.log(this.state.AddNewBrokerDescriptionText)
  }

  render() {
    //const data = this.state.brokerlist;
    //const data =[{"name":"test1"},{"name":"test2"}];
    /*setTimeout(() => {
      this.setState({
        DetailPage: false
      })
    }, 100)*/
    return (
      <div className="container">
        {
          this.state.DetailPage === true ? (
            this.state.logged === true ?
              ///BEGIN DETAIL FORM AREA
              <div className="app flex-row align-items-top">
                <Container>
                  <Row className="justify-content-left">
                    <Col md="10">
                      <Card className="mx-10">
                        <CardBody className="p-10">

                          <Form>
                            <Card>
                              <CardHeader>
                                <i className="fa fa-align-justify"></i> Broker List <br />

                              </CardHeader>
                              <CardBody>
                                {this.state.AddNewBrokerZone === false ? (
                                  <button onClick={this.toggleAddBroker}><i className="icon-plus"></i> Add New Broker</button>
                                )
                                  :
                                  (<div>
                                    <input type="text" onChange={this.handleAddBrokerName} ref="AddNewBrokerNameText" id="AddNewBrokerNameText" placeholder="Broker Name"></input><br/><br/>
                                    <input type="text" onChange={this.handleAddBrokerDescription} ref="AddNewBrokerDescriptionText" id="AddNewBrokerDescriptionText" placeholder="Description"></input><br/><br/>
                                    <button onClick={this.AddNewBrokerSubmit}><i className="icon-plus"></i> OK</button>
                                    <button onClick={this.toggleAddBroker}><i className="icon-close"></i> Close</button>
                                    {this.state.toggleaddnamebroker === false ? "" : <div><br/><font color="red">Please put Brokername</font></div>}
                                  </div>)}
                                <br /><br />

                                <Table responsive size="sm">
                                  <thead>
                                    <tr>
                                      <th>Username</th>
                                      <th>Date registered</th>
                                      <th>Description</th>
                                      <th>Status</th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    
                                      {this.state.brokerlist.map(function (d, idx) {
                                        return (
                                          <tr>
                                            <td key={idx}>{d.brokername}</td>
                                            <td>{d.registeredtime}</td>
                                            <td>{d.description}</td>
                                            <td><Badge color="success">Active</Badge></td>
                                            <td><Link to={`/pages/ListBroker/${d.brokername}`}> <i className="icon-wrench" size="lg"> </i></Link></td>
                                          </tr>
                                        )
                                      })}
                                  </tbody>
                                </Table>
                              </CardBody>
                            </Card>
                            </Form>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </div>








              ///END DETAIL FORM AREA
              :
              <div className="app flex-row align-items-top">
                <Container>
                  <Row className="justify-content-left">
                    <Col md="6">
                      <Card className="mx-6">
                        <CardBody className="p-6">
                          <Form>
                            <center><h3>Don't have permission</h3><Link to='/pages/login'><Button color="primary" >Go to Login</Button></Link></center>
                          </Form>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </div>

          ) : ''
        }
      </div>
    );
  }

}

export default ListBroker;
