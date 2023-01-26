import React, { useState, useEffect } from "react";

const InputPrice = (props) => {
    const { product } = props
    const preco = product ? product.preco : 0
    const [valuePrice, setValuePrice] = useState(preco)

    useEffect(() => {
        //console.log({ valuePrice })
        props.incluirPreco(product.id, valuePrice)
    }, [valuePrice])
    return(

        <input 
            type="tel" 
            name="price-product" 
            placeholder="Valor (R$):" 
            id={`price-${product.id}`} 
            rel={ product.id } 
            value={ valuePrice } 
            onChange={ (e) => setValuePrice(e.target.value) } 
        />
    )
}
export default InputPrice