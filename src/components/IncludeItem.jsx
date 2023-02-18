import React, { useState } from "react"
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
    const [ nome, setNome ] = useState("")
    const [ quantidade, setQuantidade ] = useState(1)

    const callback = props.hasProd

    const addProduct = (e) => {
        e.preventDefault()
        if( nome.trim() === "" ) return

        const prodAdd = {
            nome: nome,
            quantidade: +quantidade,
            preco: 0,
            valortotal: 0,
        }

        callback( prodAdd )

        setNome('')
        setQuantidade(1)
    }

    return (
        <>  
            <header className="header">
                <h1>Lista de compras</h1>
            </header>
            <form className="form-include" onSubmit={ addProduct }>
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

export default IncludeItem