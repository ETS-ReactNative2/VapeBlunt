import {combineReducers} from 'redux'

import cartItems from './cartItems'

const rootReducer = combineReducers({
  cartItems: cartItems
})

export default rootReducer
