import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR, formatNumber } from '../utils/formatters';
import {
  X,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Building2,
  CalendarCheck2,
  Banknote
} from 'lucide-react';

const PRESET_AMOUNTS = [50000, 100000, 250000, 500000];

export const InvestModal: React.FC = () => {
  const {
    isInvestModalOpen,
    setIsInvestModalOpen,
    investTargetProperty,
    investInProperty,
    setActiveTab,
    currentUser
  } = useApp();

  const [investAmount, setInvestAmount] = useState<number>(50000);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (investTargetProperty?.investment?.minTicketSize) {
      setInvestAmount(investTargetProperty.investment.minTicketSize);
    } else {
      setInvestAmount(50000);
    }
    setIsSuccess(false);
  }, [investTargetProperty]);

  if (!isInvestModalOpen || !investTargetProperty) return null;

  const inv = investTargetProperty.investment;
  const minTicket = inv?.minTicketSize || 50000;
  const yieldRate = inv?.grossRentalYieldPercentage || 9.2;
  const tenureYears = inv?.tenureYears || 4;

  const monthlyPayout = Math.round((investAmount * (yieldRate / 100)) / 12);
  const exitCapitalGain = Math.round(investAmount * 0.4);
  const ownershipPercentage = ((investAmount / investTargetProperty.pricing.totalPrice) * 100).toFixed(2);

  const handleConfirmInvestment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms || investAmount < minTicket) return;
    investInProperty(investTargetProperty.id, investAmount);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => { setIsInvestModalOpen(false); setIsSuccess(false); }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-100">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            
            <span className="text-[11px] font-bold uppercase text-blue-700 tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Co-Ownership Confirmed
            </span>
            
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-2">
              Welcome to the Property!
            </h3>
            
            <p className="text-xs text-slate-600 max-w-xs mx-auto mt-2 leading-relaxed">
              Congratulations <span className="font-bold text-slate-900">{currentUser.name}</span>, your share of <strong className="text-slate-900">{formatINR(investAmount)}</strong> in <span className="font-bold text-slate-900">{investTargetProperty.title}</span> has been confirmed.
            </p>

            {/* Benefit Summary Card */}
            <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2.5">
              <div className="flex justify-between items-center text-slate-600">
                <span>Monthly Rent to Your Bank:</span>
                <span className="text-sm font-black text-slate-900">₹{formatNumber(monthlyPayout)} / mo</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>First Rent Deposit:</span>
                <span className="font-bold text-slate-800">5th of next month</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Estimated 4-Year Property Gain:</span>
                <span className="font-bold text-blue-700">+{formatINR(exitCapitalGain)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-slate-600">
                <span>Co-Ownership Status:</span>
                <span className="font-extrabold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  ACTIVE CO-OWNER
                </span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setIsInvestModalOpen(false);
                  setIsSuccess(false);
                  setActiveTab('portfolio');
                }}
                className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
              >
                <Briefcase className="w-4 h-4" />
                <span>View in My Portfolio</span>
              </button>

              <button
                onClick={() => {
                  setIsInvestModalOpen(false);
                  setIsSuccess(false);
                }}
                className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleConfirmInvestment} className="space-y-5">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full mb-2">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Property Co-Ownership
                </span>
              </div>
              
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Co-own {investTargetProperty.title}
              </h3>
              
              <p className="text-xs text-slate-500 mt-0.5">
                {investTargetProperty.location.locality}, {investTargetProperty.location.city} • Property Value: <strong className="text-slate-800">{formatINR(investTargetProperty.pricing.totalPrice)}</strong>
              </p>
            </div>

            {/* Simplified Key Highlights */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Rental Yield</span>
                <span className="text-xs font-black text-slate-900 block">{yieldRate}% p.a.</span>
              </div>
              <div className="border-x border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Rent Frequency</span>
                <span className="text-xs font-black text-blue-700 block">Monthly</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Holding Period</span>
                <span className="text-xs font-black text-slate-900 block">{tenureYears} Years</span>
              </div>
            </div>

            {/* Choose How Much You Want to Put In */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700">
                  Choose your contribution:
                </label>
                <span className="text-[11px] font-medium text-slate-500">
                  Minimum: {formatINR(minTicket)}
                </span>
              </div>

              {/* Amount Quick-Pick Chips */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {PRESET_AMOUNTS.map(preset => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setInvestAmount(preset)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                      investAmount === preset
                        ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {formatINR(preset)}
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">₹</span>
                <input
                  type="number"
                  step="10000"
                  min={minTicket}
                  value={investAmount}
                  onChange={(e) => setInvestAmount(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-8 pr-4 py-2 text-sm font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  placeholder="Or enter custom amount"
                />
              </div>
            </div>

            {/* Clean Monthly Return Preview (No green gradient) */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span className="flex items-center space-x-1.5">
                  <Banknote className="w-3.5 h-3.5 text-slate-500" />
                  <span>Estimated Monthly Rent:</span>
                </span>
                <span className="text-sm font-black text-slate-900">
                  ₹{formatNumber(monthlyPayout)} / month
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="flex items-center space-x-1.5">
                  <CalendarCheck2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Rent Schedule:</span>
                </span>
                <span className="font-semibold text-slate-700">Deposited on the 5th of each month</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="flex items-center space-x-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Your Co-Ownership Stake:</span>
                </span>
                <span className="font-bold text-slate-800">{ownershipPercentage}% of this property</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200 font-bold text-slate-900">
                <span>Estimated Value after {tenureYears} Years:</span>
                <span className="font-black text-blue-700 text-sm">{formatINR(investAmount + exitCapitalGain)}</span>
              </div>
            </div>

            {/* Security Assurance */}
            <div className="flex items-center space-x-2 text-[11px] text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Direct co-ownership deed • Rent straight to your bank • 100% transparent</span>
            </div>

            {/* Agreement Checkbox */}
            <label className="flex items-start space-x-2.5 cursor-pointer pt-0.5">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-[11px] text-slate-600 leading-normal">
                I agree to the co-ownership guidelines and monthly rental distribution to my registered bank account.
              </span>
            </label>

            {/* Actions */}
            <div className="flex space-x-3 pt-1">
              <button
                type="button"
                onClick={() => setIsInvestModalOpen(false)}
                className="flex-1 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={!agreedToTerms || investAmount < minTicket}
                className="flex-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Join Co-Owners ({formatINR(investAmount)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};