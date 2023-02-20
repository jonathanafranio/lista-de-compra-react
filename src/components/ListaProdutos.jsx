import React, { useState, useEffect } from "react";
import IncludeItem from './IncludeItem'
import ModalDuplicidade from './ModalDuplicidade'
import OrderSelect from './OrderSelect'
import Product from "./Product"

const all_products = localStorage.getItem('productsList') ? JSON.parse( localStorage.getItem('productsList') ) : []

const ListaProdutos = (props) => {
    const [products, setProducts] = useState( all_products )
    const [totalvalor, setTotalvalor] = useState( 'R$0,00' )
    const [duplicidade, setDuplicidade] = useState(null)
    const [showOrder, setShowOrder] = useState(false)
    const [order, setOrder] = useState("default")

    const productsStorage = (new_value) => localStorage.setItem('productsList', JSON.stringify(new_value));

    const changeTotalValue = () => {
        const produtctsValuesTotal = products.map( p => +p.valortotal )
        const total = products.length ? produtctsValuesTotal.reduce((total, num) => total + num) : 0
        const totalString = total.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        })

        setTotalvalor(totalString)
    }

    useEffect(() => {
        products.length > 1 ? setShowOrder(true) : setShowOrder(false)

        changeTotalValue()
        // eslint-disable-next-line 
    }, [products])
    
    const hasProduct = (obj_prod) => {
        if(!obj_prod) return

        const nameNewProd = obj_prod.nome.toLowerCase()
        const hastThisProd = products.findIndex((prod) => prod.nome.toLowerCase() === nameNewProd)

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
        const id_maior = products.length ? products.map(p => p.id).reduce((a,b) => Math.max(a, b)) : 0
        const id_prod = id_maior + 1
        
        newProd.id = id_prod

        const product_list = products.concat(newProd)
        setProducts(product_list)
        productsStorage(product_list)
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

    const incluirPreco = (idProd, newPrice) => {
        if(!newPrice) return
        if(!idProd) return

        
        let productArray = products
        const thisIndex = productArray.findIndex((prod) => prod.id === idProd)
        let precoUnitario = +newPrice.toString().replace(',', '.')
        const precoTotal = (precoUnitario * productArray[thisIndex].quantidade).toFixed(2)
        
        productArray[thisIndex].preco = precoUnitario;
        productArray[thisIndex].valortotal = +precoTotal;
        
        setProducts( productArray )
        changeTotalValue()
        productsStorage(productArray)
    }

    const removeProduct = (id) => {
        if(!id) return
        const newList = products.filter( (p) => p.id !== id )
        setProducts( newList )

        newList.length ? productsStorage(newList) : localStorage.clear();
        setDuplicidade(null)
    }

    const fecharModalDuplicidade = (change) => {
        const newQtd = change.newQtd
        const currentArray = change.currentArray
        const qtdAtual = +products[currentArray].quantidade
        const price = +products[currentArray].preco
        const precoTotal = (price * newQtd).toFixed(2);

        if( newQtd !== qtdAtual ) {
            let alter_products = products
                alter_products[currentArray].quantidade = newQtd
                alter_products[currentArray].valortotal = precoTotal

                console.log(alter_products[currentArray])
            setProducts(alter_products)

            alter_products.length ? productsStorage(alter_products) : localStorage.clear();

            changeTotalValue()
        }
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
                    <Product product={ product } removeProduct={ removeProduct } incluirPreco={ incluirPreco } />
                ) ) }

            </ul>

            <footer className="footer">
                <p>Total da compra: <strong>{ totalvalor }</strong></p>
            </footer>
            { duplicidade ? (
                <ModalDuplicidade duplicidade={ duplicidade } alterQtd={ fecharModalDuplicidade } remove={ removeProduct } />
            ) : false }
        </>
    )

}

export default ListaProdutos