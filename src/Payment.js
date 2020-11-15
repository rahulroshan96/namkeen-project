import React, { Component } from 'react';
import {BASEURL} from './Constants'
import {Button, Container} from 'reactstrap'
// import {Razorpay} from 'razorpay'
var axios = require('axios');


class Payment extends Component {
    constructor(props){
        super(props)
        this.state = {
         "cartProducts":[],
         "g":"xyz",
         "status":"",
         "error":""
        }
        this.getCartProducts = this.getCartProducts.bind(this)
        // this.tryPayment = this.tryPayment.bind(this)
        this.newtry = this.newtry.bind(this)
    }
    async componentWillMount(){
        // await this.getCartProducts()
    }
    getCartProducts(){
        const token = this.state.token
        axios.get(`${BASEURL}/api/cart-get/`,{
            headers: {
                Authorization: `Bearer ${token}`
              }
        })
        .then((res)=>{
            this.setState({"cartProducts":res.data})
        }).catch((err)=>{
            this.setState({"errors":err.response})
            // return err.response
        })
    }

    // "key": "rzp_test_FZr9JAeuMX21N3", // Enter the Key ID generated from the Dashboard
    newtry = async (e)=>{
        e.preventDefault()
        const token = localStorage.getItem("token")
        axios.get(`${BASEURL}/api/order/`,{
            headers: {
                Authorization: `Bearer ${token}`
              }
        })
        .then((res)=>{
            console.log(res.data)
            console.log(this.state.g)
            var options = {
                "key": "rzp_test_FZr9JAeuMX21N3", // Enter the Key ID generated from the Dashboard
                "amount": res.data["amount"], // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "image": "",
                "order_id": res.data["id"], //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": (response)=>{
                    console.log(response)
                    axios.post(`${BASEURL}/api/capture/`,response,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then((res)=>{
                      console.log(res.data)
                      localStorage.removeItem("checkout_items")
                      this.setState({
                          "status":res.data["status"]
                      })
                    })
                    .catch((err)=>{
                        console.log(err.response)
                        this.setState({
                            "error":err.response
                        })
                    })
                },
                "prefill": {
                    "name": "Rahul Roshan",
                    "email": "rahulroshan96@gmail.com",
                    "contact": "9933944916"
                },
                "theme": {
                    "color": "#F37254"
                }
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
        //     rzp1.on('payment.failed', function (response){
        //         console.log("failed")
        //         console.log(response.error)
        //         alert(response.error.code);
        //         alert(response.error.description);
        //         alert(response.error.source);
        //         alert(response.error.step);
        //         alert(response.error.reason);
        //         alert(response.error.metadata);
        // });
        }).catch((err)=>{
            console.log(err.response)
        })

    }

    render() {
        return (
            <Container>
                {/* <Button tag={Link} to="/redirect_payment" color="danger">Back</Button>
                <Button onClick={this.tryPayment}>Redirect</Button>
                <Button onClick={this.rPay}>RPay</Button> */}
                <Button onClick={this.newtry}>New Pay</Button>
                {
                    this.state.status!==""?<h1>Payment Status is {this.state.status}</h1>:""
                }
            </Container>
        );
    }
}

export default Payment;

// https://securegw-stage.paytm.in/order/process/?MID=waTIVo48852935121697&ORDER_ID=1602966450.779927&CUST_ID=kshitijgupta1993@gmail.com&TXN_AMOUNT=1000&CHANNEL_ID=WEB&WEBSITE=WEBSTAGING&INDUSTRY_TYPE_ID=Retail&CALLBACK_URL=http://localhost:8000/api/callback/&CHECKSUMHASH=WCvr9YEtL2GQAT5NzDzvr9zAfhb19f6Rc8/1NWF4iMcmXgKoE/ePm2YI7H0jnxOev43YvGSGSZ2YDSnLY9NhmnuaaXG7lUWKZ9vdUC+s+EY=
// https://securegw-stage.paytm.in/order/process/?MID=waTIVo48852935121697&ORDER_ID=1602966441.979885&CUST_ID=kshitijgupta1993@gmail.com&TXN_AMOUNT=1000&CHANNEL_ID=WEB&WEBSITE=WEBSTAGING&INDUSTRY_TYPE_ID=Retail&CALLBACK_URL=http://localhost:8000/api/callback/&CHECKSUMHASH=wruyQsVlyPg5DaAVbjTc3MJBnZZKVIJt3tdhPNjSbI3slmiTNRF9OxQRy40s3SFxo0IcxK04wr9e7x5sB3gXb1/RWwr//oA6qg94AuktAnM=


// https://securegw-stage.paytm.in/order/process/?MID=waTIVo48852935121697&ORDER_ID=1603111056.709972&CUST_ID=kshitijgupta1993@gmail.com&TXN_AMOUNT=1000.00&CHANNEL_ID=WEB&WEBSITE=WEBSTAGING&INDUSTRY_TYPE_ID=Retail&CALLBACK_URL=http://localhost:8001/api/callback/&CHECKSUMHASH=3+w7ok1hR5/z0J2iVFSmau2BYhRzKExDWdnNKDQMZEmfvv8j5fy5dycz95ig8QhiVxjtOl3eAq1pOPovR2TpG8vFDhg5k59oxVN692xCxqU=
// https://securegw-stage.paytm.in/order/process/?MID=waTIVo48852935121697&ORDER_ID=1603111061.7298229&CUST_ID=kshitijgupta1993@gmail.com&TXN_AMOUNT=1000.00&CHANNEL_ID=WEB&WEBSITE=WEBSTAGING&INDUSTRY_TYPE_ID=Retail&CALLBACK_URL=http://localhost:8001/api/callback/&CHECKSUMHASH=VR0XNyqzz4I0O8qqARhHF4Xi7kPYyDISz2MzUSiRQbhP2xZnNqjoezSBdv8W0NvZn1ce10jjgpLtDFRGqfipqNmyZwLDS471j4DQRfKdq5U=


// working
//https://securegw-stage.paytm.in/order/process/?MID=waTIVo48852935121697&ORDER_ID=1603111061&CUST_ID=kshitijgupta1993@gmail.com&TXN_AMOUNT=1000.00&CHANNEL_ID=WEB&WEBSITE=WEBSTAGING&INDUSTRY_TYPE_ID=Retail&CALLBACK_URL=http://localhost:8001/api/callback/&CHECKSUMHASH=9pcxJJf8iqkQCPCwrL1rTWaiG6wvNpcyYtSX63DlGX0PQQGXZ5IhqdqGPMFwemq/MILus8yyADsqx/YQ2X5jWTvVBfY6gbLEYQNCyNylRe8=