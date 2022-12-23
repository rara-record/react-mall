import { createContext, useContext, useEffect, useState } from 'react'
import { onUserStateChange, logout, login } from '../api/firebase'

const AuthContext = createContext(null)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    onUserStateChange((user) => {
      console.log(user)
      setUser(user)
    })
  }, [])

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
