
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full glass-effect border-b border-slate-200 px-4 md:px-8 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl group-hover:rotate-6 transition-transform">
          T
        </div>
        <span className="text-xl font-extrabold tracking-tight text-slate-900">
          That<span className="text-indigo-600">Freelancer</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Explore</Link>
        {user?.role === 'admin' ? (
          <Link to="/admin" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Admin Panel</Link>
        ) : (
          <Link to="/dashboard" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">My Orders</Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-slate-900">{user.name}</div>
              <div className="text-xs text-slate-500 capitalize">{user.role}</div>
            </div>
            <button 
              onClick={() => { onLogout(); navigate('/'); }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link to="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-indigo-200">
            Get Started
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
