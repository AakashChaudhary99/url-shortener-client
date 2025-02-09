import { useState } from 'react'
import './App.css'
import Hompage from './components/Hompage'
import { useAppContext } from './context/AppContext'

function App() {
  const {setUser} = useAppContext()
  return (
    <div>
      <Hompage />
    </div>
  )
}

export default App
