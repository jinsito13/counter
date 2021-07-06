import React, {useState, useEffect} from 'react';
import ContadorCard from './components/ContadorCard/ContadorCard.jsx';
import FormCreateContador from './components/FormCreateContador.jsx';


function App() {
  const [items, setItems] = useState([]);
  
  async function dataFetch() { 
    const res = await fetch("http://localhost:5000/contadores");
    const result = await res.json();
    console.log(result)
    setItems(result.respuesta)
  }
  
  useEffect(() => {
    dataFetch();
  }, [setItems])

    return (
      <>
        <div class="grid">
          <h1>contadores</h1>
          <ul>
            {items.map( item =>
              <li key={item.id}>
                <ContadorCard contador={item} onUpdate={dataFetch}/>
              </li>
            )}
          </ul>
        </div>  
        <FormCreateContador onUpdate={dataFetch}/>
      </>
    );
  }

export default App;

