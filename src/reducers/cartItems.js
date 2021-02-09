function compare(a, b){
  let same_handle = a.handle === b.handle;
  let same_variant = a.variant === b.variant;
  return same_handle && same_variant;
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
    if (result[i].handle === payload.handle && result[i].variant === payload.variant) {
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
    if (result[i].handle === payload.handle && result[i].variant === payload.variant) {
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
  switch(action.type){
    case 'ADD_TO_CART': {
      const item = action.payload;
      if (findProduct(state, item) === -1) {
        return [...state, item];
      }
      return [...state]
    }
    case 'REMOVE_FROM_CART': {
      const toRemove = action.payload;
      return state.filter(cartItem => !compare(cartItem, toRemove))
    }
    case 'INCREMENT_IN_CART': {
      return increment(state, action.payload)
    }
    case 'DECREMENT_IN_CART': {
      return decrement(state, action.payload)
    }
    case 'EMPTY': {
      return state.filter(item => false)
    }
    default: return state;
  }
}
export default cartItems
