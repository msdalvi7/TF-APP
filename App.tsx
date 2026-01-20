
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Service, Order } from './types';
import { SERVICES, MOCK_USER, MOCK_ORDERS } from './constants';
import Header from './components/Header';
import Home from './components/Home';
import ServiceDetails from './components/ServiceDetails';
import OrderFlow from './components/OrderFlow';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import Chat from './components/Chat';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(MOCK_USER); // Default to mock user for demo
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const handleAddOrder = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
  };

  const handleLogin = (role: 'client' | 'admin') => {
    setUser({
      ...MOCK_USER,
      role: role
    });
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen pb-20 md:pb-0">
        <Header user={user} onLogout={() => setUser(null)} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home services={SERVICES} />} />
            <Route path="/service/:id" element={<ServiceDetails services={SERVICES} />} />
            <Route path="/order/:serviceId/:packageId" element={<OrderFlow user={user} onOrderComplete={handleAddOrder} />} />
            <Route path="/dashboard" element={<Dashboard orders={orders} user={user} />} />
            <Route path="/admin" element={<AdminDashboard orders={orders} />} />
            <Route path="/chat/:orderId" element={<Chat />} />
            <Route path="/login" element={
               <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
                  <h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>
                  <div className="space-y-4">
                    <button onClick={() => handleLogin('client')} className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                      <i className="fab fa-google text-red-500"></i> Continue with Google
                    </button>
                    <button onClick={() => handleLogin('client')} className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-colors font-medium">
                      Login as Client (Demo)
                    </button>
                    <button onClick={() => handleLogin('admin')} className="w-full flex items-center justify-center gap-3 bg-slate-800 text-white p-3 rounded-xl hover:bg-slate-900 transition-colors font-medium">
                      Login as Admin (Demo)
                    </button>
                  </div>
               </div>
            } />
          </Routes>
        </main>

        {/* Mobile Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 md:hidden flex justify-around py-3 glass-effect z-50">
          <Link to="/" className="flex flex-col items-center text-slate-500 hover:text-indigo-600">
            <i className="fas fa-home text-xl"></i>
            <span className="text-[10px] mt-1 font-medium">Home</span>
          </Link>
          <Link to="/dashboard" className="flex flex-col items-center text-slate-500 hover:text-indigo-600">
            <i className="fas fa-box text-xl"></i>
            <span className="text-[10px] mt-1 font-medium">Orders</span>
          </Link>
          <Link to="/login" className="flex flex-col items-center text-slate-500 hover:text-indigo-600">
            <i className="fas fa-user text-xl"></i>
            <span className="text-[10px] mt-1 font-medium">Profile</span>
          </Link>
        </nav>
      </div>
    </Router>
  );
};

export default App;
