import { useEffect, useRef, useState } from 'react'
import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client'

import { Toast } from 'primereact/toast'
import './App.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css' // theme
import 'primereact/resources/primereact.min.css' // core css
import 'primeicons/primeicons.css' // icons

import logo from './assets/oura.jpg'
import Login from './Components/Login'
import { FIND_USER } from './Components/QrsMut.jsx'

// const JWT_SECRET = import.meta.env.VITE_JWT_SECRET

const App = () => {
  const [findUser, fuSt] = useLazyQuery(FIND_USER)
  const [state, setState] = useState({
    cuenta: '',
    pass: '',
    showLogin: false,
    entro: false
  })
  const toast = useRef(null)

  const showLogin = () => {
    setState((ps) => {
      return { ...ps, showLogin: true, entro: false, token: '' }
    })
  }

  const logOut = () => {
    setState((ps) => {
      return { ...ps, showLogin: false, entro: false, token: '' }
    })
  }

  return (
    <div className='bg'>
      <Toast ref={toast} />
      <div className='App'>
        {!state.entro
          ? (
            <>
              <h1>Oura Movies</h1>
              <img src={logo} alt='Logo' />
              <div className='card'>
                <p>Películas y más</p>
              </div>
              <p onClick={showLogin} className='read-the-docs'>
                Login
              </p>
            </>
            )
          : (
            <p onClick={logOut} className='read-the-docs'>
              Logout
            </p>
            )}

        {state.showLogin && (
          <Login
            state={state}
            setState={setState}
            toast={toast}
            findUser={findUser}
            fuSt={fuSt}
          />
        )}
      </div>
    </div>
  )
}
export default App
