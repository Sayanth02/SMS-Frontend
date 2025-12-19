import { Outlet } from 'react-router-dom'
import Sidebar from '../reUsableComponents/SideBar'


const DashboardLayout = ({ userRole }) => {
  const role = localStorage.getItem('role')
  return (
    <div className='flex h-screen bg-light'>
      {/* Sidebar */}
      <Sidebar userRole={role} />

      {/* Main Content */}
      <div className='flex-1 flex flex-col overflow-y-auto'>
        {/* Content Area */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
