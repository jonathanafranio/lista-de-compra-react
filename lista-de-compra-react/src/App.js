import ListaProdutos from './components/ListaProdutos';
import mercado from './mercado.jpg'
import './sass/main.sass'

function App() {
  return (
    <div className="App">
      <div className="image-bg">
        <img src={mercado} alt="Lista de compras" />
      </div>
      <div className="container">
        <ListaProdutos />      
      </div>
    </div>
  );
}

export default App;
