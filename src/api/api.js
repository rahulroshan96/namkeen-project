import axios from 'axios'

export const get_products=()=>{
    axios.get("http://localhost:8000/api/products-list/")
    .then((res)=>{
        console.log(res.data)
        return res.data
    }).catch((err)=>{
        console.log(err.response)
        return err.response
    })
}

// get_products()