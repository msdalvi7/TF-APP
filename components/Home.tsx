
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Service } from '../types';

interface HomeProps {
  services: Service[];
}

const Home: React.FC<HomeProps> = ({ services }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Design', 'Content', 'Social', 'Management'];

  const filteredServices = filter === 'All' 
    ? services 
    : services.filter(s => s.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16 space-y-6">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight">
          Elite services, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">delivered fast.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          The Zomato for freelancing. Order creative services in 2 minutes. 
          No bidding. No complex interviews. Just quality work.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-bold border border-green-100">
            <i className="fas fa-bolt"></i> 24h Delivery Available
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold border border-blue-100">
            <i className="fas fa-check-circle"></i> Vetted Creators
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              filter === cat 
                ? 'bg-slate-900 text-white shadow-lg' 
                : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <Link 
            key={service.id} 
            to={`/service/${service.id}`}
            className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
              <i className={`fas ${service.icon} text-2xl text-indigo-600 group-hover:text-white transition-colors`}></i>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{service.title}</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-2">
              {service.description}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Starts at</span>
                <div className="text-2xl font-black text-indigo-600">${service.startingPrice}</div>
              </div>
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Trust Elements */}
      <div className="mt-24 py-12 border-t border-slate-200 text-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Trusted by 500+ teams</p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale">
            <span className="text-3xl font-black">STARTUP.IO</span>
            <span className="text-3xl font-black italic">FLASH</span>
            <span className="text-3xl font-black tracking-tighter">CREATIVE</span>
            <span className="text-3xl font-black">SOLO</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
