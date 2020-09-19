import React, { Component, Fragment } from 'react'

let products,
    totalprecos,
    totalvalor;
    
if(localStorage.getItem('productsList') != null){
    products = JSON.parse(localStorage.getItem('productsList'));
} else {
    products = [];
}

if(localStorage.getItem('productsList') != null) {
    totalprecos = products.map((prod) => +prod.valortotal);
} else {
    totalprecos = [];
}

if(localStorage.getItem('totalvalor')!=null) {
    totalvalor = localStorage.getItem('totalvalor');
} else {
    totalvalor = 0;
}

export default class ListaProdutos extends Component {
    constructor() {
        super();

        this.state = {
            newProduct: '',
            newQtd: 1,
            products: products,
            totalprecos: totalprecos,
            totalvalor: totalvalor,
        };

        this.productChange = this.productChange.bind(this);
        this.qtdChange = this.qtdChange.bind(this);
        this.addProduct = this.addProduct.bind(this);

        this.incluirPreco = this.incluirPreco.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
    }

    productChange(event) {
        this.setState({ newProduct : event.target.value });
    }

    qtdChange(event) {
        this.setState({ newQtd: event.target.value });
    }

    addProduct(event) {
        event.preventDefault();

        let newProd = {
            nome: this.state.newProduct,
            quantidade: this.state.newQtd,
            preco: 0,
            valortotal: 0
        };
        
        this.setState(state => ({
            products: state.products.concat(newProd),
            newProduct: ''
        }) );

        localStorage.setItem( 'productsList', JSON.stringify(this.state.products.concat(newProd)) );
    }

    removeProduct(event) {
        event.preventDefault();
        let index = event.target.value;
        let productsArr = this.state.products;
            productsArr.splice(index, 1);
        let totalprecosArr = this.state.totalprecos;
            totalprecosArr.splice(index, 1);        

        this.setState(state => ({
            products: productsArr,
            totalprecos: totalprecosArr
        }) );

        if(this.state.products.length) {
            localStorage.setItem('productsList', JSON.stringify(productsArr));
            totalprecosArr.reduce((total,num) => total + num, 0).toFixed(2);
            this.setState(state => ({
                totalvalor: totalprecosArr
            }) );

            localStorage.setItem('totalvalor', this.state.totalvalor);
        } else {
            this.setState(state => ({
                totalvalor: 0
            }) );
            localStorage.clear();
        }

    }

    incluirPreco(event) {
        let thisRel = event.target.getAttribute('rel');
        let precoUnitario = event.target.value.replace(',','.');
        let precoTotal = (precoUnitario * this.state.products[thisRel].quantidade).toFixed(2);

        let productArray = this.state.products;
        productArray[thisRel].preco = precoUnitario;
        productArray[thisRel].valortotal = precoTotal;
        
        let totalproduto = productArray.map((product) => +product.valortotal);
        let total = totalproduto.reduce((total,num) => total + num).toFixed(2);

        this.setState(state => ({
            products: productArray,
            totalvalor: total
        }) );
        

        localStorage.setItem('productsList', JSON.stringify(productArray));
        localStorage.setItem('totalvalor', total);
    }

    render() {
        return (
            <Fragment>
                <header className="header">
                    <h1>Lista de compras</h1>
                </header>

                <form className="form-include" onSubmit={ this.addProduct }>
                    <div className="mx-6 sm-4 ph-2 form-include__box">
                        <label className="form-include__label" htmlFor="item-name">Item:</label>
                        <input type="text" id="item-name" name="item-name" onChange={ this.productChange } value={ this.state.newProduct } placeholder="Ex.: Sabonete" required />
                    </div>
                    <div className="mx-3 sm-2 ph-2 form-include__box">
                        <label className="form-include__label" htmlFor="item-quantidade">Quantidade:</label>
                        <input type="number" id="item-quantidade" name="item-quantidade" min="1" onChange={ this.qtdChange } value={ this.state.newQtd } required />
                    </div>
                    <div className="mx-3 sm-6 ph-2 form-include__box">
                        <button type="submit">Adicionar</button>
                    </div>
                </form>

                <hr />

                <ul className="list mx-12">
                    { this.state.products.length ? (
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

                    { this.state.products.map( (product, index )=>(
                        <li className="list__prod" id={`product-${index}`} key={index}>
                            <input type="checkbox" className="list__checkbox" id={index} />
                            <label className="list__name-prod list__label-prod mx-4 sm-5 ph-2" htmlFor={index}>
                            { product.nome }
                            </label>

                            <div className="list__qtd-prod col mx-1 sm-1 ph-1">
                                { product.quantidade }
                            </div>
                            
                            <div className="list__price-uni col mx-3 sm-2 ph-1">
                                <input type="number" pattern="[0-9]+([,\.][0-2]+)?" name="price-product" placeholder="Valor (R$):" step="0.01" id={'price-'+index} rel={index} value={ product.preco } onChange={ this.incluirPreco } />
                            </div>
                            
                            <div className="list__price-total col mx-3 sm-3 ph-1">{ product.valortotal }</div>

                            <div className="list__remve-product col mx-1 sm-1 ph-1">
                                <button type="button" name="button" onClick={ this.removeProduct } className="list__btn" value={ index }>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
                                    </svg>
                                </button>
                            </div>

                        </li>
                    ) ) }
                </ul>

                <footer className="footer">
                    <p>Total da compra: <strong>R${ this.state.totalvalor }</strong></p>
                </footer>
            </Fragment>
        )
    }
}