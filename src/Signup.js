import React, { Component } from 'react';
import {Container} from 'reactstrap'
import * as actions from './actions/auth'
import { Redirect, Link } from "react-router-dom";
import {connect} from 'react-redux'
import { Button, FormGroup, Label, Input} from 'reactstrap';
import {withRouter} from 'react-router-dom'
import {Formik,Form,Field,ErrorMessage} from 'formik';
import { ToastContainer} from 'react-toastify';
import './assets/css/style.css'
import * as Yup from 'yup';

class Signup extends Component {
    constructor(props){
        super(props)
        this.state={
            username:"",
            password:"",
            email:"",
            confirmPassword:''
        }
        this.onSignup = this.onSignup.bind(this)
    }
    async onSignup(values){
        await this.props.oAuth(values.username, values.email, values.password)
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
                <Formik
      initialValues={this.state}
        validationSchema={Yup.object().shape({
            username: Yup.string()
                .required(<div className="formikError">Username is required</div>),
            email: Yup.string()
                .email(<div className="formikError">Email is invalid</div>)
                .required(<div className="formikError">Email is required</div>),
            password: Yup.string()
                .min(8, <div className="formikError">Password must be at least 8 characters</div>)
                .required(<div className="formikError">Password is Required</div>)
                .matches(
                    /^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/,
                    'Need one special character',),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], <div className="formikError">Passwords must match</div>)
                .required(<div className="formikError">Confirm Password is required</div>)
        })}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={this.onSignup}
      >
          
    <Form>
    <FormGroup>
      <Label className="font-weight-bold" for="username">Username</Label>
      <Input
        tag={Field}
        id="username"
        name="username"
        type="text"
        placeholder="Username"
      />
      </FormGroup>
      <ErrorMessage name='username'/>

      <FormGroup>
      <Label className="font-weight-bold" for="email">Email Address</Label>
      <Input
        tag={Field}
        id="email"
        name="email"
        type="email"
        placeholder="Email"
      />
      </FormGroup>
      <ErrorMessage name='email'/>

      <FormGroup>
      <Label className="font-weight-bold" for="password">Password</Label>
      <Input
        tag={Field}
        id="password"
        name="password"
        type="password"
        placeholder="Password"
      />
      </FormGroup>
        <ErrorMessage name='password'/>

      <FormGroup>
      <Label className="font-weight-bold" for="confirmPassword">Confirm Password</Label>
      <Input
        tag={Field}
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
      />
      </FormGroup>
      <ErrorMessage name='confirmPassword'/>
      {/* <Button type="submit" color="success">Submit</Button> */}
    {
        this.props.loading?<Button>Loading....</Button>:<><Button color="success">Signup</Button><Link to="/login"><Button color="success">Login</Button></Link></>
    }
    </Form>
    </Formik>
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