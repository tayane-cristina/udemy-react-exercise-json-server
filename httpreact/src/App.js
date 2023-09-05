import './App.css';
import { useEffect, useState} from "react";

const url = "http://localhost:3000/products"

function App() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(null)


  //Criar cadastro de produto
  const [code, setCode] = useState(0);
  const [produce, setProduce] = useState("")
  const [spin, setSpin] = useState(0)
  


 // Resgatando dados:
  useEffect(() => {
    async function fetchData(){
      
      setLoading(true)

      try {
        const res = await fetch(url)
        const data = await res.json()
        setProducts(data)

       
      } catch (error) {
        console.log(error.message)

        setError("Houve um erro ao carregar os dados...")
      }

       setLoading(false)
    }
    fetchData();
  }, [])

  
  // Adicionando produtos:
  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      code,
      produce,
      spin,
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

    setCode("");
    setProduce("");
    setSpin()
  };


  
  return (
    <div className="App">
      <h1>Pasta 3 - Perfumária</h1>
      {loading && <p className='loading'>Carregando dados...</p>}
      {error && <p>{error}</p>}
      {!error && <ul>
        {products.map((item) => {
          return <li key={item.id}>
            <p className='infor-product'><strong>Código </strong>{item.code}</p>
            <p className='infor-product'><strong>Produto </strong>{item.produce}</p>
            <p className='infor-product'><strong>Giro </strong>{item.spin}</p>
          </li>
        })}
      </ul>}
      <div className='add-product'>
        <form onSubmit={handleSubmit} className="form-add-product">
          <label>
            Código:
            <input type="number"
            name='code'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            ></input>
          </label>
          <label>
            Produto:
            <input type="text"
            name='produce'
            value={produce}
            onChange={(e) => setProduce(e.target.value)}
            required
            ></input>
          </label>
          <label>
            Giro:
            <input type="number"
            name='spin'
            value={spin}
            onChange={(e) => setSpin(e.target.value)}
            required
            ></input>
          </label>
          {loading && <button type='submit' disabled value="aguarde">Aguarde</button>}
          {!loading && <button type='submit'>Enviar dados</button>}
        </form>
      </div>
    </div>
  );
}
export default App;
