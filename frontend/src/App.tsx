

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from '@/components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'

function App() {


  return (
    <>
      <Navbar />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App
