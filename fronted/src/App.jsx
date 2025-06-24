import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./Pages/LoginPage"
import PageNotFound from './Pages/PageNotFound';
import ProtectedRoute from './Components/ProtectRoute';

//Admin pages
import Dashboard from './Pages/admin/Dashboard';
import DashboardLayout from './Pages/admin/DashboardLayout';
import Custumer from './Pages/admin/Custumer';
import Reports from './Pages/admin/Reports';
import Settings from './Pages/admin/Setting';
import NewEmployee from './Pages/admin/NewEmployee';
import AddCustumer from './Pages/admin/AddCustumer';
import CusDetails from './Pages/admin/CusDetails';

//Customer pages
import CusDashboard from './Pages/customer/Dashboard';

// Cashier pages
import CashierDashboard from './Pages/cashier/CashierDashboard';

//Manager pages
import ManagerDashboard from './Pages/manager/ManagerDashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="custumers" element={<Custumer />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="emply" element={<NewEmployee />} />
          <Route path="add-custumer" element={<AddCustumer />} />
          <Route path='cus-details/:id' element={<CusDetails />} />
        </Route>

        {/* manager routes */}
        <Route path="/manager" element={<ManagerDashboard />} />

        {/* Customer Dashboard */}
        <Route path="/customer-dashboard" element={
          <CusDashboard />
        }
        />
        {/* Cashier Dashboard */}
        <Route path="/cashier-dashboard" element={<ProtectedRoute allowedRoles={['cashier']}><CashierDashboard /> </ProtectedRoute>} />
      </Routes>
    </Router >
  )
}

export default App
