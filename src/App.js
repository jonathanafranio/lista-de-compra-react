import React from 'react';
//import logo from './logo.svg';
import mercado from './mercado.jpg';
//import './App.css';
import './sass/main.sass'

import ListaProdutos from "./components/ListaProdutos"

function App() {
  return (
    <div className="App">
      <div className="image-bg">
        <img src={mercado} alt="Lista de compras" />
      </div>
      <div className="container">        
        <ListaProdutos></ListaProdutos>
      </div>


    </div>
  );
}

export default App;
