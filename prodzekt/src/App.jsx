import { useState, useEffect } from 'react'
import { LISTA_DATA } from './data/local_data';
import { Lista } from './assets/Lista';
import './assets/App.css'

const API = '/api.php';

function App() {
  const [lista, setLista] = useState([]);
  const [logi, setLogi] = useState([]);
  const [wykres, setWykres] = useState([]);

  useEffect(() => {
    // ogułem to tutaj pobiera liste (czasem bede komentowac wlasnorecznie bo juz troche mnie meczy ten kod)
    fetch(`${API}?action=lista`)
      .then(r => r.json())
      .then(data => setLista(data.length > 0 ? data : LISTA_DATA))
      .catch(() => setLista(LISTA_DATA));

    // a tu logi
    fetch(`${API}?action=logi`)
      .then(r => r.json())
      .then(setLogi)
      .catch(() => {});

    // a tu wykres
    fetch(`${API}?action=wykres`)
      .then(r => r.json())
      .then(setWykres)
      .catch(() => {});
  }, []);

  const handleCzysc = async () => {
    lista.forEach(item => localStorage.setItem(`checkbox_${item.nazwa}`, '0'));
    try {
      await Promise.all(lista.map(item =>
        fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: item.id, nazwa: item.nazwa, zaznaczone: 0 }),
        })
      ));
    } catch (e) {}
    window.location.reload();
  };

  // licznik
  const dzisiaj = new Date().toISOString().split('T')[0];
  const dzisDzien = logi.filter(l => l.data_czas?.startsWith(dzisiaj)).length;
  
  // wykres
  const ostatnie7 = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const klucz = d.toISOString().split('T')[0];
    const znaleziony = wykres.find(w => w.dzien === klucz);
    ostatnie7.push({
      dzien: d.toLocaleDateString('pl-PL', { weekday: 'short' }),
      ile: znaleziony ? parseInt(znaleziony.ile) : 0,
    });
  }
  const maxIle = Math.max(...ostatnie7.map(d => d.ile), 1);

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

      {/* statystki */}
      <section className="statystyki">
        <h2>Statystyki</h2>

        <div className="stat-box">
          <p>Dziś zaznaczono</p>
          <strong>{dzisDzien} / {lista.length}</strong>
        </div>

        <div className="wykres">
          <h3>Ostatnie 7 dni</h3>
          <div className="slupki">
            {ostatnie7.map((d, i) => (
              <div key={i} className="slupek">
                <div
                  className="slupek-bar"
                  style={{ height: `${(d.ile / maxIle) * 100}%` }}
                />
                <span>{d.ile}</span>
                <span className="slupek-dzien">{d.dzien}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="logi-tabela">
          <h3>Historia</h3>
          <table>
            <thead>
              <tr><th>Zadanie</th><th>Kiedy</th></tr>
            </thead>
            <tbody>
              {logi.map((l, i) => (
                <tr key={i}>
                  <td>{l.nazwa}</td>
                  <td>{new Date(l.data_czas).toLocaleString('pl-PL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default App