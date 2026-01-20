
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Service, ServicePackage } from '../types';

interface ServiceDetailsProps {
  services: Service[];
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ services }) => {
  const { id } = useParams<{ id: string }>();
  const service = services.find(s => s.id === id);
  const [selectedPkg, setSelectedPkg] = useState<ServicePackage | null>(service?.packages[0] || null);

  if (!service) return <div className="p-10 text-center">Service not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:flex gap-12">
      <div className="md:w-2/3">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 mb-8 hover:gap-3 transition-all">
          <i className="fas fa-arrow-left"></i> Back to Explore
        </Link>
        
        <div className="mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl mb-6">
            <i className={`fas ${service.icon}`}></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">{service.title}</h1>
          <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
            {service.description} Our top-vetted experts deliver agency-level quality at freelance speeds.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-6">Why work with ThatFreelancer?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Fixed Pricing', desc: 'No hidden fees or surprise upcharges.', icon: 'fa-tag' },
                { title: 'Rapid Turnaround', desc: 'Get your deliverables in record time.', icon: 'fa-clock' },
                { title: 'Quality Guaranteed', desc: 'Unlimited revisions on elite packages.', icon: 'fa-shield-halved' },
                { title: 'Dedicated Support', desc: 'We are here for you 24/7.', icon: 'fa-headset' }
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-100 flex gap-4">
                  <div className="w-10 h-10 shrink-0 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Recent Deliverables</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <img key={i} src={`https://picsum.photos/seed/${service.id}${i}/400/300`} className="rounded-2xl shadow-sm border border-slate-200" alt="Work sample" />
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="md:w-1/3 mt-12 md:mt-0">
        <div className="sticky top-28 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
          <div className="flex bg-slate-50 p-1 border-b border-slate-100">
            {service.packages.map(pkg => (
              <button
                key={pkg.id}
                onClick={() => setSelectedPkg(pkg)}
                className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all ${
                  selectedPkg?.id === pkg.id 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-500 hover:text-indigo-400'
                }`}
              >
                {pkg.name}
              </button>
            ))}
          </div>
          
          <div className="p-8">
            <div className="flex justify-between items-end mb-6">
              <h3 className="text-xl font-bold">{selectedPkg?.name} Package</h3>
              <div className="text-3xl font-black text-slate-900">${selectedPkg?.price}</div>
            </div>
            
            <p className="text-slate-500 text-sm mb-8">
              {selectedPkg?.description}
            </p>

            <ul className="space-y-4 mb-10">
              {selectedPkg?.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <i className="fas fa-check text-indigo-500"></i> {f}
                </li>
              ))}
              <li className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                <i className="far fa-clock text-indigo-500"></i> {selectedPkg?.deliveryTime} Delivery
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                <i className="fas fa-rotate-left text-indigo-500"></i> {selectedPkg?.revisions} Revisions
              </li>
            </ul>

            <Link 
              to={`/order/${service.id}/${selectedPkg?.id}`}
              className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 transition-all hover:scale-[1.02]"
            >
              Select Package
            </Link>
            
            <div className="mt-6 text-center">
               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Safe & Secure Payment</p>
               <div className="flex justify-center gap-4 mt-3 grayscale opacity-40">
                 <i className="fab fa-cc-visa text-2xl"></i>
                 <i className="fab fa-cc-mastercard text-2xl"></i>
                 <i className="fab fa-cc-apple-pay text-2xl"></i>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
