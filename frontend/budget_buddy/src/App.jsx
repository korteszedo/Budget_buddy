import './App.css'
import './pages/kezdolap/kezdolap.css'
import { useState } from 'react'
import { Kezdolap } from './pages/kezdolap/Kezdolap'
import { Fooldal } from './pages/fooldal/Fooldal'

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
      {loggedIn ? (
        <Fooldal />
      ) : (
        <Kezdolap setLoggedIn={setLoggedIn} />
      )}
    </>
  )
}

export default App
