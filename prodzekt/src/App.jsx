import { useState, useEffect } from 'react'
import { LISTA_DATA } from './data/local_data';
import { Lista } from './assets/Lista';
import './assets/App.css'

const API = '/api.php';

function App() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(data => {
        setLista(data.length > 0 ? data : LISTA_DATA);
      })
      .catch(() => {
        setLista(LISTA_DATA);
      });
  }, []);

  const handleCzysc = async () => {
    lista.forEach(item => {
      localStorage.setItem(`checkbox_${item.nazwa}`, '0');
    });

    try {
      await Promise.all(lista.map(item =>
        fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: item.id, nazwa: item.nazwa, zaznaczone: 0 }),
        })
      ));
    } catch (e) { }

    window.location.reload();
  };

  return (
    <>
      <nav>
        <h1>Check-Lista dnia</h1>
      </nav>
      <main>
        <div className="grid">
          {lista.map(item => (
            <Lista
              key={item.id}
              id={item.id}
              nazwa={item.nazwa}
              zaznaczone={item.zaznaczone}
            />
          ))}
        </div>
      </main>
      <div className="blokzprzyciskiem">
        <button className="czysc" onClick={handleCzysc}>Odznacz</button>
      </div>
    </>
  );
}

export default App