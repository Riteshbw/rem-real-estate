import React from 'react';
import { useApp } from '../context/AppContext';
import { Scale, X, ArrowRight } from 'lucide-react';

export const ComparisonDrawer: React.FC = () => {
  const { compareIds, properties, toggleCompare, clearCompare, setActiveTab, activeTab } = useApp();

  if (compareIds.length === 0 || activeTab === 'compare') return null;

  const comparedProperties = properties.filter(p => compareIds.includes(p.id));

  return (
    <div className="fixed bottom-6 inset-x-0 z-40 flex justify-center px-4 pointer-events-none animate-in slide-in-from-bottom-5">
      <div className="bg-slate-950 text-white rounded-2xl shadow-2xl border border-slate-800 py-3 px-5 flex items-center space-x-4 pointer-events-auto max-w-2xl w-full justify-between backdrop-blur-lg bg-opacity-95">
        
        <div className="flex items-center space-x-3 overflow-x-auto scrollbar-none py-1">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shrink-0">
            <Scale className="w-4 h-4" />
          </div>

          <div className="hidden sm:block">
            <span className="text-xs font-bold text-white block">Compare Properties</span>
            <span className="text-[10px] text-slate-400">{compareIds.length} of 3 selected</span>
          </div>

          {/* Mini thumbnails */}
          <div className="flex items-center space-x-2">
            {comparedProperties.map(p => (
              <div key={p.id} className="relative group shrink-0">
                <img src={p.images[0]} alt={p.title} className="w-9 h-9 rounded-lg object-cover border border-slate-700" />
                <button
                  onClick={() => toggleCompare(p.id)}
                  className="absolute -top-1 -right-1 p-0.5 rounded-full bg-rose-600 text-white hover:bg-rose-700"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setActiveTab('compare')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-md shadow-blue-600/30 cursor-pointer"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={clearCompare}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
            title="Clear compare"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
