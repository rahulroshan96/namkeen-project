import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { loginUser} from "../../redux/actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {passwordReset} from "../api/authenticationApi"

class ForgetPassword extends Component {
    handleChange = (event) => {
        const { name, value} = event.target;
        this.setState({ ...this.state, [name]: value });
      };
      pReset =  async (event) => {
          console.log("executeddddddddddddd")
        event.preventDefault();
        const {email} = this.state;
        await passwordReset(email);
        // history.push("/");
      };
    render() {
        return (
            <Container>
                {JSON.stringify(this.state)}
           <Form onSubmit={this.pReset}>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="email" onChange={this.handleChange}/>
            </FormGroup>
            <Button type="submit">Send Reset Email</Button>
    </Form>     
    </Container>
        );
    }
}

export default ForgetPassword;