import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import UpdateStudentPage from './pages/studentPages/UpdateStudentPage'
import UserManagement from './pages/adminPages/UserManagement'
import StudentManagementPage from './pages/studentPages/StudentManagementPage'
import UpdateAccount from './pages/adminPages/UpdateAccount'
import CreateAccount from './pages/adminPages/CreateAccount'
import CreateStudentPage from './pages/studentPages/CreateStudentPage'
import DashboardLayout from './components/layout/DashBoardLayout'
import ProtectedRoute from './components/routes/ProtuctedRoutes'
import AccessDeniedPage from './components/routes/AccessDeniedPage'
import NotFoundPage from './components/routes/NotFoundPage'
import RoleBasedLandingPage from './components/routes/RoleBasedLandigPage'
import AddFee from './pages/feesPages/AddFee'
import FeeManagement from './pages/feesPages/FeeManagement'
import UpdateFee from './pages/feesPages/UpdateFee'
import LibraryManagement from './pages/libraryPages.jsx/LibraryManagement'
import AddLibraryHistory from './pages/libraryPages.jsx/AddLibraryHistory'
import UpdateLibraryHistory from './pages/libraryPages.jsx/UpdateLibraryHistory'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify'

function App () {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<RoleBasedLandingPage />} />
          {/* Admin protected routes */}
          <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/createUser" element={<CreateAccount />} />
            <Route path="/updateUser/:userId" element={<UpdateAccount />} />
          </Route>
          {/* staff protected routes */}
          <Route
            element={<ProtectedRoute allowedRoles={["Admin", "OfficeStaff"]} />}
          >
            <Route path="/createStudent" element={<CreateStudentPage />} />
            <Route path="/updateStudent/:id" element={<UpdateStudentPage />} />
            <Route path="/addFees" element={<AddFee />} />
            <Route path="/editFees/:feeId" element={<UpdateFee />} />
          </Route>
          {/* Librarian protected routes */}
          <Route
            element={<ProtectedRoute allowedRoles={["Admin", "Librarian"]} />}
          >
            <Route path="/addLibrary" element={<AddLibraryHistory />} />
            <Route
              path="/updateLibrary/:id"
              element={<UpdateLibraryHistory />}
            />
          </Route>
          {/* common routes */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["Admin", "OfficeStaff", "Librarian"]}
              />
            }
          >
            <Route
              path="/student-management"
              element={<StudentManagementPage />}
            />
            <Route path="/fees-management" element={<FeeManagement />} />
            <Route path="/library-management" element={<LibraryManagement />} />
          </Route>
          {/* Fallback Routes */}
          <Route path="/access-denied" element={<AccessDeniedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App
