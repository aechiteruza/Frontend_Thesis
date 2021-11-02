import React, { Component } from 'react';
import { TiMediaPlayOutline } from 'react-icons/ti';
import {  FormGroup,Button, Card, ModalHeader, InputGroup,InputGroupAddon,InputGroupText,ModalBody, ModalFooter, Modal,CardBody, Col, Container, Form, Row ,Input,Label,Table} from 'reactstrap';
import DefaultHeader from '../../../containers/DefaultLayout/DefaultHeader'
import { Link } from 'react-router-dom';
class List extends Component{
  constructor() {
    super();
    //this.togglepopup = this.togglepopup.bind(this);
    //this.namedetail = this.namedetail.bind(this);
    //this.getstatus = this.getstatus.bind(this);
    this.state = {
      username: undefined,
      namered: undefined,
     

    }
  }

  

    render() {
        if(this.props.details.namespark === undefined) this.item = "";
      else {
          this.item = this.props.details.namespark.map((item, key) =>
          
          <tr>
           
           <td><button disabled="true" aria-pressed="true" class="btn btn-dark btn-block active">{item.namespark}</button></td>
           <td>
           <ListStatus namecontainer={item.namespark} />
           </td>
           <td>
           <ListPort namecontainer={item.namespark}/>
           </td>
           <td>
           <Listname name={item} />
           </td>
           </tr>
           
        );
      }

        return (
        <div>
        <Table striped bordered>
        <thead>
          <tr align="center">
            
            <th>Name Containner</th>
            <th>Status</th>
            <th>Host</th>
            <th>Action</th>
            
          </tr>
        </thead>
        <tbody>
          {this.item}
         </tbody> 
         </Table>                
         
         
         </div>
                            
            
        )    
        
    }
}


