import React, { useState, useEffect } from "react";
import { connect } from "react-redux"
import IncludeItem from './IncludeItem'
import ModalDuplicidade from './ModalDuplicidade'
import OrderSelect from './OrderSelect'
import Product from "./Product"

const orderPego = (arr) => arr.sort( (a, b) => a.pego - b.pego )

const ListaProdutos = (props) => {
    const [products, setProducts] = useState( orderPego( props.products ) )
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
    
    const reviewOrder = (order_by, productsList) => {
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
            switch (order_by) {
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
        const return_prod = funcOrder(productsList).sort( (a, b) => a.pego - b.pego )
        setProducts( orderPego( return_prod ) )
    }

    const changeOrder = (newOrder) => {
        if(!newOrder) return
        setOrder(newOrder)
        reviewOrder(newOrder, products)
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
        
        //setProducts( orderPego(productArray) )
        reviewOrder( order, productArray )
        changeTotalValue()
        productsStorage(productArray)
    }

    const removeProduct = (id) => {
        if(!id) return
        const newList = products.filter( (p) => p.id !== id )
        //setProducts( orderPego(newList) )
        reviewOrder( order, newList )

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

            //setProducts( orderPego(alter_products) )
            reviewOrder( order, alter_products )

            alter_products.length ? productsStorage(alter_products) : localStorage.clear();

            changeTotalValue()
        }
        setDuplicidade(null)
    }

    const changePego = (idProd, bool_val) => {
        if(!idProd) return
        let productArray = products
        const thisIndex = productArray.findIndex( (prod) => prod.id === +idProd )
        productArray[thisIndex].pego = bool_val
        //setProducts( orderPego(productArray) )
        reviewOrder(order, productArray)
        productsStorage( productArray )
    }

    return (
        <>
            <IncludeItem showDuplicidade={ setDuplicidade } />
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
                

                { products.map( (product) => (
                    <Product key={ product.id } product={ product } removeProduct={ removeProduct } incluirPreco={ incluirPreco } checked={ changePego } />
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

const mapStateToProps = (state) => state.products

export default connect( mapStateToProps )(ListaProdutos)