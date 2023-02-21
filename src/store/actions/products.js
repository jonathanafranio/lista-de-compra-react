export const addProduct = (obj_newProd, arr_products) => {
    arr_products.push(obj_newProd)

    localStorage.setItem('productsList', JSON.stringify(arr_products))

    return {
        type: 'ADD_PRODUCT',
        payload: arr_products
    }
}
