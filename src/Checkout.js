import React, { Component } from 'react';
import {Button, Container} from 'reactstrap'
import { Table } from 'reactstrap';
import {Link} from "react-router-dom";
import {BASEURL} from './Constants'
import { Redirect} from "react-router-dom";
import { toast, ToastContainer} from 'react-toastify';
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
    this.emptyCart = this.emptyCart.bind(this)
    this.checkForEvenItemsCount = this.checkForEvenItemsCount.bind(this)
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
                            <td>Rs. {p.product_price}/-</td>
                        </tr>
                    </>
                }
            })
        if(this.state.totalPrice!==totalPrice && this.state.totalQuantity!==totalQuantity){
            this.updateState(totalPrice,totalQuantity)
        }
        return x
        }
        
    }
    async emptyCart(){
        const token = this.state.token
        await axios.post(`${BASEURL}/api/cart-create/`,
        {    
            "cart_items":[]
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            
        })
        .then((res)=>{
            console.log(res.data)
            localStorage.removeItem("checkout_items")
            this.getCartProducts()
        }).catch((err)=>{
            console.log(err.response)
            this.getCartProducts()
        })
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
        const token = this.state.token
        console.log(items_from_localstorage)
        await axios.post(`${BASEURL}/api/cart-create/`,
        {    
            "cart_items":items_from_localstorage
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            
        })
        .then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err.response)
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
    async getCartProducts(){
        const token = this.state.token
        await axios.get(`${BASEURL}/api/cart-get/`,{
        headers: {
            Authorization: `Bearer ${token}`
          }
    })
        .then((res)=>{
            console.log("This is get cart products")
            console.log(res.data)
            this.setState({"cartProducts":res.data})
        }).catch((err)=>{
            console.log(err.response.data)
            this.setState({"errors":err.response.data})
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
    checkForEvenItemsCount(){
        toast("Total number of items should be even",{
            autoClose: 3000,
        });
    }
    render() {
        const cartP = this.state.cartProducts
        if(!cartP){
            cartP = []
        }
        return (
            <Container>
                <ToastContainer/>
                <div>
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
              <td><b>Total</b></td>
              <td><b>{this.state.totalQuantity}</b></td>
                <td><b>Rs. {this.state.totalPrice}/-</b></td>
          </tr>
      </tbody>
    </Table>
    {
        (this.state.totalQuantity%2===1)?
        <Button className="float-right" color="success" onClick={this.checkForEvenItemsCount}>Checkout</Button>:
        <Button tag={Link} to="/address" className="float-right" color="success">Checkout</Button>
    }
    <Button tag={Link} to="/" className="float-right" color="danger">Back</Button>
    <Button className="float-right" color="warning" onClick={this.emptyCart}>Empty Cart</Button>
                </div>
            </Container>
        );
    }
}

export default Checkout;