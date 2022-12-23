import { Link } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'
import { BsFillPencilFill } from 'react-icons/bs'
import User from './User'
import Button from './UI/Button'
import { useAuthContext } from '../context/AuthContext'

export default function Navbar() {
  const { user, login, logout } = useAuthContext()

  return (
    <header className="flex justify-between border-b border-gray-300 py-2">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <FiShoppingBag />
        <h1>Shop</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        {user && <Link to="/carts">Carts</Link>}
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
