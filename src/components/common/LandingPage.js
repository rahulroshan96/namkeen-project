import React, { Component } from 'react';
import { ToastContainer} from 'react-toastify';
import NBCard from '../utils/NBCard'
import {Row, Col, Container} from 'reactstrap'
import Slide from 'react-reveal/Slide';
import Flip from 'react-reveal/Flip';
import '../../assets/css/style.css'
import NewCard from '../utils/NewCard.js'
import JumboHeader from '../common/JumboHeader'
import {get_products} from '../../api/api'
import reducer from '../../reducer/auth';
import {BASEURL} from '../../Constants'
var axios = require('axios');



var config = {
    method: 'get',
    url: `${BASEURL}/api/products-list/`,
    headers: { 
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',
    }
  };


class LandingPage extends Component {

    constructor(props){
        super(props)
        this.state = {
            "products":[]
        }
    }

    componentDidMount(){
        // this.getClients()
        this.getProducts()
        // every 5 seconds
        // setInterval(this.getClients, 5000);
    }
    getProducts(){
        axios.get(`${BASEURL}/api/products-list/`)
        .then((res)=>{
            this.setState({"products":res.data})
            localStorage.setItem("products",res.data)
        }).catch((err)=>{
            console.log(err.response)
        })
    }
    render() {
        const products = this.state.products
        return (
            <>
            <ToastContainer/>
            <JumboHeader/>
            
            <Container style={{"width":"80%"}}>
                <Row style={{"margin-bottom":"20px"}}> 
                {
                    products.map((value,index)=>{
                        return <>
                        <Col sm="4" xs="12" style={{"display":"flex", "justify-content":"flex-start"}}>
                        <Flip left>
                            <NewCard image={`${BASEURL}`+value.image} 
                            name={value.product_name}
                            price={value.product_price}
                            desc={value.product_desc}
                            id={value.id}
                            />
                        </Flip>
                        </Col>
                        </>
                    })
                }
                </Row>
                {/* <Row style={{"margin-bottom":"20px"}}> 
                {
                    products.map((value,index)=>{
                        return <>
                        <Col sm="4" xs="12" style={{"display":"flex", "justify-content":"flex-start"}}>
                        <Flip left>
                            <NewCard image={`${BASEURL}`+value.image} 
                            name={value.product_name}
                            price={value.product_price}
                            desc={value.product_desc}
                            id={value.id}
                            />
                        </Flip>
                        </Col>
                        </>
                    })
                }
                </Row>
                <Row style={{"margin-bottom":"20px"}}> 
                {
                    products.map((value,index)=>{
                        return <>
                        <Col sm="4" xs="12" style={{"display":"flex", "justify-content":"flex-start"}}>
                        <Flip left>
                            <NewCard image={`${BASEURL}`+value.image} 
                            name={value.product_name}
                            price={value.product_price}
                            desc={value.product_desc}
                            id={value.id}
                            />
                        </Flip>
                        </Col>
                        </>
                    })
                }
                </Row> */}
             </Container> 
             </>
        );
    }
}

export default LandingPage;