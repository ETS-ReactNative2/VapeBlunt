function addToCart(state, item){
    let i = 0
    let found = false
    while(i<state.length && !found){
        if(state[i].id === item.id && state[i].variant === item.variant){
            state[i].quantity += item.quantity
            found = true
        }
        i++
    }
    if(!found){
        state.push(item)
    }
    return state
}

const cartItems = (state = [], action) => {
    if(action.type === 'ADD_TO_CART'){
        return [...state, action.payload]
    }else if(action.type === 'REMOVE_FROM_CART'){
        return state.filter(cartItem=>cartItem.id !== action.payload.id)
    }
    return state
}
export default cartItems
