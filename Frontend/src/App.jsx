import { useState } from 'react'
import Login from './Pages/login/login'
import './App.css'
import Signup from './Pages/signup/signup'
import Home from './Pages/home/home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='p-4 h-screen flex items-center justify-center '>
       <Home />
    </div>
    </>
  )
}

export default App
