import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'

export let userContext = createContext()

export default function UserContextProvider({ children }) {
  const [userLogin, setUserLogin] = useState(null)

  useEffect(() => {
    let userToken = localStorage.getItem('userToken');
    if (userToken != null) {
      setUserLogin(jwtDecode(userToken))
    }
  }, [])

  return (<userContext.Provider value={{ userLogin, setUserLogin }} >
    {children}
  </userContext.Provider>

  )
}
