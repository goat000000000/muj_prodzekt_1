import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


function App() {

  return (
    <>
    
    <nav>
      <h1>Check-Lista dnia</h1>
    </nav>
    <main>
      <div class="check">
        <div class="id_nazwa">
          <h2 >tu_bedzie_id</h2>
          </div>
          <div class="checkbox " >
         <input type='checkbox'></input>
        </div> 
      </div>
      <div class="check check check_gradient">
        <div class="id_nazwa">
          <h2 >tu_bedzie_id</h2>
          </div>
          <div class="checkbox" >
         <input type='checkbox'></input>
        </div> 
      </div>
      <div class="check check_gradient">
        <div class="id_nazwa">
          <h2 >tu_bedzie_id</h2>
          </div>
          <div class="checkbox" >
         <input type='checkbox'></input>
        </div> 
      </div>
    </main>
    </>
  )
}

export default App
