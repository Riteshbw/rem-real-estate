import React from 'react';
import { useApp } from '../context/AppContext';
import { ComparisonMatrix } from './ComparisonMatrix';
import { X } from 'lucide-react';

export const ComparisonMatrixModal: React.FC = () => {
  const { isCompareModalOpen, setIsCompareModalOpen } = useApp();

  if (!isCompareModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-slate-50 rounded-3xl shadow-2xl overflow-hidden my-6 border border-slate-200 flex flex-col max-h-[92vh]">
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-white/95 shrink-0">
          <span className="text-xs font-bold text-slate-500">Side-by-Side Property Matrix</span>
          <button
            onClick={() => setIsCompareModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-6">
          <ComparisonMatrix />
        </div>
      </div>
    </div>
  );
};
