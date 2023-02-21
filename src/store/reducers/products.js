const initialState = {
    products: localStorage.getItem('productsList') ? JSON.parse( localStorage.getItem('productsList') ) : []
}

const products = ( state = initialState, action ) => {
    const return_state = {
        'RM_PRODUCT': state,
        'ADD_PRODUCT': { ...state, products: action.payload },
        'EDIT_PRODUCT': state,
        'default': state
    }
    return return_state[action.type] || return_state.default
}
export default products