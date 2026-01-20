
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Order } from '../types';
import { SERVICES } from '../constants';

const mockChartData = [
  { name: 'Mon', revenue: 450, orders: 12 },
  { name: 'Tue', revenue: 600, orders: 15 },
  { name: 'Wed', revenue: 300, orders: 8 },
  { name: 'Thu', revenue: 900, orders: 20 },
  { name: 'Fri', revenue: 1200, orders: 25 },
  { name: 'Sat', revenue: 500, orders: 10 },
  { name: 'Sun', revenue: 400, orders: 9 },
];

const AdminDashboard: React.FC<{ orders: Order[] }> = ({ orders }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-8">Admin Operations</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Revenue', value: '$12,450', icon: 'fa-dollar-sign', color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Active Orders', value: orders.filter(o => o.status !== 'completed').length, icon: 'fa-spinner', color: 'bg-blue-50 text-blue-600' },
          { label: 'Retention Rate', value: '78%', icon: 'fa-users', color: 'bg-purple-50 text-purple-600' },
          { label: 'Avg Delivery', value: '2.4 Days', icon: 'fa-truck-fast', color: 'bg-orange-50 text-orange-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</div>
            <div className="text-2xl font-black">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-96">
          <h3 className="text-lg font-bold mb-6">Weekly Revenue Growth</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
              <Bar dataKey="revenue" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-96">
          <h3 className="text-lg font-bold mb-6">Service Distribution</h3>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
              <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={4} dot={{ r: 6, fill: '#8b5cf6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold">Manage Active Orders</h3>
          <div className="relative">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input type="text" placeholder="Search order ID..." className="pl-12 pr-6 py-2 rounded-full bg-slate-50 border border-slate-100 text-sm focus:outline-none" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">Order ID</th>
                <th className="px-8 py-4">Client</th>
                <th className="px-8 py-4">Service</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Amount</th>
                <th className="px-8 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-6 font-mono text-sm">#{o.id.toUpperCase()}</td>
                  <td className="px-8 py-6 font-medium">Alex Rivera</td>
                  <td className="px-8 py-6">{SERVICES.find(s => s.id === o.serviceId)?.title}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">{o.status}</span>
                  </td>
                  <td className="px-8 py-6 font-bold text-slate-900">${o.price}</td>
                  <td className="px-8 py-6">
                    <button className="text-indigo-600 font-bold hover:underline">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
