import React, { Component } from 'react';
import {  FormGroup,Button, Card, ModalHeader, InputGroup,InputGroupAddon,InputGroupText,ModalBody, ModalFooter, Modal,CardBody, Col, Container, Form, Row ,Input,Label,Table} from 'reactstrap';
import DefaultHeader from '../../../containers/DefaultLayout/DefaultHeader'
import { Link } from 'react-router-dom';
class List extends Component{

  constructor() {
    super();
    //this.togglepopup = this.togglepopup.bind(this);
    //this.namedetail = this.namedetail.bind(this);
    this.state = {
     
     selectdb: undefined,
     dbname: undefined,
     name: undefined,
    }
  }
    render() {
      //let link = "https://timeseriesadmin.github.io/"
      /*
      <th>Action</th>
      <td><Listname type={item.selectdb} dataname={item.dbname} username={item.name}/></td>
      */
        //console.log(this.props.details.dbname)
        if(this.props.details.dbname === undefined) this.item = "";
      else {
          this.item = this.props.details.dbname.map((item, key) =>
          
          <tr>
           <td><button disabled="true" aria-pressed="true" class="btn btn-dark btn-block active">{item.selectdb}</button></td>
           <td><button disabled="true" aria-pressed="true" class="btn btn-dark btn-block active">{item.dbname}</button></td>
           <td><button disabled="true" aria-pressed="true" class="btn btn-dark btn-block active">{item.name}</button></td>
           <td><button disabled="true" aria-pressed="true" class="btn btn-dark btn-block active">{item.host}</button></td>
           
           <td><a href={item.link}><button aria-pressed="true" class="btn btn-primary btn-block active">{item.link}</button></a></td>
           <td><Listname name={item.dbname} /></td>
           
           </tr>
           
        );
      }

        return (
          <div>
        <Table striped bordered>
        <thead>
          <tr align="center">
            
            <th>Database</th>
            <th>DatabaseName</th>
            <th>Username</th>
            <th>HOST</th>
            <th>GUI Link</th>
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

class Listname extends Component{
  constructor() {
    super();
    this.togglepopup = this.togglepopup.bind(this);
    this.toggledelete = this.toggledelete.bind(this);
    this.deletecontainner = this.deletecontainner.bind(this);

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



  togglepopup(){
    this.setState({modalpopup: !this.state.modalpopup})
  }
  
  toggledelete(){
    this.setState({modalpopdelete: !this.state.modalpopdelete})
  }

  test(){
    window.location.reload();
  }

  deletecontainner() {
    //e.preventDefault();  
    let dataToSend = {
      userData: {
        
        dbname: this.props.name
      }
    };
    let url = 'http://192.168.56.103:3000/createdb/deletecontainner';
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
           this.setState({modalpopdelete: !this.state.modalpopdelete})
           window.location.reload();
         }   
    
    }).catch(err => this.setState({ error: err }));
  }

  render(){
    return(
   <div><button className="btn btn-danger" onClick={this.toggledelete}><i class="fa fa-trash"> Delete</i></button>

            
                   {/*Modal Delete */}
            <Modal isOpen={this.state.modalpopdelete} toggle={this.toggledelete} className={this.props.className}>
                  <ModalHeader toggle={this.toggledelete}>Delete Database</ModalHeader>
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
                          <div><Label sm={12}>Delete Database Name  {this.props.name} </Label>{''}</div>
                      </FormGroup>
                      </InputGroup>       
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-danger" >Delete Database</button>
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