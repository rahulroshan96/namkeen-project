import React from 'react';
import { useFormik } from 'formik';
import { Button, Form, FormGroup, Label, Input, Container} from 'reactstrap';
import {Link} from "react-router-dom";
import {BASEURL} from './Constants'
import { ToastContainer,toast} from 'react-toastify';
var axios = require('axios');

function isNumeric(myString) {
  return /\d/.test(myString);
}

const validate = values => {
  const errors = {};
  if (!values.Name) {
    errors.Name = 'Required';
  } 
  else if (values.Name.length > 50) {
    errors.Name = 'Must be 50 characters or less';
  }

  if (!values.Mobile) {
    errors.Mobile = 'Required';
  } else if (isNaN(values.Mobile)) {
    errors.Mobile = 'Enter correct phone number';
  } 
  else if (values.Mobile.length <=12) {
    errors.Mobile = 'Enter correct phone number';
  }

//   if (!values.AlternatePhone) {
//     errors.AlternatePhone = 'Required';
//   } else if (isNaN(values.Mobile)) {
//     errors.AlternatePhone = 'Enter correct phone number';
//   } 
//   else if (values.AlternatePhone.length !== 10) {
//     errors.AlternatePhone = 'Enter correct phone number';
//   }

  if (!values.Pincode) {
    errors.Pincode = 'Required';
  } else if (values.Pincode.length !== 6) {
    errors.Pincode = 'Invalid Pincode';
  }

  if (!values.City) {
    errors.City = 'Required';
  } 
  if (!values.Address) {
    errors.Address = 'Required';
  } 
  if (!values.State) {
    errors.State = 'Required';
  } 

//   if (!values.Locality) {
//     errors.Locality = 'Required';
//   } 


  return errors;
};

const Address = () => {
  const formik = useFormik({
    initialValues: {
      Name: '',
      Mobile: '',
      Pincode: '',
      Locality:'',
      Address:'',
      State:'',
      City:'',
      AlternatePhone:''

    },
    validate,
    onSubmit: values => {
    //   alert(JSON.stringify(values, null, 2));
    //   console.log(values)
      const token = localStorage.getItem("token")
        axios.post(`${BASEURL}/api/shipping-address-create/`,
            {    
                "address":values.Address,
                "city":values.City,
                "pincode":values.Pincode,
                "mobile_no":values.Mobile,
                "state":values.State
            },
            {
                Authorization: `Bearer ${token}`
            },  
        )
        .then((res)=>{
            console.log(res.data)
            toast("Shipping Address Updated")
        }).catch((err)=>{
            console.log(err)
        })
    },
  });
  return (
      <Container style={{"width":"50%"}}>
          <ToastContainer/>
    <form onSubmit={formik.handleSubmit}>
      <Label style={{"font-weight":"bold"}} htmlFor="Name">Full Name:</Label>
      <Input
        id="Name"
        name="Name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.Name}
      />  
    {formik.touched.Name && formik.errors.Name ? <><div style={{"color":"red"}}>{formik.errors.Name}<br/></div></> : <>{""}</>}

    <Label style={{"font-weight":"bold"}} htmlFor="Mobile">PhoneNumber:</Label>
      <Input
        id="Mobile"
        name="Mobile"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.Mobile}
      />
      
      {formik.touched.Mobile && formik.errors.Mobile ? <div style={{"color":"red"}}>{formik.errors.Mobile}<br/></div> : <>{""}</>}
      <Label style={{"font-weight":"bold"}} htmlFor="Pincode">Pincode:</Label>
      <Input
        id="Pincode"
        name="Pincode"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.Pincode}
      />
{formik.touched.Pincode && formik.errors.Pincode ? <><div style={{"color":"red"}}>{formik.errors.Pincode}<br/></div></> : <>{""}</>}
<Label style={{"font-weight":"bold"}} htmlFor="Locality">Locality:</Label>
      <Input
        id="Locality"
        name="Locality"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.Locality}
      />
    
      {formik.touched.Locality && formik.errors.Locality ? <><div style={{"color":"red"}}>{formik.errors.Locality}<br/></div></> : <>{""}</>}
      <Label style={{"font-weight":"bold"}} htmlFor="Address">Address:</Label>
      <Input
        id="Address"
        name="Address"
        type="textarea"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.Address}
      />
      {formik.touched.Address && formik.errors.Address ? <><div style={{"color":"red"}}>{formik.errors.Address}<br/></div></> : <>{""}</>}
      <Label style={{"font-weight":"bold"}} htmlFor="City">City:</Label>
      <Input
        id="City"
        name="City"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.City}
      />
    {formik.touched.City && formik.errors.City ? <><div style={{"color":"red"}}>{formik.errors.City}<br/></div></> : <>{""}</>}
<Label style={{"font-weight":"bold"}} htmlFor="State">State:</Label>
      <Input
        id="State"
        name="State"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.State}
      />
    
      {formik.touched.State && formik.errors.State ? <><div style={{"color":"red"}}>{formik.errors.State}<br/></div></> : <>{""}</>}
      <Label style={{"font-weight":"bold"}} htmlFor="AlternatePhone"> AlternatePhone:</Label>
      <Input
        id="AlternatePhone"
        name="AlternatePhone"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        // onChange={false}
        // onBlur={false}
        value={formik.values.AlternatePhone}
      />
      {formik.touched.AlternatePhone && formik.errors.AlternatePhone ? <><div style={{"color":"red"}}>{formik.errors.AlternatePhone}<br/></div></> : <>{""}</>}
      <br/>
      <Button tag={Link} to="/payment" className="float-right" color="warning">Payment</Button>
      <Button type="submit" className="float-right" color="success">Update Address</Button>
      <Button tag={Link} to="/checkout" className="float-right" color="danger">Back</Button>
      
    </form>
    </Container>
  );
};

 export default Address;