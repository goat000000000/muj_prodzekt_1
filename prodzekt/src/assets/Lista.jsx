import React, { useState } from 'react';
import './App.css';

export function Lista({ nazwa, zaznaczone }) {
  const [checked, setChecked] = React.useState(zaznaczone);

  const handleChange = () => {
    setChecked(!checked);
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
