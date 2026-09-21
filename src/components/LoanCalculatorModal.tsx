import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR, formatNumber, calculateEMI } from '../utils/formatters';
import { 
  X, 
  Calculator, 
  DollarSign, 
  PieChart, 
  CheckCircle2, 
  Info,
  Calendar,
  Percent
} from 'lucide-react';

export const LoanCalculatorModal: React.FC = () => {
  const { isLoanCalcModalOpen, setIsLoanCalcModalOpen } = useApp();

  const [propertyPrice, setPropertyPrice] = useState<number>(15000000); // 1.5 Cr
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20); // 20%
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years

  if (!isLoanCalcModalOpen) return null;

  const downPaymentAmount = Math.round((propertyPrice * downPaymentPct) / 100);
  const loanPrincipal = propertyPrice - downPaymentAmount;
  const monthlyEmi = calculateEMI(loanPrincipal, interestRate, tenureYears);
  const totalPayment = monthlyEmi * tenureYears * 12;
  const totalInterest = totalPayment - loanPrincipal;
  const principalPct = Math.round((loanPrincipal / totalPayment) * 100);
  const interestPct = 100 - principalPct;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsLoanCalcModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Home Loan & EMI Calculator</h3>
            <p className="text-xs text-slate-500">Calculate monthly installments, total interest, and loan affordability</p>
          </div>
        </div>

        {/* KPI Output Highlight */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Estimated Monthly EMI</span>
            <div className="text-3xl font-black text-emerald-400 mt-0.5">
              ₹{formatNumber(monthlyEmi)} <span className="text-xs text-slate-400 font-normal">/ month</span>
            </div>
          </div>
          <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
            <span className="text-xs text-slate-400 block">Total Interest Payable</span>
            <span className="text-lg font-bold text-amber-400">{formatINR(totalInterest)}</span>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="space-y-5">
          
          {/* Property Price */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
              <span>Property Price</span>
              <span className="text-sm font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                {formatINR(propertyPrice)}
              </span>
            </div>
            <input
              type="range"
              min={2500000}
              max={60000000}
              step={500000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
              <span>₹25 Lakhs</span>
              <span>₹3.0 Cr</span>
              <span>₹6.0 Cr</span>
            </div>
          </div>

          {/* Down Payment % */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
              <span>Down Payment ({downPaymentPct}%)</span>
              <span className="text-sm font-black text-slate-900">
                {formatINR(downPaymentAmount)} (Loan: {formatINR(loanPrincipal)})
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
              <span>10% (Min)</span>
              <span>20% (Standard)</span>
              <span>50%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Interest Rate */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>Interest Rate (% p.a.)</span>
                <span className="text-sm font-black text-indigo-700">{interestRate}%</span>
              </div>
              <input
                type="range"
                min={7.5}
                max={12.0}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                <span>7.5% (Prime)</span>
                <span>12.0%</span>
              </div>
            </div>

            {/* Tenure */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>Loan Tenure (Years)</span>
                <span className="text-sm font-black text-amber-700">{tenureYears} Years</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                <span>5 Years</span>
                <span>20 Years</span>
                <span>30 Years</span>
              </div>
            </div>

          </div>

        </div>

        {/* Payment Breakup Visual Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-700 mb-2 flex justify-between">
            <span>Payment Breakdown</span>
            <span>Total: {formatINR(totalPayment)}</span>
          </div>

          <div className="w-full h-3.5 rounded-full overflow-hidden flex bg-slate-100">
            <div 
              style={{ width: `${principalPct}%` }}
              className="bg-blue-600 h-full"
              title={`Principal: ${principalPct}%`}
            />
            <div 
              style={{ width: `${interestPct}%` }}
              className="bg-amber-500 h-full"
              title={`Total Interest: ${interestPct}%`}
            />
          </div>

          <div className="flex items-center justify-between text-xs mt-2 text-slate-600">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              <span>Principal: <strong>{formatINR(loanPrincipal)}</strong> ({principalPct}%)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span>Interest: <strong>{formatINR(totalInterest)}</strong> ({interestPct}%)</span>
            </div>
          </div>
        </div>

        {/* Footer info & Done button */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Pre-approved loans at 8.35% available with HDFC, SBI & ICICI Bank
          </span>
          <button
            onClick={() => setIsLoanCalcModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs cursor-pointer transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
