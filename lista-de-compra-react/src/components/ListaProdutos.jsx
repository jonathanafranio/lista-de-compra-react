import React, { useState, useEffect } from "react";
import IncludeItem from './IncludeItem'
//import ModalDuplicidade from './ModalDuplicidade'
import OrderSelect from './OrderSelect'

const all_products = localStorage.getItem('productsList') ? JSON.parse( localStorage.getItem('productsList') ) : []

const ListaProdutos = (props) => {
    const [products, setProducts] = useState( all_products )
    const [totalprecos, setTotalprecos] = useState( products ? products.map((prod) => +prod.valortotal) : [] )
    //const [totalvalor, setTotalvalor] = useState( products.length > 0 ? totalprecos.reduce((total, num) => total + num) : 0 )
    const [totalvalor, setTotalvalor] = useState( 0 )
    const [duplicidade, setDuplicidade] = useState(null)
    const [showOrder, setShowOrder] = useState(false)
    const [order, setOrder] = useState("default")

    useEffect(() => {
        products.length > 1 ? setShowOrder(true) : setShowOrder(false)
    }, [products])
    
    const hasProduct = (obj_prod) => {
        if(!obj_prod) return

        const nameNewProd = obj_prod.nome.toLowerCase()
        const hastThisProd = products.findIndex((prod) => prod.nome.toLowerCase() === nameNewProd)

        if (hastThisProd < 0) {
            addProduct( obj_prod )

        } else {
            /*const obj_duplicidade = {
                currentArray: hastThisProd,
                prodNome: products[hastThisProd].nome,
                prodQtd: +products[hastThisProd].quantidade
            }
            setDuplicidade( obj_duplicidade )
            navigator.vibrate(400);*/
        }
    }

    const addProduct = (newProd) => {
        if( ! newProd ) return
        const id_maior = products.length ? products.map(p => p.id).reduce((a,b) => Math.max(a, b)) : 0
        const id_prod = id_maior + 1
        
        newProd.id = id_prod

        const product_list = products.concat(newProd)
        setProducts(product_list)
        localStorage.setItem( 'productsList', JSON.stringify(product_list) );
    }

    const changeOrder = (newOrder) => {
        if(!newOrder) return
        
        setOrder(newOrder)

        const orderDefault = (arrProd) => arrProd.sort((a, b) => a.id - b.id);
        const orderByNameAsc = (arrProd)  => {
            const prodNameAsc = arrProd.sort((a, b) => {
                const nameA = a.nome.toLowerCase();
                const nameB = b.nome.toLowerCase();
                return nameA.localeCompare(nameB);
            });
            return prodNameAsc;
        }
        const orderByNameDesc = (arrProd) => orderByNameAsc(arrProd).reverse();
        const orderBypriceAsc = (arrProd) => arrProd.sort((a, b) => a.preco - b.preco);
        const orderBypriceDesc = (arrProd) => orderBypriceAsc(arrProd).reverse();
        const orderByQtdAsc = (arrProd) => arrProd.sort((a, b) => a.quantidade - b.quantidade);
        const orderByQtdDesc = (arrProd) => orderByQtdAsc(arrProd).reverse();
        const funcOrder = (arrProd) => {
            switch (newOrder) {
                case "nameAsc":
                    return orderByNameAsc(arrProd);
                case "nameDesc":
                    return orderByNameDesc(arrProd);
                case "priceAsc":
                    return orderBypriceAsc(arrProd);
                case "priceDesc":
                    return orderBypriceDesc(arrProd);
                case "qtdAsc":
                    return orderByQtdAsc(arrProd);
                case "qtdDesc":
                    return orderByQtdDesc(arrProd);
                default:
                    return orderDefault(arrProd);
            }
        }
        
        const return_prod = funcOrder(products);

        setProducts( return_prod )
    }

    const removeProduct = (id) => {
        if(!id) return
        const newList = products.filter( (p) => p.id !== id )
        setProducts( newList )

        //const totalprecosArr = newList.map( p => +p.valortotal)
        //setTotalprecos( totalprecosArr )
        //setTotalvalor( totalprecosArr.reduce((total,num) => total + num, 0).toFixed(2) )

        newList.length ? localStorage.setItem('productsList', JSON.stringify(newList)) : localStorage.clear();
        setDuplicidade(null)
    }


    return (
        <>
            <IncludeItem hasProd={ hasProduct } />
            <hr />

            { showOrder ? (<OrderSelect order={order} changeSelect={ changeOrder } />) : false }

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
                    <li className="list__prod" id={`product-${product.id}`} key={product.id}>
                        <input type="checkbox" className="list__checkbox" id={product.id} />
                        <label className="list__name-prod list__label-prod mx-4 sm-5 ph-2" htmlFor={product.id}>
                        { product.nome }
                        </label>

                        <div className="list__qtd-prod col mx-1 sm-1 ph-1">
                            { product.quantidade }
                        </div>
                        
                        <div className="list__price-uni col mx-3 sm-2 ph-1">
                            { /*
                            <input type="number" pattern="[0-9]+([,\.][0-2]+)?" name="price-product" placeholder="Valor (R$):" step="0.01" id={'price-'+index} rel={index} value={ product.preco } onChange={  incluirPreco } />
                            */ }
                        </div>
                        
                        <div className="list__price-total col mx-3 sm-3 ph-1">{ product.valortotal }</div>

                        <div className="list__remve-product col mx-1 sm-1 ph-1">
                            <button type="button" name="button" onClick={ _ => removeProduct(product.id) } className="list__btn" value={ product.id }>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
                                </svg>
                            </button>
                        </div>

                    </li>
                ) ) }


                { /* products.map( (product, index ) => (
                    <li className="list__prod" id={`product-${index}`} key={index}>
                        <input type="checkbox" className="list__checkbox" id={index} />
                        <label className="list__name-prod list__label-prod mx-4 sm-5 ph-2" htmlFor={index}>
                        { product.nome }
                        </label>

                        <div className="list__qtd-prod col mx-1 sm-1 ph-1">
                            { product.quantidade }
                        </div>
                        
                        <div className="list__price-uni col mx-3 sm-2 ph-1">
                            <input type="number" pattern="[0-9]+([,\.][0-2]+)?" name="price-product" placeholder="Valor (R$):" step="0.01" id={'price-'+index} rel={index} value={ product.preco } onChange={  incluirPreco } />
                        </div>
                        
                        <div className="list__price-total col mx-3 sm-3 ph-1">{ product.valortotal }</div>

                        <div className="list__remve-product col mx-1 sm-1 ph-1">
                            <button type="button" name="button" onClick={ _ => removeProduct(index) } className="list__btn" value={ index }>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
                                </svg>
                            </button>
                        </div>

                    </li>
                ) ) */}
            </ul>

            <footer className="footer">
                <p>Total da compra: <strong>R${ totalvalor }</strong></p>
            </footer>
            { /*duplicidade ? (
                <ModalDuplicidade duplicidade={ duplicidade } alterQtd={ fecharModalDuplicidade } remove={ removeProduct } />
            ) : false*/ }
        </>
    )

}

export default ListaProdutos