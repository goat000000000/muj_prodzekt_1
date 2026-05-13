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
        <h2>tu_bedzie_id</h2>
        <input class="checkbox" type='checkbox'></input>
      </div>
      <div class="check check_gradient">
        <h2>tu_bedzie_id</h2>
        <input class="checkbox" type='checkbox'></input>
      </div>
      <div class="check check_gradient">
        <h2>tu_bedzie_id</h2>
        <input class="checkbox" type='checkbox'></input>
      </div>
    </main>
    </>
  )
}

export default App
