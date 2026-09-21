import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR, formatNumber } from '../utils/formatters';
import { 
  X, 
  TrendingUp, 
  Building2, 
  MapPin, 
  Sparkles, 
  ShieldCheck,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export const PropertyValuationModal: React.FC = () => {
  const { isValuationModalOpen, setIsValuationModalOpen, setSelectedCategory, setActiveTab } = useApp();

  const [city, setCity] = useState('Bangalore');
  const [locality, setLocality] = useState('Indiranagar');
  const [propertyType, setPropertyType] = useState('Apartment');
  const [carpetArea, setCarpetArea] = useState<number>(1450);
  const [propertyAge, setPropertyAge] = useState('0-2 Years (New)');
  const [furnishing, setFurnishing] = useState('Semi-Furnished');

  if (!isValuationModalOpen) return null;

  // Pricing model based on inputs
  const baseRatePerSqft = 
    locality === 'Indiranagar' ? 12800 :
    locality === 'ORR Kadubeesanahalli' ? 14200 :
    locality === 'Whitefield' ? 8900 :
    locality === 'Cyber City' ? 19500 :
    locality === 'Golf Course Ext.' ? 16500 : 9800;

  const typeMultiplier = 
    propertyType === 'Penthouse' ? 1.3 :
    propertyType === 'Villa' ? 1.25 :
    propertyType === 'Commercial' ? 1.15 :
    propertyType === 'Plot' ? 0.75 : 1.0;

  const finalRate = Math.round(baseRatePerSqft * typeMultiplier);
  const estimatedTotal = carpetArea * finalRate;
  const lowerRange = Math.round(estimatedTotal * 0.95);
  const upperRange = Math.round(estimatedTotal * 1.06);
  const monthlyRentalEst = Math.round((estimatedTotal * 0.045) / 12);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsValuationModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Instant Property Valuation Engine</h3>
            <p className="text-xs text-slate-500">Data-driven market appraisal based on 80+ verified Propsoch micromarket transactions</p>
          </div>
        </div>

        {/* Valuation Result Cards */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white mb-6 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                Estimated Current Valuation
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                {formatINR(lowerRange)} - {formatINR(upperRange)}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Average Rate: <span className="font-bold text-sky-400">₹{formatNumber(finalRate)} / sft</span> in {locality}
              </p>
            </div>

            <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
              <span className="text-xs text-slate-400 block">Estimated Monthly Rent</span>
              <span className="text-xl font-bold text-emerald-400">₹{formatNumber(monthlyRentalEst)} / mo</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Yield: ~4.5% gross</span>
            </div>
          </div>
        </div>

        {/* Input Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
          
          {/* Locality */}
          <div>
            <label className="block mb-1 font-bold text-slate-800">Corridor / Micromarket</label>
            <select
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
            >
              <option value="Indiranagar">Indiranagar 100ft Road (Bangalore)</option>
              <option value="ORR Kadubeesanahalli">Outer Ring Road ORR (Bangalore)</option>
              <option value="Whitefield">Whitefield Hope Farm (Bangalore)</option>
              <option value="Cyber City">Cyber City Hub (Gurugram)</option>
              <option value="Golf Course Ext.">Golf Course Ext. (Gurugram)</option>
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label className="block mb-1 font-bold text-slate-800">Property Type</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
            >
              <option value="Apartment">Residential Apartment</option>
              <option value="Penthouse">Duplex / Sky Penthouse</option>
              <option value="Villa">Independent Luxury Villa</option>
              <option value="Plot">Gated Villa Plot</option>
              <option value="Commercial">Commercial Office Floor</option>
            </select>
          </div>

          {/* Carpet Area Slider */}
          <div className="sm:col-span-2">
            <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
              <span>Carpet Area: {formatNumber(carpetArea)} Sq.Ft</span>
              <span className="text-emerald-700 font-black bg-emerald-50 px-2 py-0.5 rounded">
                {carpetArea < 1000 ? 'Compact' : carpetArea < 2200 ? 'Spacious Family' : 'Expansive Luxury'}
              </span>
            </div>
            <input
              type="range"
              min={600}
              max={5000}
              step={50}
              value={carpetArea}
              onChange={(e) => setCarpetArea(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>600 sft</span>
              <span>2,500 sft</span>
              <span>5,000 sft</span>
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block mb-1 font-bold text-slate-800">Age of Structure</label>
            <select
              value={propertyAge}
              onChange={(e) => setPropertyAge(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
            >
              <option value="0-2 Years (New)">Under 2 Years (Brand New)</option>
              <option value="3-5 Years">3 to 5 Years</option>
              <option value="6-10 Years">6 to 10 Years</option>
            </select>
          </div>

          {/* Furnishing */}
          <div>
            <label className="block mb-1 font-bold text-slate-800">Furnishing State</label>
            <select
              value={furnishing}
              onChange={(e) => setFurnishing(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
            >
              <option value="Semi-Furnished">Semi-Furnished (Modular Kitchen + Wardrobes)</option>
              <option value="Fully Furnished">Fully Furnished Designer Decor</option>
              <option value="Bare Shell">Unfurnished / Bare Shell</option>
            </select>
          </div>

        </div>

        {/* Actions */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-xs text-emerald-600 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Certified REM Property Valuation Algorithm</span>
          </div>

          <button
            onClick={() => setIsValuationModalOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs cursor-pointer transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
