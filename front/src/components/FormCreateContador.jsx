import React, {useState} from 'react';

export default function FormCreateContador({onUpdate}) {
  
    const [newCont, setNewCont] = useState('');

    const handleChange = (event) =>{
            setNewCont(event.target.value)
    }

    const CrearCont = async (event) => {
        event.preventDefault();
        await fetch(`http://localhost:5000/create/contador`, {
         method: 'POST',
         headers: {"Content-Type" : 'application/json'},
         body : JSON.stringify({nombre: newCont})
       })   
       onUpdate();
       document.getElementById('updater').value="";
      }


    return (
      <div id="teta">
      <form onSubmit={CrearCont}>
        <div className="create">
          <input id="updater" type="text" placeholder="crear contador" onChange={handleChange}  />
        <input type="submit" value="Submit" />
        </div>
      </form>
      </div>
    );
}