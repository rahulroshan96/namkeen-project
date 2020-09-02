import React, { Component } from 'react';
import '../../assets/css/card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faPlus,faMinus } from '@fortawesome/free-solid-svg-icons'
import { InputGroup, InputGroupAddon, InputGroupText, Form, Input, Button, Badge } from 'reactstrap';

class NewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          count: 0
        };
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.add_to_cart = this.add_to_cart.bind(this)
      }

    add_to_cart = ()=>{
        alert(`Total Item ${this.state.count} Added to Cart`)    
        // api call response
    }
    increment = () =>{
           this.setState(
               {
                   count:this.state.count+1
               }
           ) 
        }  
        decrement = () =>{
            this.setState(
                {
                    count:this.state.count-1
                }
            ) 
         }  
    render() {
        return (
            <section>
                <section class="product">
	<div class="product__photo">
		<div class="photo-container">
			<div class="photo-main">
				<img src={require("../../assets/images/4-2-food-png.png")} alt="green apple slice"/>
			</div>
			{/* <div class="photo-album">
				<ul>
					<li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537302064/codepen/delicious-apples/green-apple2.png" alt="green apple"/></li>
					<li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537303532/codepen/delicious-apples/half-apple.png" alt="half apple"/></li>
					<li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537303160/codepen/delicious-apples/green-apple-flipped.png" alt="green apple"/></li>
					<li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537303708/codepen/delicious-apples/apple-top.png" alt="apple top"/></li>
				</ul>
			</div> */}
		</div>
	</div>
	<div class="product__info">
		<div class="title">
			<h1>Ujjaini Sev</h1>
			<span>Spicy Ujjaini Sev</span>
		</div>
		<div class="price">
			Rs <span>175/-</span>
            <Badge color="danger">Sale</Badge> Rs <strike>200/-</strike>
		</div>
		{/* <div class="description">
			<h3>BENEFITS</h3>
			<ul>
				<li>Apples are nutricious</li>
				<li>Apples may be good for weight loss</li>
				<li>Apples may be good for bone health</li>
				<li>They're linked to a lowest risk of diabetes</li>
			</ul>
		</div> */}
        <Form onSubmit={this.add_to_cart}>
        <div style={{"display":"flex", "justify-content":"space-around", "margin-bottom":"15px", "align-items":"center"}}>
            <Button onClick={this.increment}>
                <FontAwesomeIcon icon={faPlus} size="1x" color="#ffafbd"/>
            </Button>
            <Input style={{"width":"40px"}} value={this.state.count} onChange={(e) => {this.setState({count:e.target.value})}}/>
            <Button onClick={this.decrement}>
            <FontAwesomeIcon icon={faMinus} size="1x" color="#ffafbd"/>
            </Button>
        </div>
		    <button class="buy--btn" type="submit">ADD TO CART</button>
        </Form>
	</div>
</section>
            </section>
            
        );
    }
}

export default NewCard;