import { Navigate } from 'react-router-dom'
import AdminLanding from '../adminComponents/AdminLanding'
import StaffLanding from '../staffComponents/StaffLanding'
import LibrarianLanding from '../libraryComponents/LibrarianLanding'



const RoleBasedLandingPage = () => {
  const userRole = localStorage.getItem('role') 
  switch (userRole) {
    case 'Admin':
      return <AdminLanding />
    case 'OfficeStaff':
      return <StaffLanding />
    case 'Librarian':
      return <LibrarianLanding />
    default:
      return <Navigate to='/access-denied' />
  }
}

export default RoleBasedLandingPage
