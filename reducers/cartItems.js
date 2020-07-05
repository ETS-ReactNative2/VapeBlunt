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
    return [...state]//for some reason returning just state doesnt work
}

const cartItems = (state = [], action) => {
    if(action.type === 'ADD_TO_CART'){
      return addToCart(state, action.payload)
    }else if(action.type === 'REMOVE_FROM_CART'){
      return state.filter(cartItem=>(cartItem.id !== action.payload.id || cartItem.variant !== action.payload.variant))
    }
    return state
}
export default cartItems
