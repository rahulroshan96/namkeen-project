import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { loginUser } from "../../redux/actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";


class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            "username":"",
            "password":""
        }
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
      };
      login =  async (event) => {
          console.log("executeddddddddddddd")
        event.preventDefault();
        const { username, password } = this.state;
        await loginUser(username, password);
        // history.push("/");
      };
    render() {
        return (
            
            <Container>
                {JSON.stringify(this.state)}
           <Form onSubmit={this.login}>
            <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" name="username" id="username" placeholder="username" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="password" onChange={this.handleChange}/>
            </FormGroup>
            <Button type="submit">Login</Button>
    </Form>     
    </Container>
        );
    }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };
const mapDispatchToProps = {
    loginUser,
  };
  
  export default connect(null, mapDispatchToProps)(Login);

// export default Login;