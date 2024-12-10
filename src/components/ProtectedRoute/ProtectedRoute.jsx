import { useAuthContext } from '../../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const {isAuthenticatedUser} = useAuthContext()
  return (
    isAuthenticatedUser ? <Outlet /> : <Navigate to={'/login'} />
  )
}

export default ProtectedRoute