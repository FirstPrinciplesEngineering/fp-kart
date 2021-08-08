export const getBuyers = () => {
    
    const output = fetch("https://swipeshopship.herokuapp.com/users/buyer",{
        method:"GET",
        headers:{'x-access-token':localStorage.getItem('loginToken')}
    })
    .then(data=>data.json())

    return{
        type:'SET_BUYERS',
        payload:output
    }
    
}


export const getSellers = () => {
    
    const output = fetch("https://swipeshopship.herokuapp.com/users/seller",{
        method:"GET",
        headers:{'x-access-token':localStorage.getItem('loginToken')}
    })
    .then(data=>data.json())

    return{
        type:'SET_SELLERS',
        payload:output
    }
}




export const getvProducts = () => {
    
    const output = fetch("https://swipeshopship.herokuapp.com/products/verified",{
            method:"GET",
            headers:{'x-access-token':localStorage.getItem('loginToken')}
        })
        .then(data=>data.json())

        return{
            type:'SET_VERIFIED_PRODUCTS',
            payload : output
        }
    }


export const getNvProducts = () => {

    const output = fetch("https://swipeshopship.herokuapp.com/products/not_verified",{
            method:"GET",
            headers:{'x-access-token':localStorage.getItem('loginToken')}
        })
        .then(data=>data.json())

        return{
            type:'SET_NOT_VERIFIED_PRODUCTS',
            payload : output
        }
    }