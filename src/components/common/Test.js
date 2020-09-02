import React, { Component } from 'react';
import NBCard from '../utils/NBCard'
import {Row, Col, Container} from 'reactstrap'
import Slide from 'react-reveal/Slide';
import Flip from 'react-reveal/Flip';
import '../../assets/css/style.css'
import NewCard from '../utils/NewCard.js'
import JumboHeader from '../common/JumboHeader'
var axios = require('axios');

var config = {
    method: 'get',
    url: 'http://localhost:8000/api/products-list/',
    headers: { 
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',
    }
  };


class Test extends Component {

    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount(){
        this.getClients()
        // every 5 seconds
        // setInterval(this.getClients, 5000);
    }
    getClients = ()=>{
        console.log("marking api call")
        axios(config)
        .then((response)=>{
            console.log(response.data)
            this.setState({"data":response.data})
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    render() {
        return (
            <>
            {JSON.stringify(this.state.data)}
            {/* <JumboHeader/> */}
            <Container style={{"width":"80%"}}>
                <Row style={{"margin-bottom":"20px"}}> 
                <Col sm="4" xs="12" style={{"display":"flex", "justify-content":"flex-start"}}>
                <Flip left>
                    <NewCard/>
                </Flip>
                </Col>
                <Col sm="4" xs="12" style={{"display":"flex", "justify-content":"flex-start"}}>
                <Flip left>
                    <NewCard/>
                </Flip>
                </Col>
                <Col sm="4" xs="12" style={{"display":"flex", "justify-content":"flex-start"}}>
                <Flip left>
                    <NewCard/>
                </Flip>
                </Col>
                
                </Row>
                <Row style={{"margin-bottom":"20px"}}> 
                <Col sm="4" xs="12" style={{"display":"flex", "justify-content":"flex-start"}}>
                <Flip left>
                    <NewCard/>
                </Flip>
                </Col>
                <Col sm="4" xs="12" style={{"display":"flex", "justify-content":"flex-start"}}>
                <Flip left>
                    <NewCard/>
                </Flip>
                </Col>
                <Col sm="4" xs="12" style={{"display":"flex", "justify-content":"flex-start"}}>
                <Flip left>
                    <NewCard/>
                </Flip>
                </Col>
                
                </Row>
                <Row style={{"margin-bottom":"20px"}}> 
                <Col sm="4" xs="12" style={{"display":"flex", "justify-content":"flex-start"}}>
                <Flip left>
                    <NewCard/>
                </Flip>
                </Col>
                <Col sm="4" xs="12" style={{"display":"flex", "justify-content":"flex-start"}}>
                <Flip left>
                    <NewCard/>
                </Flip>
                </Col>
                <Col sm="4" xs="12" style={{"display":"flex", "justify-content":"flex-start"}}>
                <Flip left>
                    <NewCard/>
                </Flip>
                </Col>
                
                </Row>
             </Container>
             </>
        );
    }
}

export default Test;