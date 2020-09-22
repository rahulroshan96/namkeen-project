import React, { Component } from 'react';
import {Container} from 'reactstrap'
import * as actions from './actions/auth'
import {connect} from 'react-redux'
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {withRouter} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

class Home extends Component {
    componentDidMount(){
        if (!this.props.token){
            // run this function only when token is not set
            this.props.checkExistingSession()
        }
    }
    handleLogout = ()=>{
        this.props.logout()
        this.props.history.push("/")
    }
    render() {
        return (
            <Container>
                <ToastContainer />
                <div>
                    {JSON.stringify(this.props)}
                    <h2 align="center">You are Logged in</h2>
                    <Button onClick={this.handleLogout}>Logout</Button>
               </div>
            </Container>
        );
    }
}
const mapStateToProps= (state)=>{
    return {
        loading:state.loading,
        error:state.error,
        token:state.token
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        oAuth:(username,password)=>dispatch(actions.authLogin(username,password)),
        checkExistingSession:()=>dispatch(actions.checkExistingSession()),
        logout:()=>dispatch(actions.logout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));