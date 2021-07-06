import React, {useState} from 'react';

export default function Updater({id}) {

    let [nombre, setNombre] = useState("");

    const handleChange = (event) =>{
    setNombre(event.target.value)
  }
    // update contador por id
     const gut = async (id) => {
        await  fetch(`http://localhost:5000/update/contadores/${id}`, {
        method: 'PUT',
        headers: {"Content-Type" : 'application/json'},
        body: JSON.stringify({nombre})
      })   
    }

    return(
      
    <form onSubmit={() => gut(id)}>
         <div className="inputUpd">
        <input type="text" onChange={handleChange}/>
        <input type="submit" value="Submit" />
        </div>
    </form>
    
        )
}