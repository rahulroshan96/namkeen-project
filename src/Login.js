import React, { Component } from 'react';
import {Container} from 'reactstrap'
import * as actions from './actions/auth'
import { Redirect, Route, Link } from "react-router-dom";
import {connect} from 'react-redux'
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {withRouter} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const cart_items = [{"quantity":1,"product_id":1},{"quantity":1,"product_id":2}]
class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            username:"",
            password:""
        }
        this.onLogin = this.onLogin.bind(this)
    }
    onLogin(e){
        e.preventDefault()
        this.props.oAuth(this.state.username, this.state.password)
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
                <ToastContainer />
                <div>
                <h2 align="center">Login</h2>
        <Form onSubmit={this.onLogin}>
            <FormGroup>
                <Label for="exampleEmail"><b>Username</b></Label>
                <Input type="text" onChange={e=>this.setState({...this.state,[e.target.name]:e.target.value})} name="username" id="exampleEmail" placeholder="Username" />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword"><b>Password</b></Label>
                <Input type="password" onChange={e=>this.setState({...this.state,[e.target.name]:e.target.value})} name="password" id="examplePassword" placeholder="Password" />
            </FormGroup>
            {
                this.props.loading?<Button>Loading....</Button>:<><Button>Login</Button><Link to="/signup"><Button>Signup</Button></Link><Link to="/reset_password"><Button>Forget Password</Button></Link></>
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
        oAuth:(username,password)=>dispatch(actions.authLogin(username,password)),
        checkExistingSession:()=>dispatch(actions.checkExistingSession())
    }
}
// const withRouterApp3 = withRouter(App3)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));