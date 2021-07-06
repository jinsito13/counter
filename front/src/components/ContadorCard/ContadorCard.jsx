import React from 'react';
import Updater from './components/Updater';
import Popup from "reactjs-popup";


export default function ContadorCard({contador: {nombre, id, cont}, onUpdate}) {
    
    const DecreaseCont = async (id) => {
        await fetch(`http://localhost:5000/decrease/contadores/${id}`, {
         method: 'PUT'
       })
      
       onUpdate();   
    }

    const  IncrementCont = async (id) => {
        await fetch(`http://localhost:5000/increment/contadores/${id}`, {
         method: 'PUT'
       })  
       onUpdate();   
    }  

    const DeleteCont = async (id) => {
        await fetch(`http://localhost:5000/delete/contadores/${id}`, {
         method: 'DELETE'
       })     
       onUpdate();
    } 

   

    return (
        <div>
            <button onClick={() => DecreaseCont(id)}>-</button> 
            <span> {nombre}  :  {cont} </span> 
            <button onClick={() => IncrementCont(id)}>+</button>  
            <button onClick= {() => DeleteCont(id)}>x</button> 
            <Popup trigger={<button><div id="pen">✎</div></button>} position="top center" modal nested>
            <div className="modal">
            <div className="header"> Editar Nombre </div>
            <span><Updater id={id}/></span>
            </div>
            </Popup>
        </div>
    )
}