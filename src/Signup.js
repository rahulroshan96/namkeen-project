import React, { Component } from 'react';
import {Container} from 'reactstrap'
import * as actions from './actions/auth'
import { Redirect, Route,Link } from "react-router-dom";
import {connect} from 'react-redux'
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {withRouter} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

class Signup extends Component {
    constructor(props){
        super(props)
        this.state={
            username:"",
            password:"",
            email:""
        }
        this.onSignup = this.onSignup.bind(this)
    }
    async onSignup(e){
        e.preventDefault()
        let x = await this.props.oAuth(this.state.username, this.state.email, this.state.password)
    }
    componentDidMount(){
        this.props.checkExistingSession()
    }
    componentWillUnmount(){
        if (this.props.token) {
            return <Redirect to="/" />;
          }
    }
    render() {
        const { error, loading, token } = this.props;
        if (token) {
            return <Redirect to="/" />;
          }
        return (
            <Container>
                <ToastContainer/>
                <div>
                <h2 align="center">Signup</h2>
                {/* {JSON.stringify(this.props)} */}
        <Form onSubmit={this.onSignup}>
            <FormGroup>
                <Label for="exampleUsername"><b>Username</b></Label>
                <Input type="text" onChange={e=>this.setState({...this.state,[e.target.name]:e.target.value})} name="username" id="exampleUsername" placeholder="Username" />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail"><b>Email</b></Label>
                <Input type="email" onChange={e=>this.setState({...this.state,[e.target.name]:e.target.value})} name="email" id="exampleEmail" placeholder="Email" />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword"><b>Password</b></Label>
                <Input type="password" onChange={e=>this.setState({...this.state,[e.target.name]:e.target.value})} name="password" id="examplePassword" placeholder="Password" />
            </FormGroup>
            {
                this.props.loading?<Button>Loading....</Button>:<><Button>Signup</Button><Link to="/login"><Button>Login</Button></Link></>
            }
        </Form>
            </div>
            </Container>
        );
    }
}

const mapStateToProps= (state)=>{
    return {
        loading:state.loading,
        error:state.error,
        token:state.token
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        oAuth:(username,email,password)=>dispatch(actions.authSignup(username,email,password)),
        checkExistingSession:()=>dispatch(actions.checkExistingSession())
    }
}
// const withRouterApp3 = withRouter(App3)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));