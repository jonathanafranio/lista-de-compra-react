import React, { useState } from "react"
import { connect } from "react-redux"

import { addProduct } from '../store/actions/products'

const listProdutcts = [
    "Absorvente",
    "Água oxigenada",
    "Água Sanitária",
    "Álcool em gel",
    "Algodão",
    "Amaciante",
    "Arroz",
    "Açúcar",
    "Barbeador descartável",
    "Biscoitos",
    "Bom Bril",
    "Café",
    "Carne bolvina",
    "Carne suina",
    "Chá",
    "Condicionador",
    "Creme dental",
    "Curativos",
    "Desinfetante",
    "Desodorante",
    "Detergente",
    "Escova de dente",
    "Esparadrapo",
    "Esponja de aço",
    "Esponja de pia",
    "Extrato de tomate",
    "Farinha de mandioca",
    "Farinha de milho",
    "Farinha de trigo",
    "Feijão",
    "Fermento",
    "Fio dental",
    "Flanela",
    "Fósforo",
    "Gaze",
    "Guardanapo de papel",
    "Hastes flexíveis",
    "Cotonete",
    "Hortaliças",
    "Inseticida",
    "Iogurte",
    "Lâmpada",
    "Leite",
    "Lustra-móveis",
    "Luvas plásticas",
    "Macarrão",
    "Margarina",
    "Manteiga",
    "Milho",
    "Molho de tomate",
    "Óleo de soja",
    "Ovos",
    "Pães",
    "Papel Alumínio",
    "Papel Filme",
    "Papel higiênico",
    "Papel toalha",
    "Peixe",
    "Picanha",
    "Queijo ralado",
    "Sabão em barra",
    "Sabão em pó",
    "Sabonete",
    "Sacos de lixo",
    "Sal",
    "Shampoo",
    "Tempero",
]
const IncludeItem = (props) => {
    const { products, addProd, showDuplicidade } = props
    const [ nome, setNome ] = useState("")
    const [ quantidade, setQuantidade ] = useState(1)

    const actionSubmit = ( e ) => {
        e.preventDefault()
        if( nome.trim() === "" ) return

        const nameNewProd = nome.toLowerCase()
        const hastThisProd = products.findIndex((prod) => prod.nome.toLowerCase() === nameNewProd)

        if( hastThisProd < 0 ) {
            const id_maior = products.length ? products.map(p => p.id).reduce((a,b) => Math.max(a, b)) : 0
            
            const prodAdd = {
                id: id_maior + 1,
                nome: nome,
                quantidade: +quantidade,
                preco: 0,
                valortotal: 0,
                pego: false,
            }
            //console.log( { hastThisProd, id_maior, prodAdd } )
            addProd(prodAdd, products)

        } else {
            const obj_duplicidade = {
                currentArray: hastThisProd,
                prodNome: products[hastThisProd].nome,
                prodQtd: +products[hastThisProd].quantidade
            }
            navigator.vibrate(400)
            showDuplicidade( obj_duplicidade )
        }
        setNome('')
        setQuantidade(1)
    }

    return (
        <>  
            <header className="header">
                <h1>Lista de compras</h1>
            </header>
            <form className="form-include" onSubmit={ actionSubmit }>
                <div className="mx-6 sm-4 ph-2 form-include__box">
                    <label className="form-include__label" htmlFor="item-name">Item:</label>
                    <input type="text" id="item-name" name="item-name" value={ nome } onChange={ e => setNome(e.target.value) } placeholder="Ex.: Sabonete" required list="produtos" />
                    <datalist id="produtos">
                        { listProdutcts.map( (product, index) => (
                            <option value={ product } key={ index }>{ product }</option>
                        ) ) }   
                    </datalist>    
                </div>
                <div className="mx-3 sm-2 ph-2 form-include__box">
                    <label className="form-include__label" htmlFor="item-quantidade">Quantidade:</label>
                    <input type="number" id="item-quantidade" name="item-quantidade" min="1" onChange={ e => setQuantidade(e.target.value) } value={ quantidade } required />
                </div>
                <div className="mx-3 sm-6 ph-2 form-include__box">
                    <button type="submit">Adicionar</button>
                </div>
            </form>
        </>
    )

}

const mapStateToProps = (state) => state.products

const mapDispatchToProps = (dispatch) => {
    return {
        addProd(obj_newProd, products) {
            const action = addProduct(obj_newProd, products)
            dispatch( action )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(IncludeItem)