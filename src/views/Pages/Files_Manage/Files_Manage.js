import React, { Component } from 'react';
import { ModalHeader, ModalBody, ModalFooter, Input, Modal, Button, Card, CardBody, Col, Container, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import List from './List';
import { ReadPreference } from 'mongodb';

class Files_Manage extends Component {



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
      files_data: ""
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
    console.log(this.refs.fileupload.value)
    let dataToSend = {
      userData: {
        files_data: this.refs.fileupload.value
      }

    };
    
    let url = 'http://192.168.56.103:3000/users/uploadfiles';

      fetch(url, {
        method: "POST",
        body: JSON.stringify(dataToSend),

        headers: {
          "Content-Type": "text/html"
        }
      }).then(response => response.json())
        .then(responseJson => {
          console.log(responseJson)
          if (responseJson.success) {
            console.log("Success");
            console.log(responseJson);

          } else {
            console.log("failed");
            console.log(responseJson);
          }
        }).catch(err => this.setState({ error: err }));
    /*
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
*/

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

  onChangeFiles(e){
    this.setState({
      files_data: e.target.files
  });
  /*
    let files = e.target.files;
    
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload=(e)=>{
      this.setState({
        files_data: e.target.result
    });
  }*/
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

                              <h1>File Upload</h1>
                              <p className="text-muted">Upload Files</p>
                              
                              
                              <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input type="file" name="file" ref= "fileupload" onChange={(e)=>this.onChangeFiles(e)} />
                                </div>
                                <div className="modal-footer">
                                  <button type="submit" className="btn btn-primary">Upload</button>
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

export default Files_Manage;
