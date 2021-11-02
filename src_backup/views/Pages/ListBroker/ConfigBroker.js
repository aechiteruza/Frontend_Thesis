import React, { Component } from 'react';
import { Card, Container, Row, Col, CardBody, Form, Button, Table, Badge, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Link } from 'react-router-dom';
class ConfigBroker extends Component {
    constructor() {
        super();
        this.FindBrokerDetails = this.FindBrokerDetails.bind(this);
        this.deletebroker = this.deletebroker.bind(this);
        this.toggledeletebroker = this.toggledeletebroker.bind(this);
        this.back = this.back.bind(this);
        this.state = {
            username: undefined,
            logged: false,
            users: undefined,
            error: undefined,
            brokerdetails: undefined,
            status: false,
            confirmdelete: false,
        }

    }



    componentDidMount() {
        this.verifytoken();
    }

    toggledeletebroker(){
        this.setState({
            confirmdelete: !this.state.confirmdelete,
          });
    }


    verifytoken() {
        let url = 'http://localhost:3000/auth/verifytoken';
        let token = localStorage.getItem('USERS_TOKEN');
        if (!token) {
            this.setState({
                error: "No token defined.",
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
                    this.FindBrokerDetails()
                } else {
                    localStorage.clear();
                    this.setState({
                        error: responseJson.error.message,
                        logged: false
                    })
                }
            }).catch(err => this.setState({ error: err }));

    }

    FindBrokerDetails() {
        let url = 'http://localhost:3000/broker/findbrokerdetails';
        let dataToSend = {
            userData: {
                username: localStorage.getItem('USERS_USERNAME'),
                brokername : this.props.match.params.brokername
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
                        brokerdetails : responseJson.data
                    })
                    console.log(this.state.brokerdetails)
                } else {
                    console.log("UN SUCCESS")
                }

                
            }).catch(err => this.setState({ error: err }));
    }

    deletebroker(){
        let url = 'http://localhost:3000/broker/deletebroker';
        let dataToSend = {
            userData: {
                username: localStorage.getItem('USERS_USERNAME'),
                brokername : this.props.match.params.brokername
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
                    this.props.history.push("/pages/ListBroker");
                } else {
                    console.log("UN SUCCESS")
                }

                
            }).catch(err => this.setState({ error: err }));
    }

    back(){
        return(this.props.history.push("/pages/ListBroker"));
        
    }

    render() {


        return (
            <div className="container">
                {
                    this.state.logged === true ?
                        <div>

                            <Container>
                                <Row className="justify-content-left">
                                    <Col md="6">
                                        <Card className="mx-6">
                                            <CardBody className="p-6">
                                                <Form>
                                                    {this.state.brokerdetails === undefined ? 'A' : 
                                                    <div>
                                                        <Table responsive size="sm">
                                                        <tbody>
                                                            <tr>
                                                                <td width="150">Name</td> <td> :   </td><td>{this.state.brokerdetails.brokername}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Server IP</td> <td> :   </td><td>{this.state.brokerdetails.serverip}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Port</td> <td> :   </td><td>{this.state.brokerdetails.portmqtt}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Registered Time</td> <td> :   </td><td>{this.state.brokerdetails.registeredtime}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Description</td> <td> :   </td><td>{this.state.brokerdetails.description}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Status</td> <td> :   </td><td>{this.state.status === true ? <Badge color="success">Active</Badge> : <Badge color="danger">Un Active</Badge>}</td>
                                                            </tr>
                                                        </tbody>
                                                        </Table>
                                                    </div>
                                                }
                                                    <Button color="dark" onClick={this.toggledeletebroker}>Delete</Button>     <Button color="dark" onClick={this.back}>Back</Button>
                                                    
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

                }
                 {/* Modal logout */}
                 <Modal isOpen={this.state.confirmdelete} toggle={this.toggledeletebroker} className={this.props.className}>
                  <ModalHeader toggle={this.toggledeletebroker}>Message</ModalHeader>
                  <ModalBody>
                    Confirm delete broker name : {this.props.match.params.brokername}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.deletebroker}>Logout</Button>
                    <Button color="secondary" onClick={this.toggledeletebroker}>Close</Button>
                  </ModalFooter>
                </Modal>
            </div>
        );


    
    }
}

export default ConfigBroker;