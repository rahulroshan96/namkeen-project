import axios from 'axios'
import {BASEURL} from '../Constants'

export const get_products=()=>{
    axios.get(`${BASEURL}/api/products-list/`)
    .then((res)=>{
        console.log(res.data)
        return res.data
    }).catch((err)=>{
        console.log(err.response)
        return err.response
    })
}

// get_products()