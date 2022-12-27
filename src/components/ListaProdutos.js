import React, { useState } from 'react'

const all_products = localStorage.getItem('productsList') ? JSON.parse( localStorage.getItem('productsList') ) : []

const ListaProdutos = (props) => {
    const [newProduct, setNewProduct ] = useState('')
    const [newQtd, setNewQtd] = useState(1)
    const [products, setProducts] = useState( all_products )
    const [totalprecos, setTotalprecos] = useState( all_products.map((prod) => +prod.valortotal)  )
    const [totalvalor, setTotalvalor] = useState( localStorage.getItem('totalvalor') ? localStorage.getItem('totalvalor') : 0 )

    const addProduct = (event) => {
        event.preventDefault();

        let newProd = {
            nome: newProduct,
            quantidade: newQtd,
            preco: 0,
            valortotal: 0
        };
        
        const product_list = products.concat(newProd)
        setProducts(product_list)
        setNewProduct('')
        
        localStorage.setItem( 'productsList', JSON.stringify(product_list) );
    }

    const incluirPreco = (event) => {
        let thisRel = event.target.getAttribute('rel');
        let precoUnitario = event.target.value.replace(',','.');
        let precoTotal = (precoUnitario * products[thisRel].quantidade).toFixed(2);

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

    const removeProduct = (event) => {
        event.preventDefault();
        const index = event.target.value;
        const productsArr = products.length > 1 ? products.splice(index, 1) : []
        const totalprecosArr = totalprecos.length > 1 ? totalprecos.splice(index, 1) : []
        console.log({ products, index, productsArr, totalprecosArr, totalprecos })
        
        setProducts( productsArr )
        setTotalprecos( totalprecosArr )
        setTotalvalor( totalprecosArr.reduce((total,num) => total + num, 0).toFixed(2) )
        
        productsArr.length ? localStorage.setItem('productsList', JSON.stringify(productsArr)) : localStorage.clear();
    }


    return (
        <>
            <header className="header">
                <h1>Lista de compras</h1>
            </header>

            <form className="form-include" onSubmit={ addProduct }>
                <div className="mx-6 sm-4 ph-2 form-include__box">
                    <label className="form-include__label" htmlFor="item-name">Item:</label>
                    <input type="text" id="item-name" name="item-name" value={ newProduct } onChange={ e => setNewProduct(e.target.value) } placeholder="Ex.: Sabonete" required />
                </div>
                <div className="mx-3 sm-2 ph-2 form-include__box">
                    <label className="form-include__label" htmlFor="item-quantidade">Quantidade:</label>
                    <input type="number" id="item-quantidade" name="item-quantidade" min="1" onChange={ e => setNewQtd(e.target.value) } value={ newQtd } required />
                </div>
                <div className="mx-3 sm-6 ph-2 form-include__box">
                    <button type="submit">Adicionar</button>
                </div>
            </form>

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
                            <button type="button" name="button" onClick={ removeProduct } className="list__btn" value={ index }>
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
        </>
    )
}

export default ListaProdutos
