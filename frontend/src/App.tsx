

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from '@/components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { logOut, setUser } from './features/authentication/authenticationSlice'
import { useEffect } from 'react'
import PrivateRoute from './PrivateRoute'
import Dashboard from './pages/Dashboard'

function App() {

  const dispatch = useAppDispatch()

  const token =useAppSelector((state)=>state.auth.token)

  const verifyUser =async (token:string)=>{
    try{
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_API}/auth/verify-user`,{
        headers:{
          'Authorization':`Bearer ${token}`,
          'Content-Type':"application/json"
        }
      })
      const data = await response.json()
      if(!response.ok){
        throw new Error(data.detail || 'Server Error')
      }

      dispatch(setUser(data.user))

    }catch(err){
      console.error(err)
      dispatch(logOut())
    }
  }

  useEffect(()=>{
    if(!token){
      dispatch(logOut())
      return;
    }
    verifyUser(token)
},[token])

  return (
    <>
      <Navbar />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>

        <Route element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
