import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from './pages/Home.js';
import Features from './pages/Features.js';
import CustomerStories from './pages/CustomerStories.js';
import FindExperts from './pages/FindExperts.js';
import ForgotPassword from './pages/authentication/ForgotPassword.js';
import Integrations from './pages/Integrations.js';
import Login from './pages/authentication/Login.js';
import Pricing from './pages/Pricing.js';
import Register from './pages/authentication/Register.js';
import Resources from './pages/Resources.js';
import NotFound from './pages/NotFound.js';
import About from './pages/About.js';
import Contact from './pages/Contact.js';
import Dashboard from './pages/dashboard/Dashboard.js';
import DashboardSummary from './pages/dashboard/DashboardSummary.js';
import Customers from './pages/dashboard/Customers.js';
import Employees from './pages/dashboard/Employees.js';
import Profile from './pages/user/Profile.js';
import Settings from './pages/user/Settings.js';
import TermsAndConditions from './pages/TermsAndConditions.js';
import PrivacyPolicy from './pages/PrivacyPolicy.js';
import PharmacyProducts from './pages/dashboard/products/Products.js';
import Moviments from './pages/dashboard/products/Moviments.js';
import Categories from './pages/dashboard/setup/Categories.js';
import UnitTypes from './pages/dashboard/setup/UnitTypes.js';
import Companies from './pages/dashboard/setup/Companies.js';
import PharmacyOrders from './pages/dashboard/orders/PharmacyOrders.js';
import NonPharmacyOrders from './pages/dashboard/orders/NonPharmacyOrders.js';
import PurchaseNonPharmacyProducts from './pages/dashboard/purchase/PurchaseNonPharmacyProducts.js';
import PurchasePharmacyProducts from './pages/dashboard/purchase/PurchasePharmacyProducts.js';
import NonPharmacyItems from './pages/dashboard/requestedItems/NonPharmacyItems.js';
import PharmacyItems from './pages/dashboard/requestedItems/PharmacyItems.js';
import CustomersReturns from './pages/dashboard/returns/CustomersReturns.js';
import ExpiresOrDamagesReturns from './pages/dashboard/returns/ExpiresOrDamagesReturns.js';
import SuppliersList from './pages/dashboard/Suppliers/SuppliersList.js';
import SuppliersDocuments from './pages/dashboard/Suppliers/SuppliersDocuments.js';
import SuppliersPayments from './pages/dashboard/Suppliers/SuppliersPayments.js';
import { useEffect, useState } from 'react';
import { roles } from './constants/roles.js';

function App() {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const [oldUser, setOldUser] = useState(null);

  useEffect(() => {
    setOldUser(JSON.parse(localStorage.getItem('user')));
    // if(userRole.role === roles.INITIAL) navigate('/dashboard')
  }, []);

  useEffect(() => {
    if (userRole) {
      console.log(userRole);
      if (userRole.role === roles.INITIAL) navigate('/dashboard');
    }
  }, [userRole, navigate]);

  return (
    <div className="App">
      <Routes>
        {!userRole && !oldUser && 
          <>
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Login popo={'kdioksidj'} setUserRole={setUserRole} />} />
          </>
        }
        {/* <Route path="home" element={<Home />} /> */}
        {(userRole || oldUser) && 
          <>
            <Route path="features" element={<Features />} />
            <Route path="customer-stories" element={<CustomerStories />} />
            <Route path="find-experts" element={<FindExperts />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="register" element={<Register />} />
            <Route path="integration" element={<Integrations />} />
            <Route path="/" element={<Login />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="resources" element={<Resources />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<DashboardSummary />} />
              <Route path='products/pharmacy' element={<PharmacyProducts />} />
              <Route path='products/non-pharmacy' element={<Moviments />} />
              <Route path='requested-items/pharmacy' element={<PharmacyItems />} />
              <Route path='requested-items/non-pharmacy' element={<NonPharmacyItems />} />
              <Route path='orders/pharmacy' element={<PharmacyOrders />} />
              <Route path='orders/non-pharmacy' element={<NonPharmacyOrders />} />
              <Route path='purchases/pharmacy' element={<PurchasePharmacyProducts />} />
              <Route path='purchases/non-pharmacy' element={<PurchaseNonPharmacyProducts />} />
              <Route path='setup/categories' element={<Categories />} />
              <Route path='setup/unit-types' element={<UnitTypes />} />
              <Route path='setup/companies' element={<Companies />} />
              <Route path='returns/customers' element={<CustomersReturns />} />
              <Route path='returns/expires-or-damages' element={<ExpiresOrDamagesReturns />} />
              <Route path='employees' element={<Employees />} />
              <Route path='customers' element={<Customers />} />
              <Route path='suppliers/lists' element={<SuppliersList />} />
              <Route path='suppliers/payments' element={<SuppliersPayments />} />
              <Route path='suppliers/documents' element={<SuppliersDocuments />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </>
        }
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
