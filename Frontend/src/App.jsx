import { useState } from 'react'
import Login from './Pages/login/login'
import './App.css'
import Signup from './Pages/signup/signup'
import Home from './Pages/home/home'
import {Navigate,Route,Routes} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/authContext'

function App() {
  const [count, setCount] = useState(0)
  const {authUser}= useAuthContext();

  return (
    <>
    <div className='p-4 h-screen flex items-center justify-center '>
      <Routes>
        <Route path='/' element ={authUser ? <Home /> : <Navigate to ={"/login"} />} />
        <Route path='/login' element ={authUser ? <Navigate to ="/" /> :<Login />} />
        <Route path='/signup' element ={authUser ? <Navigate to ="/" /> : <Signup />} />
      </Routes>
      <Toaster />
    </div>
    </>
  )
}

export default App
