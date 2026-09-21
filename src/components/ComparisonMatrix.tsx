import React from 'react';
import { useApp } from '../context/AppContext';
import { formatINR, formatNumber } from '../utils/formatters';
import { 
  Scale, 
  X, 
  Trash2, 
  Check, 
  ShieldCheck, 
  ArrowRight, 
  Award,
  Layers,
  MapPin,
  Train
} from 'lucide-react';

export const ComparisonMatrix: React.FC = () => {
  const { 
    properties, 
    compareIds, 
    toggleCompare, 
    clearCompare, 
    setSelectedProperty,
    setActiveTab 
  } = useApp();

  const comparedProperties = properties.filter(p => compareIds.includes(p.id));

  if (comparedProperties.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-xl mx-auto my-12">
        <Scale className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h2 className="text-xl font-black text-slate-900">No properties selected for comparison</h2>
        <p className="text-xs text-slate-500 mt-2 mb-6">
          Compare up to 3 properties side-by-side across spatial efficiency, floor plans, and pricing metrics.
        </p>
        <button
          onClick={() => setActiveTab('properties')}
          className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-700 transition-all cursor-pointer"
        >
          Explore Properties to Compare
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-blue-600" />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Property Comparison Matrix</h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Objective side-by-side evaluation comparing spatial efficiency, floor plans, and financial breakdown.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold text-slate-400">
            {comparedProperties.length}/3 Properties Selected
          </span>
          <button
            onClick={clearCompare}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-all cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="p-4 w-1/4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Property Metric
              </th>
              {comparedProperties.map(p => (
                <th key={p.id} className="p-4 w-1/4 align-top">
                  <div className="relative group">
                    <button
                      onClick={() => toggleCompare(p.id)}
                      className="absolute -top-2 -right-2 p-1.5 rounded-full bg-slate-900 text-white hover:bg-rose-600 transition-all shadow-md z-10"
                      title="Remove from compare"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-slate-100">
                      <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold uppercase text-blue-600">{p.developer}</span>
                    <h3 className="text-sm font-extrabold text-slate-900 line-clamp-1">{p.title}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-black text-slate-900">{formatINR(p.pricing.totalPrice)}</span>
                      <button
                        onClick={() => setSelectedProperty(p)}
                        className="text-[11px] font-bold text-blue-600 hover:underline"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs">
            
            {/* Legal Title & RERA */}
            <tr className="bg-slate-50/40">
              <td className="p-4 font-semibold text-slate-700 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Legal Clearance & RERA</span>
              </td>
              {comparedProperties.map(p => (
                <td key={p.id} className="p-4">
                  <div className="inline-flex items-center space-x-1 text-emerald-700 font-bold">
                    <Check className="w-3.5 h-3.5" />
                    <span>RERA Approved</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">{p.peaceOfMind.reraId}</div>
                </td>
              ))}
            </tr>

            {/* Price Per SqFt */}
            <tr className="bg-slate-50/50">
              <td className="p-4 font-semibold text-slate-600">Rate per Sq.Ft</td>
              {comparedProperties.map(p => (
                <td key={p.id} className="p-4 font-black text-slate-900">
                  ₹{formatNumber(p.pricing.pricePerSqFt)} / sft
                </td>
              ))}
            </tr>

            {/* Configuration */}
            <tr>
              <td className="p-4 font-semibold text-slate-600">Configuration</td>
              {comparedProperties.map(p => (
                <td key={p.id} className="p-4 font-bold text-slate-800">
                  {p.dimensions.bhk}
                </td>
              ))}
            </tr>

            {/* Carpet Area */}
            <tr>
              <td className="p-4 font-semibold text-slate-600">Carpet Area</td>
              {comparedProperties.map(p => (
                <td key={p.id} className="p-4 font-bold text-slate-900">
                  {formatNumber(p.dimensions.carpetAreaSqFt)} Sq.Ft
                </td>
              ))}
            </tr>

            {/* Spatial Efficiency */}
            <tr className="bg-emerald-50/40">
              <td className="p-4 font-bold text-slate-900">Carpet Efficiency %</td>
              {comparedProperties.map(p => (
                <td key={p.id} className="p-4 font-black text-emerald-700">
                  {p.dimensions.efficiencyPercentage}% usable space
                </td>
              ))}
            </tr>

            {/* Location & Metro */}
            <tr>
              <td className="p-4 font-semibold text-slate-600">Location & Metro Proximity</td>
              {comparedProperties.map(p => (
                <td key={p.id} className="p-4">
                  <div className="font-bold text-slate-800">{p.location.locality}, {p.location.city}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    {p.location.nearestMetroDistanceKm} km to Metro
                  </div>
                </td>
              ))}
            </tr>

            {/* WalkScore */}
            <tr>
              <td className="p-4 font-semibold text-slate-600">Neighborhood WalkScore</td>
              {comparedProperties.map(p => (
                <td key={p.id} className="p-4 font-bold text-slate-800">
                  {p.location.walkScore} / 100
                </td>
              ))}
            </tr>

            {/* Possession Stage */}
            <tr>
              <td className="p-4 font-semibold text-slate-600">Possession Timeline</td>
              {comparedProperties.map(p => (
                <td key={p.id} className="p-4 font-bold text-indigo-700">
                  {p.possessionDate}
                </td>
              ))}
            </tr>

            {/* Key Verified Pro */}
            <tr>
              <td className="p-4 font-semibold text-slate-600">Primary Objective Pro</td>
              {comparedProperties.map(p => (
                <td key={p.id} className="p-4 text-emerald-800 font-medium">
                  ✓ {p.peaceOfMind.pros[0]}
                </td>
              ))}
            </tr>

            {/* Key Objective Risk / Con */}
            <tr>
              <td className="p-4 font-semibold text-slate-600">Primary Point to Consider</td>
              {comparedProperties.map(p => (
                <td key={p.id} className="p-4 text-rose-700 font-medium">
                  • {p.peaceOfMind.cons[0]}
                </td>
              ))}
            </tr>

            {/* Action Row */}
            <tr className="bg-slate-50">
              <td className="p-4 font-bold text-slate-900">Action</td>
              {comparedProperties.map(p => (
                <td key={p.id} className="p-4">
                  <button
                    onClick={() => setSelectedProperty(p)}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs transition-all shadow-xs"
                  >
                    View Property
                  </button>
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
};
