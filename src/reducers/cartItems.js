function compare(a, b){
  let same_id = a.id === b.id;
  let same_variant = a.variant === b.variant;
  return same_id && same_variant;
}

function findProduct(state, item){
  for(let i=0; i<state.length; i++){
    if(compare(state[i], item)){
      return i;
    }
  }
  return -1;
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
    const item = action.payload;
    if (findProduct(state, item) === -1) {
      return [...state, item];
    }
    return [...state]
  } else if (action.type === 'REMOVE_FROM_CART') {
    const toRemove = action.payload;
    return state.filter(cartItem => !compare(cartItem, toRemove))
  } else if (action.type === 'INCREMENT_IN_CART'){
    return increment(state, action.payload)
  }else if (action.type === 'DECREMENT_IN_CART'){
    return decrement(state, action.payload)
  }
  return state
}
export default cartItems
