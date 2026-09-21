import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR, formatNumber } from '../utils/formatters';
import { 
  Briefcase, 
  TrendingUp, 
  Building2, 
  Calendar, 
  Download, 
  Heart, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileText,
  DollarSign,
  UserCheck
} from 'lucide-react';

export const PortfolioView: React.FC = () => {
  const { 
    currentUser, 
    properties, 
    setSelectedProperty, 
    setActiveTab, 
    toggleFavorite 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'holdings' | 'shortlist' | 'visits'>('holdings');

  // Compute portfolio aggregates
  const totalInvested = currentUser.investments.reduce((acc, inv) => acc + inv.investedAmount, 0);
  const currentValuation = currentUser.investments.reduce((acc, inv) => acc + inv.currentValuation, 0);
  const totalPayouts = currentUser.investments.reduce((acc, inv) => acc + inv.totalPayoutsReceived, 0);
  const monthlyCashflow = currentUser.investments.reduce((acc, inv) => acc + inv.monthlyPayout, 0);
  const unrealizedGain = currentValuation - totalInvested;
  const gainPercentage = totalInvested > 0 ? ((unrealizedGain / totalInvested) * 100).toFixed(1) : '0';

  // Saved properties
  const savedProperties = properties.filter(p => currentUser.savedPropertyIds.includes(p.id));

  const handleDownloadCertificate = (investmentTitle: string) => {
    const cert = `
======================================================
REM MULTI-ASSET REAL ESTATE - SPV OWNERSHIP CERTIFICATE
======================================================
Certificate ID: CERT-${Math.random().toString(36).substring(2, 9).toUpperCase()}
Beneficial Owner: ${currentUser.name}
Email: ${currentUser.email}
Asset: ${investmentTitle}
Date of Allotment: ${new Date().toISOString().split('T')[0]}

Status: ACTIVE HOLDING (RERA Verified)
Custody: Tier-1 Escrow Trustee Registered with SEBI
Distribution Schedule: Monthly on 5th via NEFT/RTGS

This document certifies legal title interest in the SPV holding the underlying real estate asset.
======================================================
    `.trim();

    const blob = new Blob([cert], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `REM_Certificate_${investmentTitle.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Portfolio Header Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-200 shadow-sm"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">{currentUser.name}'s Portfolio</h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {currentUser.email} • {currentUser.phone}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('invest')}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center space-x-2"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Invest in New Asset</span>
          </button>
        </div>
      </div>

      {/* Aggregate Financial Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Capital Invested */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Capital Invested</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">
            {formatINR(totalInvested)}
          </span>
          <span className="text-xs text-slate-500 font-medium block mt-0.5">
            Across {currentUser.investments.length} Active Asset{currentUser.investments.length === 1 ? '' : 's'}
          </span>
        </div>

        {/* Current Portfolio Valuation */}
        <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200 shadow-xs">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">Current Valuation</span>
          <span className="text-2xl font-black text-indigo-950 mt-1 block">
            {formatINR(currentValuation)}
          </span>
          <span className="text-xs font-bold text-emerald-600 block mt-0.5">
            +{formatINR(unrealizedGain)} (+{gainPercentage}%) Unrealized Gain
          </span>
        </div>

        {/* Monthly Passive Rental Income */}
        <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 shadow-xs">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Monthly Rental Income</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block">
            ₹{formatNumber(monthlyCashflow)} <span className="text-xs font-normal">/ mo</span>
          </span>
          <span className="text-xs text-emerald-800 font-medium block mt-0.5">
            Next Payout: 5th of next month
          </span>
        </div>

        {/* Total Payouts Received to Date */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Cumulative Distributions</span>
          <span className="text-2xl font-black text-emerald-400 mt-1 block">
            {formatINR(totalPayouts)}
          </span>
          <span className="text-xs text-slate-400 font-medium block mt-0.5">
            100% credited to bank
          </span>
        </div>

      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 space-x-6">
        <button
          onClick={() => setActiveSubTab('holdings')}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeSubTab === 'holdings'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Real Estate Holdings ({currentUser.investments.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('shortlist')}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeSubTab === 'shortlist'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Saved Shortlist ({savedProperties.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('visits')}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeSubTab === 'visits'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Scheduled Site Visits ({currentUser.scheduledVisits.length})</span>
        </button>
      </div>

      {/* SUB-TAB 1: HOLDINGS */}
      {activeSubTab === 'holdings' && (
        <div className="space-y-4">
          {currentUser.investments.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">No active real estate holdings yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-6">
                Start building your passive income portfolio with institutional pre-leased commercial real estate starting at ₹5 Lakhs.
              </p>
              <button
                onClick={() => setActiveTab('invest')}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider"
              >
                Browse Investment Opportunities
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentUser.investments.map(inv => (
                <div 
                  key={inv.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {inv.status} Holding
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Invested on {inv.investmentDate}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 mt-3">{inv.propertyTitle}</h3>
                    <p className="text-xs text-slate-500 flex items-center space-x-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span>{inv.propertyLocation}</span>
                    </p>

                    <div className="grid grid-cols-3 gap-3 my-4 p-3.5 bg-slate-50 rounded-2xl text-center">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Invested</span>
                        <span className="text-xs font-black text-slate-900 block">{formatINR(inv.investedAmount)}</span>
                      </div>
                      <div className="border-x border-slate-200">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Valuation</span>
                        <span className="text-xs font-black text-indigo-700 block">{formatINR(inv.currentValuation)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Monthly Payout</span>
                        <span className="text-xs font-black text-emerald-600 block">₹{formatNumber(inv.monthlyPayout)}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1.5 bg-slate-50/50 p-3 rounded-xl">
                      <div className="flex justify-between">
                        <span>Syndicate Shareholding:</span>
                        <span className="font-bold text-slate-900">
                          {inv.sharesCount ? `${inv.sharesCount} of 10 Shares (${inv.ownershipPercentage}%)` : `${inv.ownershipPercentage}% Equity`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Rental Dividends Earned:</span>
                        <span className="font-bold text-emerald-600">₹{formatNumber(inv.totalPayoutsReceived)}</span>
                      </div>
                      {inv.projectedExitValuation && (
                        <div className="flex justify-between">
                          <span>Target 4-Yr Exit Return:</span>
                          <span className="font-bold text-teal-700">{formatINR(inv.projectedExitValuation)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Next Distribution:</span>
                        <span className="font-bold text-slate-800">{inv.nextPayoutDate} (via NEFT)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex space-x-2">
                    <button
                      onClick={() => handleDownloadCertificate(inv.propertyTitle)}
                      className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>SPV Certificate</span>
                    </button>

                    <button
                      onClick={() => {
                        const prop = properties.find(p => p.id === inv.propertyId);
                        if (prop) setSelectedProperty(prop);
                      }}
                      className="flex-1 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      Asset Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: SAVED SHORTLIST */}
      {activeSubTab === 'shortlist' && (
        <div>
          {savedProperties.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">Your shortlist is empty</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-6">
                Click the heart icon on any property card to save and track price movements.
              </p>
              <button
                onClick={() => setActiveTab('properties')}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider"
              >
                Browse Properties
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map(property => (
                <div key={property.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="relative aspect-[16/10]">
                    <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                    <button
                      onClick={() => toggleFavorite(property.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-rose-600 shadow-md"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                  <div className="p-5">
                    <h4 className="font-extrabold text-slate-900 text-sm">{property.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{property.location.locality}, {property.location.city}</p>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                      <span className="font-black text-slate-900">{formatINR(property.pricing.totalPrice)}</span>
                      <button
                        onClick={() => setSelectedProperty(property)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: SCHEDULED SITE VISITS */}
      {activeSubTab === 'visits' && (
        <div>
          {currentUser.scheduledVisits.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">No scheduled visits</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-6">
                You can book an in-person VIP site visit or virtual walkthrough from any property page.
              </p>
              <button
                onClick={() => setActiveTab('properties')}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider"
              >
                Find Properties
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {currentUser.scheduledVisits.map(visit => (
                <div 
                  key={visit.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {visit.status}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">{visit.type}</span>
                      </div>
                      <h4 className="text-base font-extrabold text-slate-900 mt-1">{visit.propertyTitle}</h4>
                      <p className="text-xs text-slate-500">{visit.propertyLocation}</p>
                      <p className="text-xs text-indigo-700 font-medium mt-1">
                        Concierge: {visit.conciergeAssigned}
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <div className="text-sm font-black text-slate-900">{visit.date}</div>
                    <div className="text-xs text-slate-500 font-medium">{visit.timeSlot}</div>
                    <span className="inline-block mt-2 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      Concierge Assigned
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
