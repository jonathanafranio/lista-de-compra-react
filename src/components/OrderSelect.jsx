import React, { useState, useEffect } from "react";

const OrderSelect = (props) => {
    const { order, changeSelect } = props

    const [orderState, setOrderState] = useState(order)

    useEffect(() => {
        changeSelect(orderState)
    }, [orderState, changeSelect])

    return (
        <>
            <div className="sort">
                <div className="sort__select">
                    <svg className="sort__icon" viewBox="0 0 15 15">
                        <path 
                        d="M7.36 2.988a.645.645 0 01-.02.912c-.271.26-.7.26-.972 0L4.82 2.415v10.68a.687.687 0 11-1.375 0V2.415L1.895 3.9c-.271.26-.7.26-.971 0a.645.645 0 01-.02-.912l.02-.02L3.646.36c.272-.26.7-.26.972 0L7.34 2.969zm6.875 8.413a.645.645 0 01-.02.02l-2.722 2.608c-.272.26-.7.26-.972 0L7.799 11.42a.645.645 0 010-.931c.271-.26.7-.26.972 0l1.549 1.483V1.293a.687.687 0 111.375 0v10.68l1.548-1.484c.272-.26.7-.26.972 0a.645.645 0 01.02.912z" 
                        fill="currentColor" />
                    </svg>

                    <select onChange={ e => setOrderState(e.target.value) }>
                        <option value="default">Ordenação padrão</option>
                        <option value="nameAsc">Ordenação por Nome Crescente (A - Z)</option>
                        <option value="nameDesc">Ordenação por Nome Decrescente (Z - A)</option>
                        <option value="priceAsc">Ordenação por Preços Menores</option>
                        <option value="priceDesc">Ordenação por Preço Maiores</option>
                        <option value="qtdAsc">Ordenação por Quantidade Menor</option>
                        <option value="qtdDesc">Ordenação por Quantidade Maior</option>
                    </select>
                </div>
            </div>

            <hr />
        </>
    )
}

export default OrderSelect