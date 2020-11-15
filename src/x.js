var axios = require('axios');
async function getCartProducts(){
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjAzNTc0OTE0LCJqdGkiOiI0MmMzODUxN2FkMzA0ZTM4OWJjOWRiZmJlNTA2N2NjMSIsInVzZXJfaWQiOjF9.Otehi_EZxY3SlsN7bMBccRd8v2nwAh738tJCRRx2A8o"
    await axios.get(`http://localhost:8001/api/cart-get/`,{
        headers: {
            Authorization: `Bearer ${token}`
          }
    })
    .then((res)=>{
        console.log(res.data)
    }).catch((err)=>{
        console.log(err.response.data)
    })
    console.log("Done")
}

getCartProducts()

