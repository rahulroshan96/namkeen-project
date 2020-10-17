import React, { Component } from 'react';
import {Button, Container} from 'reactstrap'
import { Table } from 'reactstrap';
import {Link} from "react-router-dom";
import {BASEURL} from './Constants'
import {updateCartFromLocalStorageAPI} from "./components/api/authenticationApi"
var axios = require('axios');


class Checkout extends Component {
    constructor(props){
        super(props)
        this.state = {
            "cartProducts":[],
            "allProducts":[],
            "token":"",
            "totalPrice":0,
            "totalQuantity":0
        }
    this.getCartProducts = this.getCartProducts.bind(this)
    this.getTableItems = this.getTableItems.bind(this)
    this.getProductName = this.getProductName.bind(this)
    this.updateCartFromLocalStorage = this.updateCartFromLocalStorage.bind(this)
    this.updateState = this.updateState.bind(this)
    }
    async updateState(totalPrice, totalQuantity){
        await this.setState({
            totalPrice:totalPrice,
            totalQuantity:totalQuantity
        })
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
        var totalQuantity=0
        var totalPrice=0
        if (this.state.cartProducts && this.state.cartProducts.cart_items){

            let x =  this.state.cartProducts.cart_items.map((value,index)=>{
                const p = this.getProductName(value.product)
                if(p){
                    totalPrice=totalPrice+(p.product_price*value.quantity)
                    totalQuantity=totalQuantity+value.quantity
                    return <>   
                    <tr>
                    <th scope="row">{index+1}</th>
                            <td><img src={`${BASEURL}`+p.image} style={{"width":"120px"}} />{ p.product_name}</td>
                            <td>{value.quantity}</td>
                            <td>{p.product_price}</td>
                        </tr>
                    </>
                }
            })
        console.log("this is x")
        console.log(totalPrice, totalQuantity)
        if(this.state.totalPrice!==totalPrice && this.state.totalQuantity!==totalQuantity){
            this.updateState(totalPrice,totalQuantity)
        }
        return x
        }
        
    }
    async updateCartFromLocalStorage(){
        let items_from_localstorage = []
        let all_cart_items = {}
        if(localStorage.checkout_items){
            all_cart_items = JSON.parse(localStorage.getItem("checkout_items"))
            for(var key in all_cart_items){
                let temp = {}
                temp["product"] = key
                temp["quantity"] = all_cart_items[key]
                items_from_localstorage.push(temp)
            }
        }
        if(items_from_localstorage.length===0){
            return
        }
        const token = this.state.token
        await axios.post(`${BASEURL}/api/cart-create/`,
            {    
                "cart_items":items_from_localstorage
            },
            {
                Authorization: `Bearer ${token}`
            },  
        )
        .then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    async componentWillMount(){
        const token = localStorage.getItem("token")
        await this.setState({"token":token})
        // const allProducts = localStorage.getItem("products")
        // await this.setState({"allProducts":allProducts})
        await this.getProducts()
        await this.updateCartFromLocalStorage()
        await this.getCartProducts()

    }
    // getTotalPriceAndQuantity(){
    //     let totalPrice=0
    //     let totalQuantity=0
    //     if (this.state.cartProducts && this.state.cartProducts.cart_items){
    //         for(var i=0;i<this.state.cartProducts.cart_items.length;i++){

    //         }
    //     }
    // }
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
    getProducts(){
        axios.get(`${BASEURL}/api/products-list/`)
        .then((res)=>{
            this.setState({"allProducts":res.data})
        }).catch((err)=>{
            console.log(err.response)
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
          <tr>
              <td></td>
              <td></td>
              <td>{this.state.totalQuantity}</td>
                <td>{this.state.totalPrice}</td>
          </tr>
      </tbody>
    </Table>
    <Button tag={Link} to="/address" className="float-right" color="success">Checkout</Button>
    <Button tag={Link} to="/" className="float-right" color="danger">Back</Button>
                </div>
            </Container>
        );
    }
}

export default Checkout;