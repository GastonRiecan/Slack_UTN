import { useAuthContext } from '../../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

//Nos llama a la ruta hija o nesteada de nuestra ruta
const ProtectedRoute = () => {
    const {isAuthenticatedUser} = useAuthContext()
  return (
    isAuthenticatedUser ? <Outlet /> : <Navigate to={'/login'} />
  )
}

export default ProtectedRoute