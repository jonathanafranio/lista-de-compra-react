import { createStore, combineReducers } from "redux"

import productsReducers from "./reducers/products"

const reducers = combineReducers({
    products: productsReducers
})

const storeConfig = () => {
    return createStore(reducers)
}
export default storeConfig