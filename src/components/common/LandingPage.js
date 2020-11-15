import React, { Component } from 'react';
import { ToastContainer} from 'react-toastify';
import {Row, Col, Container} from 'reactstrap'
import Flip from 'react-reveal/Flip';
import '../../assets/css/style.css'
import NewCard from '../utils/NewCard.js'
import JumboHeader from '../common/JumboHeader'
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
        var p = []
        console.log(products.length/3)
        for(var i=0;i<products.length/3;i++){
            p.push(i)
        }
        console.log(products)
        console.log(p)
        return (
            <>
            <ToastContainer/>
            <JumboHeader/>
            <Container style={{"width":"80%"}}>
                {
                    p.map((items,count)=>{
                        return <Row style={{"margin-bottom":"20px"}}> 
                        {
                            products.map((value,index)=>{
                                if(index>2){
                                    return<></>
                                }
                                if((count*3)+index>=products.length){
                                    return<></>
                                }
                                return <>
                                <Col sm="4" xs="12" style={{"display":"flex", "justify-content":"flex-start"}}>
                                <Flip left>
                                    <NewCard image={`${BASEURL}`+products[(count*3)+index].image} 
                                    name={products[(count*3)+index].product_name}
                                    price={products[(count*3)+index].product_price}
                                    desc={products[(count*3)+index].product_desc}
                                    weight={products[(count*3)+index].product_weight_gm}
                                    id={products[(count*3)+index].id}
                                    />
                                </Flip>
                                </Col>
                                </>
                            })
                        }
                        </Row>
                    })
                }
               
             </Container> 
             </>
        );
    }
}

export default LandingPage;