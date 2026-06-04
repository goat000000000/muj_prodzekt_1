import React, { useState } from 'react';
import './App.css';

const API = '/api.php';

export function Lista({ id, nazwa, zaznaczone }) {
  const storageKey = `checkbox_${nazwa}`;

  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) return Number(saved) === 1;
    return zaznaczone === 1;
  });

  const handleChange = async () => {
    const newValue = !checked;
    setChecked(newValue);
    localStorage.setItem(storageKey, newValue ? '1' : '0');

    try {
      await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, nazwa, zaznaczone: newValue ? 1 : 0 }),
      });
    } catch (e) {
    }
  };

  return (
    <div className="check check_gradient">
      <div className="id_nazwa">
        <h2>{nazwa}</h2>
      </div>
      <div className="checkbox">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}