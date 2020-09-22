import React, { Component } from 'react';
import {Container} from 'reactstrap'
import { Table } from 'reactstrap';
var axios = require('axios');

class Checkout extends Component {
    constructor(props){
        super(props)
        this.state = {
            "cartProducts":[],
            "allProducts":[],
            "token":""
        }
    this.getCartProducts = this.getCartProducts.bind(this)
    this.getTableItems = this.getTableItems.bind(this)
    this.getProductName = this.getProductName.bind(this)
    }

    getProductName(productID){
     if(this.state.allProducts){
         const allP = this.state.allProducts
         for(var i=0;i<allP.length;i++){
             if(allP[i].id===productID){
                 return allP[i]
             }
         }
     }      
    }
    getTableItems(){
        if (this.state.cartProducts && this.state.cartProducts.cart_items){
            return this.state.cartProducts.cart_items.map((value,index)=>{
                const p = this.getProductName(value.product)
                if(p){
                    return <>   
                    <tr>
                    <th scope="row">{index+1}</th>
                            <td><img src={p.image} style={{"width":"120px"}} />{ p.product_name}</td>
                            <td>{value.quantity}</td>
                            <td>{p.product_price}</td>
                        </tr>
                    </>
                }
            })
        }
    }
    async componentDidMount(){
        const token = localStorage.getItem("token")
        await this.setState({"token":token})
        // const allProducts = localStorage.getItem("products")
        // await this.setState({"allProducts":allProducts})
        this.getProducts()
        this.getCartProducts()
    }
    getCartProducts(){
        const token = this.state.token
        axios.get("http://localhost:8000/api/cart-get/",{
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
    getProducts(){
        axios.get("http://localhost:8000/api/products-list/")
        .then((res)=>{
            this.setState({"allProducts":res.data})
        }).catch((err)=>{
            this.setState({"errors":err.response})
        })
    }
    render() {
        const cartP = this.state.cartProducts
        if(!cartP){
            cartP = []
        }
        return (
            <Container>
                <div>
                    {JSON.stringify(this.state)}
                    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>Product Quantity</th>
          <th>Product Price</th>
        </tr>
      </thead>
      <tbody>
          {this.state.cartProducts?this.getTableItems():""}
      </tbody>
    </Table>
                </div>
            </Container>
        );
    }
}

export default Checkout;