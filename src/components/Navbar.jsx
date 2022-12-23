import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'
import { BsFillPencilFill } from 'react-icons/bs'
import { login, logout, onUserStateChange } from '../api/firebase'
import User from './User'
import Button from './UI/Button'

export default function Navbar() {
  const [user, setUser] = useState()

  useEffect(() => {
    onUserStateChange((user) => {
      console.log(user)
      setUser(user)
    })
  }, [])

  return (
    <header className="flex justify-between border-b border-gray-300 py-2">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <FiShoppingBag />
        <h1>Shop</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        <Link to="/carts">Carts</Link>
        {user?.isAdmin && (
          <Link to="/products/new" className="text-2xl">
            <BsFillPencilFill />
          </Link>
        )}
        {user && <User user={user} />}
        {user ? <Button onClick={logout}>Logout</Button> : <Button onClick={login}>Login</Button>}
      </nav>
    </header>
  )
}
