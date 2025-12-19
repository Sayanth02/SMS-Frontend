import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ allowedRoles }) => {

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  const role = localStorage.getItem('role')
  console.log(role,isAuthenticated);
  

  if (!isAuthenticated) {
    return <Navigate to='/' />
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to='/access-denied' />
  }

  return <Outlet />
}
export default ProtectedRoute
