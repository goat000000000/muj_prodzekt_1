import React, { useState } from 'react';
import './App.css';

export function Lista({ nazwa, zaznaczone }) {
     const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(zaznaczone=1);
  };
  return (
    <div class="check check check_gradient">
        <div class="id_nazwa">
          <h2 >{nazwa}</h2>
          </div>
          <div class="checkbox" >
         <input type='checkbox' checked={checked} onChange={handleChange}></input>
        </div> 
      </div>
  );
}