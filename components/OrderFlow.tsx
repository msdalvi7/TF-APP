
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Order, ServicePackage } from '../types';
import { SERVICES } from '../constants';
import { getBriefAssistance } from '../services/geminiService';

interface OrderFlowProps {
  user: User | null;
  onOrderComplete: (order: Order) => void;
}

const OrderFlow: React.FC<OrderFlowProps> = ({ user, onOrderComplete }) => {
  const { serviceId, packageId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [brief, setBrief] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const service = SERVICES.find(s => s.id === serviceId);
  const pkg = service?.packages.find(p => p.id === packageId);

  if (!service || !pkg) return <div>Error: Invalid Selection</div>;

  const handleAiHelp = async () => {
    if (!brief) return;
    setIsAiLoading(true);
    const betterBrief = await getBriefAssistance(brief, service.title);
    setBrief(betterBrief);
    setIsAiLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    
    const newOrder: Order = {
      id: 'ord-' + Math.random().toString(36).substr(2, 9),
      serviceId: service.id,
      clientId: user.id,
      packageId: pkg.id,
      status: 'pending',
      createdAt: new Date().toISOString(),
      brief: brief,
      price: pkg.price,
      deliverables: []
    };
    
    onOrderComplete(newOrder);
    setStep(3); // Success step
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Progress */}
      <div className="flex items-center justify-between mb-12">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              step >= s ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              {s}
            </div>
            <span className={`text-xs font-bold uppercase tracking-widest ${step >= s ? 'text-indigo-600' : 'text-slate-400'}`}>
              {s === 1 ? 'Details' : s === 2 ? 'Payment' : 'Done'}
            </span>
            {s < 3 && <div className="w-12 h-px bg-slate-200 mx-2"></div>}
          </div>
        ))}
      </div>

      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
            <h2 className="text-2xl font-black mb-2">Project Brief</h2>
            <p className="text-slate-500 text-sm mb-6">Help us understand exactly what you need.</p>
            
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  required
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="Example: I need a modern logo for a tech startup called 'Nano'. Colors should be neon blue and white."
                  className="w-full h-40 p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                />
                <button
                  type="button"
                  onClick={handleAiHelp}
                  disabled={isAiLoading || !brief}
                  className="absolute bottom-4 right-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  <i className={`fas ${isAiLoading ? 'fa-spinner fa-spin' : 'fa-wand-sparkles'}`}></i>
                  {isAiLoading ? 'Polishing...' : 'Polish with AI'}
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Reference Files (Optional)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-indigo-300 transition-colors cursor-pointer group">
                   <input type="file" multiple className="hidden" id="file-upload" onChange={(e) => setFiles(Array.from(e.target.files || []))} />
                   <label htmlFor="file-upload" className="cursor-pointer">
                    <i className="fas fa-cloud-arrow-up text-3xl text-slate-300 mb-4 group-hover:text-indigo-400 transition-colors"></i>
                    <p className="text-sm text-slate-500 font-medium">Click to upload brand guidelines, sketches, or docs</p>
                    {files.length > 0 && <p className="mt-2 text-indigo-600 text-xs font-bold">{files.length} files selected</p>}
                   </label>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
            Continue to Secure Checkout
          </button>
        </form>
      )}

      {step === 2 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
             <h2 className="text-2xl font-black mb-6">Order Summary</h2>
             <div className="space-y-4 mb-8">
               <div className="flex justify-between items-center py-4 border-b border-slate-50">
                 <div className="font-bold text-slate-700">{service.title} - {pkg.name}</div>
                 <div className="font-black">${pkg.price}</div>
               </div>
               <div className="flex justify-between items-center py-2 text-slate-500 text-sm">
                 <div>Platform Fee</div>
                 <div>$0.00</div>
               </div>
               <div className="flex justify-between items-center py-4 border-t-2 border-slate-100">
                 <div className="text-xl font-black text-slate-900">Total</div>
                 <div className="text-2xl font-black text-indigo-600">${pkg.price}</div>
               </div>
             </div>

             <div className="space-y-4">
               <label className="block text-sm font-bold text-slate-700 mb-2">Payment Method</label>
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border-2 border-indigo-600 bg-indigo-50 rounded-2xl flex items-center gap-3">
                    <i className="fas fa-credit-card text-indigo-600"></i>
                    <span className="font-bold text-sm">Card / UPI</span>
                  </div>
                  <div className="p-4 border-2 border-slate-100 rounded-2xl flex items-center gap-3 grayscale opacity-60">
                    <i className="fab fa-paypal text-slate-600"></i>
                    <span className="font-bold text-sm">PayPal</span>
                  </div>
               </div>
             </div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setStep(1)} className="flex-1 bg-white border border-slate-200 text-slate-500 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all">
              Back
            </button>
            <button onClick={handleSubmit} className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
              Pay ${pkg.price} Now
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center bg-white p-12 rounded-3xl border border-slate-100 shadow-xl animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-8">
            <i className="fas fa-check"></i>
          </div>
          <h2 className="text-3xl font-black mb-4">Order Confirmed!</h2>
          <p className="text-slate-500 mb-10 max-w-sm mx-auto">
            Your freelancer is already warming up. You can track progress and chat in your dashboard.
          </p>
          <div className="flex flex-col gap-4">
            <button onClick={() => navigate('/dashboard')} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all">
              View Order Dashboard
            </button>
            <button onClick={() => navigate('/')} className="text-indigo-600 font-bold hover:underline">
              Browse More Services
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderFlow;
