import React, { Component } from 'react';
import '../../assets/css/card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faMinus } from '@fortawesome/free-solid-svg-icons'
import {Input, Button, Badge } from 'reactstrap';
import {toast } from 'react-toastify';


class NewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          count: 0,
          "checkout_items":[]
        };
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.add_to_cart = this.add_to_cart.bind(this)
        this.getAllItemsFromLocal = this.getAllItemsFromLocal.bind(this)
        this.updateCartCount = this.updateCartCount.bind(this)
      }
      componentDidMount(){
        //   this.getAllItemsFromLocal()
          this.updateCartCount()
      }
      updateCartCount(){
          let all_items = JSON.parse(localStorage.getItem("checkout_items"))
          if(all_items!==null && this.props.id in all_items){
              this.setState({
                  count:all_items[this.props.id]
              })
          }
      }

        getAllItemsFromLocal = ()=>{
        if ("checkout_items" in localStorage) {
            this.setState({
                "checkout_items":JSON.parse(localStorage.getItem("checkout_items"))
            })
        }else{
            return []
        }
    }
    add_to_cart = ()=>{
        var before = 0
        var after = 0
        let all_items = {}
        if(localStorage.checkout_items){
            all_items = JSON.parse(localStorage.getItem("checkout_items"))
            if(this.props.id in all_items){
                before = all_items[this.props.id]
                if(this.state.count<1){
                    delete all_items[this.props.id]
                }else{
                    all_items[this.props.id] = parseInt(this.state.count)
                }
            }else{
                if(!this.state.count<1){
                    all_items[this.props.id] = this.state.count
                }
            }
        }else{
            if(!this.state.count<1){
                all_items[this.props.id] = this.state.count
            }
        }
        after = all_items[this.props.id]
        localStorage.removeItem("checkout_items")
        localStorage.setItem("checkout_items", JSON.stringify(all_items))
        if(this.state.count>0){
            toast(this.state.count+" Items updated to Cart",{
                autoClose: 1300,
            });
        }else{
            if(before>0 && after===0){
                toast("Items removed from the to Cart",{
                    autoClose: 1300,
                });
            }
        }
    }
        increment = () =>{
            // this.getAllItemsFromLocal()
            this.setState(
                {
                    count:this.state.count+1
                }
            )
        }   
        decrement = () =>{
            if(this.state.count>0){
                this.setState(
                    {
                        count:this.state.count-1
                    }
                ) 
            }
        }  
    render() {
        return (
            <section>  
                <section class="product">
	<div class="product__photo">
		<div class="photo-container">
			<div class="photo-main">
				{/* <img src={require("../../assets/images/4-2-food-png.png")} alt="green apple slice"/> */}
                <img src={this.props.image} alt="green apple slice"/>
			</div>
		</div>
	</div>
	<div class="product__info">
		<div class="title">
			<h1>{this.props.name}</h1>
        <span>{this.props.desc}</span><br/>
        <h6>{this.props.weight} gm</h6>
		</div>
		<div class="price">
        Rs <span>{this.props.price}/-</span>
            <Badge color="danger">Sale</Badge> Rs <strike>200/-</strike>
		</div>
        {/* <Form onSubmit={this.add_to_cart}> */}
        <div style={{"display":"flex", "justify-content":"space-around", "margin-bottom":"15px", "align-items":"center"}}>
            
            <Button onClick={this.decrement}>
            <FontAwesomeIcon icon={faMinus} size="1x" color="#ffafbd"/>
            </Button>
            <Input disabled style={{"width":"40px"}} value={this.state.count} onChange={(e) => {this.setState({count:e.target.value})}}/>
            <Button onClick={this.increment}>
                <FontAwesomeIcon icon={faPlus} size="1x" color="#ffafbd"/>
            </Button>
        </div>
		    <button class="buy--btn" onClick={this.add_to_cart}>ADD TO CART</button>
        {/* </Form> */}
	</div>
</section>
            </section>
            
        );
    }
}

export default NewCard;