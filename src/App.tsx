import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DependentDropdown from './components/DependentDropdown'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <DependentDropdown/>
    </>
  )
}

export default App
