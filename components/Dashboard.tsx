
import React from 'react';
import { Link } from 'react-router-dom';
import { Order, User } from '../types';
import { SERVICES } from '../constants';

interface DashboardProps {
  orders: Order[];
  user: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ orders, user }) => {
  if (!user) return <div className="p-20 text-center"><Link to="/login" className="text-indigo-600 font-bold text-xl">Please login to view dashboard</Link></div>;

  const clientOrders = orders.filter(o => o.clientId === user.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">My Orders</h1>
          <p className="text-slate-500">Track and manage your active project flows.</p>
        </div>
        <div className="hidden md:block text-right">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Spent</div>
          <div className="text-2xl font-black text-slate-900">${clientOrders.reduce((acc, curr) => acc + curr.price, 0)}</div>
        </div>
      </header>

      {clientOrders.length === 0 ? (
        <div className="bg-white p-20 rounded-3xl border border-dashed border-slate-200 text-center">
          <i className="fas fa-box-open text-6xl text-slate-100 mb-6"></i>
          <h3 className="text-xl font-bold text-slate-400 mb-6">No orders yet</h3>
          <Link to="/" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
            Browse Services
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {clientOrders.map(order => {
            const service = SERVICES.find(s => s.id === order.serviceId);
            const statusColor = {
              'pending': 'bg-amber-50 text-amber-600 border-amber-100',
              'in-progress': 'bg-blue-50 text-blue-600 border-blue-100',
              'delivered': 'bg-green-50 text-green-600 border-green-100',
              'revision': 'bg-purple-50 text-purple-600 border-purple-100',
              'completed': 'bg-slate-100 text-slate-600 border-slate-200'
            }[order.status];

            return (
              <div key={order.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center gap-8 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                  <i className={`fas ${service?.icon} text-2xl`}></i>
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-black text-slate-900">{service?.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusColor}`}>
                      {order.status.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-1 max-w-md">
                    {order.brief}
                  </p>
                </div>

                <div className="flex items-center gap-8 md:px-8 md:border-l md:border-slate-50">
                   <div>
                     <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Price</div>
                     <div className="font-bold text-slate-900">${order.price}</div>
                   </div>
                   <div>
                     <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Placed</div>
                     <div className="font-bold text-slate-900">{new Date(order.createdAt).toLocaleDateString()}</div>
                   </div>
                </div>

                <div className="flex gap-2">
                   <Link to={`/chat/${order.id}`} className="flex-1 md:flex-none text-center bg-slate-50 text-slate-600 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all text-sm">
                     Message
                   </Link>
                   {order.status === 'delivered' && (
                     <button className="flex-1 md:flex-none text-center bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all text-sm">
                       Approve
                     </button>
                   )}
                   {order.status === 'pending' && (
                     <button className="flex-1 md:flex-none text-center bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all text-sm">
                       Edit Brief
                     </button>
                   )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
