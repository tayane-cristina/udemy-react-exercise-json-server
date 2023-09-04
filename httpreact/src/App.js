import './App.css';
import { useEffect, useState} from "react";

const url = "http://localhost:3000/products"

function App() {

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("")
  


 // Resgatando dados:
  useEffect(() => {
    async function fetchData(){
      const res = await fetch(url)
      const data = await res.json()
      setProducts(data)
    }
    fetchData();
  }, [])

  
  // Adicionando produtos:
  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      name,
      price,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const addProduct = await res.json();

    setProducts((previousProduct) => [...previousProduct, addProduct])

    setName("");
    setPrice("");
  };


  
  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      <ul>
        {products.map((item) => {
          return <li key={item.id}>
            <p><strong>Nome: </strong>{item.name}</p>
            <p><strong>preço: </strong>{item.price}</p>
          </li>
        })}
      </ul>
      <div className='add-product'>
        <form onSubmit={handleSubmit} className="form-add-product">
          <label>
            Nome:
            <input type="text"
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            ></input>
          </label>
          <label>
            Preço:
            <input type="number"
            name='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            ></input>
          </label>
          <button type='submit' >Enviar dados</button>
        </form>
      </div>
    </div>
  );
}
export default App;
