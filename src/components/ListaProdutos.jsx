import React, { useState } from 'react'
import IncludeItem from './IncludeItem'
import ModalDuplicidade from './ModalDuplicidade'

const all_products = localStorage.getItem('productsList') ? JSON.parse( localStorage.getItem('productsList') ) : []

const ListaProdutos = (props) => {
    const [products, setProducts] = useState( all_products )
    const [totalprecos, setTotalprecos] = useState( products.map((prod) => +prod.valortotal)  )
    const [totalvalor, setTotalvalor] = useState( localStorage.getItem('totalvalor') ? localStorage.getItem('totalvalor') : 0 )
    const [duplicidade, setDuplicidade] = useState(null)

    const hasProduct = (obj_prod) => {
        if(!obj_prod) return

        const nameNewProd = obj_prod.nome.toLowerCase()
        const hastThisProd = products.findIndex((prod) => prod.nome.toLowerCase() === nameNewProd)
        console.log({ duplicidade })
        if (hastThisProd < 0) {
            addProduct( obj_prod )
        } else {
            const obj_duplicidade = {
                currentArray: hastThisProd,
                prodNome: products[hastThisProd].nome,
                prodQtd: +products[hastThisProd].quantidade
            }
            setDuplicidade( obj_duplicidade )
            navigator.vibrate(400);
        }
    }

    const addProduct = (newProd) => {
        if( ! newProd ) return
        
        const product_list = products.concat(newProd)
        setProducts(product_list)

        localStorage.setItem( 'productsList', JSON.stringify(product_list) );
    }

    const incluirPreco = (event) => {
        const thisRel = event.target.getAttribute('rel');
        const precoUnitario = event.target.value.replace(',','.');
        const precoTotal = (precoUnitario * products[thisRel].quantidade).toFixed(2);

        let productArray = products;
        productArray[thisRel].preco = precoUnitario;
        productArray[thisRel].valortotal = precoTotal;
        
        let totalproduto = productArray.map((product) => +product.valortotal);
        let total = totalproduto.reduce((total,num) => total + num).toFixed(2);

        setProducts(productArray)
        setTotalvalor(total)        

        localStorage.setItem('productsList', JSON.stringify(productArray));
        localStorage.setItem('totalvalor', total);
    }

    const removeProduct = (index) => {
        if(!index) return
        let product_removed = products 
            product_removed.splice(index, 1)
        let totalprecosArr = totalprecos.length > 1 ? totalprecos.splice(index, 1) : []

        setProducts( product_removed )
        setTotalprecos( totalprecosArr )
        setTotalvalor( totalprecosArr.reduce((total,num) => total + num, 0).toFixed(2) )
        product_removed.length ? localStorage.setItem('productsList', JSON.stringify(product_removed)) : localStorage.clear();
        setDuplicidade(null)
    }

    const fecharModalDuplicidade = (change) => {
        const newQtd = change.newQtd
        const currentArray = change.currentArray
        const qtdAtual = +products[currentArray].quantidade

        if( newQtd != qtdAtual ) {
            let alter_products = products
                alter_products[currentArray].quantidade = newQtd
            setProducts(alter_products)
        }
        setDuplicidade(null)
    }


    return (
        <>
            <IncludeItem hasProd={ hasProduct } />

            <hr />

            <ul className="list mx-12">
                { products.length ? (
                <li className="list__prod list__title">
                    <strong className="list__name-prod mx-4">
                        Produto:
                    </strong>
                    <strong className="list__qtd-prod col mx-1">
                        Qtd:
                    </strong>
                    <strong className="list__price-uni col mx-3">
                        Preço Unitário:
                    </strong>
                    <strong className="list__price-total col mx-3">
                        Total:
                    </strong>
                    <div className="list__remve-product col mx-1">  
                    </div>
                </li>
                ) : (
                <li>
                    <h3>Sua lista está vazia.</h3>
                </li>
                ) }

                { products.map( (product, index ) => (
                    <li className="list__prod" id={`product-${index}`} key={index}>
                        <input type="checkbox" className="list__checkbox" id={index} />
                        <label className="list__name-prod list__label-prod mx-4 sm-5 ph-2" htmlFor={index}>
                        { product.nome }
                        </label>

                        <div className="list__qtd-prod col mx-1 sm-1 ph-1">
                            { product.quantidade }
                        </div>
                        
                        <div className="list__price-uni col mx-3 sm-2 ph-1">
                            <input type="number" pattern="[0-9]+([,\.][0-2]+)?" name="price-product" placeholder="Valor (R$):" step="0.01" id={'price-'+index} rel={index} value={ product.preco } onChange={ incluirPreco } />
                        </div>
                        
                        <div className="list__price-total col mx-3 sm-3 ph-1">{ product.valortotal }</div>

                        <div className="list__remve-product col mx-1 sm-1 ph-1">
                            <button type="button" name="button" onClick={ e => removeProduct(index) } className="list__btn" value={ index }>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
                                </svg>
                            </button>
                        </div>

                    </li>
                ) ) }
            </ul>

            <footer className="footer">
                <p>Total da compra: <strong>R${ totalvalor }</strong></p>
            </footer>
            { duplicidade ? (
                <ModalDuplicidade duplicidade={ duplicidade } alterQtd={ fecharModalDuplicidade } remove={ removeProduct } />
            ) : (<></>)
            }
        </>
    )
}

export default ListaProdutos
