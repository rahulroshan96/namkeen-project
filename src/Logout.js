import React, { Component } from 'react';
import {Button} from 'reactstrap'
import * as actions from './actions/auth'
import {connect} from 'react-redux'


class Logout extends Component {

    handleLogout = ()=>{
        this.props.logout()
        window.location.href="/"
        // this.props.history.push("/")
    }
    componentDidMount(){
        this.handleLogout()
    }
    render() {
        return (
            <></>
        );
    }
}

// const mapStateToProps= (state)=>{
//     return {
//         loading:state.loading,
//         error:state.error
//     }
// }

const mapDispatchToProps=dispatch=>{
    return {
        logout:()=>dispatch(actions.logout())
    }
}

  export default connect(null, mapDispatchToProps)(Logout);