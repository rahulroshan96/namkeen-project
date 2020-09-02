import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const NBCard = (props) => {
  const cartAlert = ()=>{
    alert("Added to Cart");
  }
  return (
    <div>
      <Card>
        <CardImg top width="100px"
        src={require("../../assets/images/greek-salad-bowl-lettuce-vegetable-salad-png-clipart-free-salad-bowl-png-728_430.jpg")} 
        alt="Card image cap"
        />
        <CardBody style={{backgroundColor:"#a1fcdf"}}>
          <CardTitle >Ujjaini Sev</CardTitle>
          <CardSubtitle>Spicy Ujjaini Sev</CardSubtitle>
          {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
          <Button style={{"background":"fcd29f"}} onClick={cartAlert}>Add to Cart</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default NBCard;