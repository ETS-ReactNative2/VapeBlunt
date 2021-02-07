function addToCart(state, item) {
  let i = 0
  let found = false
  while (i < state.length && !found) {
    if (state[i].id === item.id && state[i].variant === item.variant) {
      // state[i].quantity += item.quantity
      found = true
    }
    i++
  }
  if (!found) {
    state.push(item)
  }
  return [...state]//for some reason returning just state doesnt work
}

function increment(state, payload){
  result = Object.assign([], state)
  i = 0
  found = false
  while (i < result.length && !found) {
    if (result[i].id === payload.id && result[i].variant === payload.variant) {
      result[i].quantity += 1
      found = true
    }
    i++
  }
  return result
}

function decrement(state, payload){
  result = Object.assign([], state)
  i = 0
  found = false
  while (i < result.length && !found) {
    if (result[i].id === payload.id && result[i].variant === payload.variant) {
      result[i].quantity -= 1
      found = true
    }
    i++
  }
  if(result[i-1].quantity === 0){
    result.splice(i-1, 1)
  }
  return result
}

const cartItems = (state = [], action) => {
  if (action.type === 'ADD_TO_CART') {
    return addToCart(state, action.payload)
  } else if (action.type === 'REMOVE_FROM_CART') {
    return state.filter(cartItem => (cartItem.id !== action.payload.id || cartItem.variant !== action.payload.variant))
  } else if (action.type === 'INCREMENT_IN_CART'){
    return increment(state, action.payload)
  }else if (action.type === 'DECREMENT_IN_CART'){
    return decrement(state, action.payload)
  }
  return state
}
export default cartItems
