import React, { useState } from "react";

const Product = (props) => {
    const { product, removeProduct, incluirPreco, checked } = props

    const [price, setPrice] = useState(product.preco ?? 0)

    const totalvalor = (price * product.quantidade).toFixed(2)
    
    const changePrice = (price) => {
        let newPrice = price.replace(/[A-Z a-z]/g, '')
            newPrice = newPrice.replace(',','.')
        setPrice(newPrice)
        
        incluirPreco(product.id, newPrice)
    }

    return(
        <li className="list__prod" id={`product-${product.id}`} key={product.id}>
            <input 
                type="checkbox" 
                className="list__checkbox" 
                id={product.id} 
                defaultChecked={ product.pego }
                onChange={ e => checked(product.id, e.target.checked) } />
            <label className="list__name-prod list__label-prod mx-4 sm-5 ph-2" htmlFor={product.id}>
                { product.nome }
            </label>
            <div className="list__qtd-prod col mx-1 sm-1 ph-1">
                { product.quantidade }
            </div>
                        
            <div className="list__price-uni col mx-3 sm-2 ph-1">
                <input 
                    type="tel" 
                    name="price-product" 
                    placeholder="Valor (R$):" 
                    id={`price-${product.id}`} 
                    rel={ product.id } 
                    value={ price } 
                    onChange={ (e) => changePrice(e.target.value) } 
                />
            </div>
            
            <div className="list__price-total col mx-3 sm-3 ph-1">{ totalvalor }</div>

            <div className="list__remve-product col mx-1 sm-1 ph-1">
                <button type="button" name="button" onClick={ _ => removeProduct(product.id) } className="list__btn" value={ product.id }>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
                    </svg>
                </button>
            </div>
        </li>
    )
}

export default Product