import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { LISTA_DATA } from './data/local_data';
import { Lista } from './assets/Lista';
import './assets/App.css'



function App() {

  return (
    <>
    
    <nav>
      <h1>Check-Lista dnia</h1>
      
    </nav>
    <main>
      <div className="grid">
        { LISTA_DATA.map(item => (
            <Lista
              key={item.id}
              nazwa={item.nazwa}
            />
          ))
        }
      </div>

      <div class="check check_gradient">
      </div>
    </main>
    </>
  )
}

export default App
