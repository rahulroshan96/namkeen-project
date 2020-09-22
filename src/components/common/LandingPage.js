import React, { Component } from 'react';
import NBCard from '../utils/NBCard'
import {Row, Col, Container} from 'reactstrap'
import Slide from 'react-reveal/Slide';
import Flip from 'react-reveal/Flip';
import '../../assets/css/style.css'
import NewCard from '../utils/NewCard.js'
import JumboHeader from '../common/JumboHeader'
import {get_products} from '../../api/api'
import reducer from '../../reducer/auth';

var axios = require('axios');

var config = {
    method: 'get',
    url: 'http://localhost:8000/api/products-list/',
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
        axios.get("http://localhost:8000/api/products-list/")
        .then((res)=>{
            console.log(res.data)
            this.setState({"products":res.data})
            localStorage.setItem("products",res.data)
        }).catch((err)=>{
            this.setState({"errors":err.response})
            // return err.response
        })
    }
    render() {
        const products = this.state.products
        return (
            <>
            <JumboHeader/>
            <Container style={{"width":"80%"}}>
                <Row style={{"margin-bottom":"20px"}}> 
                {
                    products.map((value,index)=>{
                        return <>
                        <Col sm="4" xs="12" style={{"display":"flex", "justify-content":"flex-start"}}>
                        <Flip left>
                            <NewCard image={"http://localhost:8000"+value.image} 
                            name={value.product_name}
                            price={value.product_price}
                            desc={value.product_desc}
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
                            <NewCard image={"http://localhost:8000"+value.image} 
                            name={value.product_name}
                            price={value.product_price}
                            desc={value.product_desc}
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
                            <NewCard image={"http://localhost:8000"+value.image} 
                            name={value.product_name}
                            price={value.product_price}
                            desc={value.product_desc}
                            />
                        </Flip>
                        </Col>
                        </>
                    })
                }
                </Row>
             </Container> 
             </>
        );
    }
}

export default LandingPage;