class ListStatus extends Component{
  constructor() {
    super();
    this.getcontainer = this.getcontainer.bind(this);
    this.state = {
      namecontainer: undefined, 
      status: undefined
      }
  }
  componentDidMount(){
    //console.log(this.props.namecontainer)
    this.getcontainer();
  }
  getcontainer() {

    //e.preventDefault();  
    
    let dataToSend = {
      userData: {
        //username: localStorage.getItem("USERS_USERNAME"), 
        namecontainer: localStorage.getItem("USERS_USERNAME")+this.props.namecontainer
      },

    };
    let url = 'http://192.168.56.103:3000/namespark/getstatuscontainer';
    fetch(url, {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
    .then(responseJson => {
      this.setState({
        status:responseJson.data
      })
      
      
    })
  }
render(){
  if(this.state.status === "running"){
    this.item = <button disabled="true" aria-pressed="true" class="btn btn-success btn-block active">RUNNING</button>;
    
 }else if(this.state.status === "paused"){
    this.item = <button disabled="true" aria-pressed="true" class="btn btn-warning btn-block active">STOP</button>;
 
 }else {
     this.item = <button disabled="true" aria-pressed="true" class="btn btn-dark btn-block active">EXITED</button>;
       
   }
return(
   <div>
   {this.item}
   </div>
);
}
}

class ListPort extends Component{
  constructor() {
    super();
    this.getcontainer = this.getcontainer.bind(this);
    this.state = {
      namecontainer: undefined, 
      }
  }
  componentDidMount(){
    //console.log(this.props.namecontainer)
    this.getcontainer();
  }
  getcontainer() {
    
    //e.preventDefault();  
    setTimeout(() => {
    let dataToSend = {
      userData: {
        //username: localStorage.getItem("USERS_USERNAME"), 
        namecontainer: localStorage.getItem("USERS_USERNAME")+this.props.namecontainer
      },

    };
    let url = 'http://192.168.56.103:3000/namespark/getportcontainer';
    fetch(url, {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
    .then(responseJson => {
      this.setState({
        Port:responseJson.data
      })
      console.log("log port: "+responseJson.data)
    })
  
}, 2500)
  }
render(){
    //let link = "http://"+this.state.Port
    
    if(this.state.Port === undefined || this.state.Port === "Device not run"){
       this.item = <button disabled="true" class="btn btn-primary btn-block disabled">Unknow Port</button>;
    }else {
          this.item = <a href={"http://"+this.state.Port}><button aria-pressed="true" class="btn btn-primary btn-block active">{this.state.Port}</button></a>;
      }
  return(
      <div>
      {this.item}
      </div>
  );

}
}



class Listname extends Component{
  constructor() {
    super();
   // this.toggle = this.toggle.bind(this);
    this.togglepopup = this.togglepopup.bind(this);
    this.togglerun = this.togglerun.bind(this);
    this.toggledelete = this.toggledelete.bind(this);
    this.togglestop = this.togglestop.bind(this);
   // this.togglewarning = this.togglewarning.bind(this);
    this.runcontainer = this.runcontainer.bind(this);
    
    this.deletecontainner = this.deletecontainner.bind(this);
    this.stopcontainner = this.stopcontainner.bind(this);

  this.toggle = this.toggle.bind(this);
    this.state={
      modal:false,
      modalpopup:false,
      modalpoprun:false,
      modalpopdelete:false,
      modalpopstop:false,
      
    }
  }

  toggle(){
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
     }
   
     togglerun(){
      this.setState({modalpoprun: !this.state.modalpoprun})
    }

  runcontainer() {
    let dataToSend = {
      userData: {
        username: localStorage.getItem("USERS_USERNAME"), 
        namespark: this.props.name.namespark,
        packages:this.props.name.packages,
        filename:this.props.name.filename
      },

    };
    //console.log("dddd",dataToSend)
    let url = 'http://192.168.56.103:3000/namespark/runcontainer';
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
         this.setState({modalpoprun: !this.state.modalpoprun})
         this.test();
    }

          
  }).catch(err => this.setState({ error: err }));
}



  togglepopup(){
    this.setState({modalpopup: !this.state.modalpopup})
  }

  toggledelete(){
    this.setState({modalpopdelete: !this.state.modalpopdelete})
  }

  togglestop(){
    this.setState({modalpopstop: !this.state.modalpopstop})
  }

test(){
  setTimeout(() => {
    window.location.reload();
  }, 1000)
    
  }
 
  
  deletecontainner() {
    //e.preventDefault();  
    let dataToSend = {
      userData: {
        username: localStorage.getItem("USERS_USERNAME"), 
        namespark: this.props.name.namespark
      }
    };
    let url = 'http://192.168.56.103:3000/namespark/deletecontainner';
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
           this.test()
           this.setState({modalpopdelete: !this.state.modalpopdelete})
           
         }   
    
    }).catch(err => this.setState({ error: err }));
  }
  
  stopcontainner() {
    //e.preventDefault(); 
    //console.log("444444") 
    let dataToSend = {
      userData: {
        username: localStorage.getItem("USERS_USERNAME"), 
        namespark: this.props.name.namespark
      }
    };
    let url = 'http://192.168.56.103:3000/namespark/stopcontainner';
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
           this.setState({modalpopstop: !this.state.modalpopstop})
           this.test();
           
         }   
    
    }).catch(err => this.setState({ error: err }));
  }

  render(){
    return(
   <div>   
           <div align="center">
           <button  className="btn btn-primary" onClick={this.togglerun}><TiMediaPlayOutline size="20" />Run </button>&nbsp;&nbsp;
           <button className="btn btn-info" onClick={this.togglestop}><i class="icon-ban">  Stop </i></button>&nbsp;&nbsp;
           <button className="btn btn-danger" onClick={this.toggledelete}><i class="fa fa-trash">  Delete </i></button>
           </div>
            <Modal isOpen={this.state.modalpoprun} toggle={this.togglerun} className={this.props.className}>
                  <ModalHeader toggle={this.togglerun}>Run Container</ModalHeader>
                  <ModalBody>
                  <Container>
                      <Row className="justify-content-center">
                          <Col md="12">
                          <Card className="mx-6">
                           <CardBody className="p-6">
                      <form onSubmit={this.runcontainer}>
                          <div className="form-group">
                      <InputGroup className="mb-8">
                       <FormGroup row>
                          <div><Label sm={12}>Run Container Name  {this.props.name.namespark} </Label>{''}</div>
                      </FormGroup>
                      </InputGroup>       
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-danger" >Run Container</button>
                    </div>
                  </form>
                  </CardBody>
                  </Card>
                  </Col>
                  </Row>
                  </Container>
                  </ModalBody>
            </Modal>      
                      {/*Modal STOP */}
            <Modal isOpen={this.state.modalpopstop} toggle={this.togglestop} className={this.props.className}>
                  <ModalHeader toggle={this.togglestop}>Stop Container</ModalHeader>
                  <ModalBody>
                  
                  <Container>
                      <Row className="justify-content-center">
                          <Col md="12">
                          <Card className="mx-6">
                           <CardBody className="p-6">
                      <form onSubmit={this.stopcontainner}>
                          <div className="form-group">
                      <InputGroup className="mb-8">
                       <FormGroup row>
                          <div><Label sm={12}>Stop Container Name  {this.props.name.namespark} </Label>{''}</div>
                      </FormGroup>
                      </InputGroup>       
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-danger" >Stop Container</button>
                    </div>
                  </form>
                  </CardBody>
                  </Card>
                  </Col>
                  </Row>
                  </Container>
                  </ModalBody>
            </Modal>          
            {/*Modal Delete */}
            <Modal isOpen={this.state.modalpopdelete} toggle={this.toggledelete} className={this.props.className}>
                  <ModalHeader toggle={this.toggledelete}>Delete Container</ModalHeader>
                  <ModalBody>
                  <Container>
                      <Row className="justify-content-center">
                          <Col md="12">
                          <Card className="mx-6">
                           <CardBody className="p-6">
                      <form onSubmit={this.deletecontainner}>
                          <div className="form-group">
                      <InputGroup className="mb-8">
                       <FormGroup row>
                          <div><Label sm={12}>Delete Container Name  {this.props.name.namespark} </Label>{''}</div>
                      </FormGroup>
                      </InputGroup>       
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-danger" >Delete Container</button>
                    </div>
                  </form>
                  </CardBody>
                  </Card>
                  </Col>
                  </Row>
                  </Container>
                  </ModalBody>
            </Modal>

</div>
  
    );
  }
    
}

export default List;