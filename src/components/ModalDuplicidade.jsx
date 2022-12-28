import React, { useState } from "react";

const ModalDuplicidade = (props) => {
    //const duplicidade = props.duplicidade ? props.duplicidade : null
    //const alterQtd = props.alterQtd
    const { duplicidade, alterQtd, remove } = props
    const [ newQtd, setNewQtd ] = useState(1)

    const closeAlterQtd = () => {
        const obj_remove = {
            newQtd,
            currentArray: duplicidade.currentArray
        }
        alterQtd(obj_remove)
    }
    return (
        <div className="modal -show">
            <div className="modal__content">
                <header className="modal__header">
                    <span className="modal__title">PRODUTO DUPLICADO!</span>
                </header>
                
                <div className="modal__body">
                    <h3>Já tem { duplicidade.prodNome } na sua lista.</h3>
                    <br />
                    <label>Deseja alterar a quantidade?</label>
                    
                    <fieldset className="modal__qtd">
                        <button className="modal__qtd-btn" onClick={ _ => setNewQtd( newQtd -1 ) } disabled={ newQtd < 2 ? true : false }>-</button>
                        <input type="number" min={1} onChange={ e => setNewQtd( +e.target.value ) } value={ newQtd } required />
                        <button className="modal__qtd-btn" onClick={ _ => setNewQtd( newQtd + 1 ) }>+</button>
                    </fieldset>
                </div>

                <footer className="modal__footer">
                    <button onClick={ closeAlterQtd }>{ newQtd === duplicidade.prodQtd ? 'Fechar' : 'Salvar' }</button>
                    <button className="modal__delete" onClick={ _ => remove(duplicidade.currentArray) }>Excluir</button>
                </footer>
            </div>
        </div>
    )
}

export default ModalDuplicidade;