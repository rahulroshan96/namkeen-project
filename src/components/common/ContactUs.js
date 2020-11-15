import React, { Component } from 'react';
import {Container} from 'reactstrap'
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer} from 'react-toastify';
import {BASEURL} from '../../Constants'
var axios = require('axios');

class ContactUs extends Component {
    constructor(props){
        super(props)
        this.state={
            username:"",
            email:"",
            message:""
        }
    this.onEmail = this.onEmail.bind(this)
    }
    onEmail(e){
        e.preventDefault()
        console.log(this.state)
        axios.post(`${BASEURL}/api/email/`,
            {    
                "username":this.state.username,
                "email":this.state.email,
                "message":this.state.message
            }
        )
        .then((res)=>{
            console.log(res.data)
            this.setState({
                username:"",
                email:"",
                message:""
            })
            toast("Email Sent Successfully")
        }).catch((err)=>{
            console.log(err)
            toast("Something Went Wrong.")
        })
    }
    render() {
        return (
            <Container> 
                <ToastContainer/>
                <div>
                <h2 align="center">ContactUs</h2>
        <Form onSubmit={this.onEmail}>
            <FormGroup>
                <Label for="username"><b>Name</b></Label>
                <Input type="text" onChange={e=>this.setState({...this.state,[e.target.name]:e.target.value})} name="username" id="exampleUsername" placeholder="Full Name" />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail"><b>Email</b></Label>
                <Input type="email" onChange={e=>this.setState({...this.state,[e.target.name]:e.target.value})} name="email" id="exampleEmail" placeholder="Email" />
            </FormGroup>
            <FormGroup>
                <Label for="message"><b>Message</b></Label>
                <Input type="textarea" onChange={e=>this.setState({...this.state,[e.target.name]:e.target.value})} name="message" id="message" placeholder="Message" />
            </FormGroup>
            <Button color="success">Submit</Button>
        </Form>
            </div>
            </Container>
        );
    }
}

export default ContactUs;