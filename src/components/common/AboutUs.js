import React, { Component } from 'react';
import {Formik,Form,Field,ErrorMessage} from 'formik';
 import * as Yup from 'yup';
 import { Button, FormGroup, Label, Input} from 'reactstrap';
 import {Form as FBootstrap, Container} from 'reactstrap'
import '../../assets/css/style.css'
 
 
 class AboutUs extends Component {

    constructor(props) {
        super(props)
        this.state = { initialValues : {
            firstName: '',
            lastName: '',
            email: '',
            password:'',
            confirmPassword:''
          }};
        this.onSubmit = this.onSubmit.bind(this);
      }
    
    onSubmit= values => {
        alert(JSON.stringify(values, null, 2));
      }
    render() {
        return (
            <Container>
                <Formik
      initialValues={this.state.initialValues}
        validationSchema={Yup.object().shape({
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
        onSubmit={this.onSubmit}
      >
          
    <Form>
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
      <Button type="submit" color="success">Submit</Button>
    </Form>
    </Formik>
            </Container>
        );
    }
}

export default AboutUs;