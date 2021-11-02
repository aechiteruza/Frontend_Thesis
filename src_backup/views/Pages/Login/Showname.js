import React, { Component } from 'react';
class Showname extends Component{
    render() {
        return (
            <div>
                            <p className="text-muted"> Name : {this.props.details.firstname}  {this.props.details.lastname}</p>
                            <p className="text-muted"> Username :  {this.props.details.username} </p>
                            <p className="text-muted"> Email :  {this.props.details.email} </p>
            </div>
            
        )
    }
}

export default Showname;