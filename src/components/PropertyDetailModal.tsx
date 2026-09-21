import React, { useState } from 'react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { formatINR, formatNumber, calculateEMI } from '../utils/formatters';
import { 
  X, 
  MapPin, 
  Train, 
  Plane, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Play, 
  Image as ImageIcon, 
  Layout, 
  Calendar, 
  TrendingUp, 
  Award, 
  Maximize2, 
  Compass, 
  Layers, 
  DollarSign, 
  Download, 
  Share2, 
  Scale, 
  Heart,
  PhoneCall,
  Sparkles,
  Video,
  Users
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property;
  onClose: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose
}) => {
  const { 
    currentUser, 
    toggleFavorite, 
    compareIds, 
    toggleCompare, 
    bookSiteVisit,
    setIsInvestModalOpen,
    setInvestTargetProperty
  } = useApp();

  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'video' | 'floorplan'>('photos');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const propertyVideos = property.videos && property.videos.length > 0 
    ? property.videos 
    : (property.videoTourUrl ? [property.videoTourUrl] : []);

  // EMI Calculator State
  const defaultLoanAmount = Math.round(property.pricing.totalPrice * 0.8);
  const [loanAmount, setLoanAmount] = useState(defaultLoanAmount);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState(20);

  const monthlyEMI = calculateEMI(loanAmount, interestRate, loanTenureYears);

  // Visit booking state
  const [visitDate, setVisitDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [visitSlot, setVisitSlot] = useState('11:00 AM - 12:30 PM');
  const [visitType, setVisitType] = useState<'Physical Site Tour' | 'Virtual Video Walkthrough'>('Physical Site Tour');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const isFavorite = currentUser.savedPropertyIds.includes(property.id);
  const isCompared = compareIds.includes(property.id);

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    bookSiteVisit(property.id, visitDate, visitSlot, visitType);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
    }, 4000);
  };

  const handleDownloadBrochure = () => {
    const reportContent = `
======================================================
REM REAL ESTATE - PROPERTY SPECIFICATION BROCHURE
======================================================
Property: ${property.title}
Developer: ${property.developer}
Location: ${property.location.locality}, ${property.location.city}
RERA ID: ${property.peaceOfMind.reraId}

DIMENSIONS & SPECS:
- Unit Configuration: ${property.dimensions.bhk}
- Carpet Area: ${property.dimensions.carpetAreaSqFt} Sq.Ft
- Super Built-up Area: ${property.dimensions.superBuiltUpSqFt} Sq.Ft
- Spatial Efficiency: ${property.dimensions.efficiencyPercentage}%
- Ceiling Height: ${property.dimensions.ceilingHeightFt || 10.5} Ft
- Orientation / Facing: ${property.dimensions.facing || 'East'}

FINANCIAL VALUATION:
- Total Price: ${formatINR(property.pricing.totalPrice)}
- Rate per Sq.Ft: ₹${property.pricing.pricePerSqFt}
- Est. Stamp Duty & Reg: ${formatINR(property.pricing.stampDutyAndReg || 0)}
- Est. Monthly Maintenance: ₹${property.pricing.maintenancePerMonth || 0}

KEY HIGHLIGHTS:
${property.peaceOfMind.pros.map(p => `+ ${p}`).join('\n')}

PROPERTY NOTES & ADVISORY:
${property.peaceOfMind.cons.map(c => `- ${c}`).join('\n')}

Certified by REM Advisory & Legal Compliance Division.
0% Brokerage Assured.
======================================================
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${property.title.replace(/\s+/g, '_')}_Brochure.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 border border-slate-200 flex flex-col max-h-[92vh]">
        
        {/* Sticky Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white/95 backdrop-blur-md shrink-0">
          <div className="flex items-center space-x-3">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              property.status === 'Ready to Move' ? 'bg-emerald-100 text-emerald-800' :
              property.status === 'High Yield Active' ? 'bg-indigo-100 text-indigo-800' :
              property.status === 'Pre-Launch' ? 'bg-amber-100 text-amber-900' :
              'bg-blue-100 text-blue-800'
            }`}>
              {property.status}
            </span>
            <div className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-500 font-semibold">
              <span>{property.developer}</span>
              <span>•</span>
              <span className="font-mono text-[11px] text-slate-400">{property.peaceOfMind.reraId}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleFavorite(property.id)}
              className={`p-2 rounded-xl border transition-all ${
                isFavorite 
                  ? 'bg-rose-50 border-rose-200 text-rose-600' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleDownloadBrochure}
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Brochure</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="overflow-y-auto p-6 space-y-8">
          
          {/* Title & Micro-market Info */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {property.title}
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-1">{property.tagline}</p>
            
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-600">
              <div className="flex items-center space-x-1 font-semibold text-slate-800">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>{property.location.locality}, {property.location.city} ({property.location.state})</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Train className="w-4 h-4 text-blue-500" />
                <span>{property.location.nearestMetroDistanceKm} km from Metro</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Plane className="w-4 h-4 text-sky-500" />
                <span>{property.location.airportDistanceKm} km to Int'l Airport</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold">
                <span>WalkScore: {property.location.walkScore}/100</span>
              </div>
            </div>
          </div>

          {/* Media Showcase: Photos, Video Tour, Floor Plan Blueprints */}
          <div className="bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 text-white">
            {/* Media Navigation Tabs */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900/60">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveMediaTab('photos')}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeMediaTab === 'photos'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>HD Gallery ({property.images.length})</span>
                </button>

                <button
                  onClick={() => setActiveMediaTab('video')}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeMediaTab === 'video'
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Video Walkthrough</span>
                </button>

                <button
                  onClick={() => setActiveMediaTab('floorplan')}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeMediaTab === 'floorplan'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Layout className="w-3.5 h-3.5" />
                  <span>2D/3D Floor Plans</span>
                </button>
              </div>

              <div className="hidden sm:block text-xs font-mono text-slate-400">
                Verified On-Site by REM Visual Team
              </div>
            </div>

            {/* Media Canvas */}
            <div className="relative aspect-[16/9] max-h-[460px] bg-black flex items-center justify-center overflow-hidden">
              {activeMediaTab === 'photos' && (
                <img
                  src={property.images[selectedPhotoIndex] || property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover animate-in fade-in duration-300"
                />
              )}

              {activeMediaTab === 'video' && (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 p-4">
                  {propertyVideos.length > 0 ? (
                    <video
                      key={propertyVideos[selectedVideoIndex]}
                      src={propertyVideos[selectedVideoIndex]}
                      controls
                      autoPlay
                      loop
                      muted
                      className="w-full h-full max-h-[420px] rounded-xl object-cover shadow-2xl"
                    >
                      Your browser does not support video walkthroughs.
                    </video>
                  ) : (
                    <div className="text-slate-400 text-xs font-semibold">No video walkthrough available</div>
                  )}
                </div>
              )}

              {activeMediaTab === 'floorplan' && (
                <div className="w-full h-full flex items-center justify-center p-4 bg-slate-900">
                  <img
                    src={property.floorPlanUrl}
                    alt="Floor plan"
                    className="max-h-full max-w-full object-contain rounded-xl border border-slate-700 shadow-xl"
                  />
                </div>
              )}
            </div>

            {/* Multiple Videos Selector (if on video tab and multiple videos exist) */}
            {activeMediaTab === 'video' && propertyVideos.length > 1 && (
              <div className="flex items-center space-x-2 p-3 bg-slate-900 overflow-x-auto">
                <span className="text-[11px] font-bold text-slate-400 shrink-0">Available Videos ({propertyVideos.length}):</span>
                {propertyVideos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedVideoIndex(idx)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedVideoIndex === idx
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Video {idx + 1}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Thumbnails Row (if on photos tab) */}
            {activeMediaTab === 'photos' && (
              <div className="flex space-x-2 p-3 bg-slate-900 overflow-x-auto">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedPhotoIndex === idx ? 'border-blue-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Metrics Matrix: Dimensions, Pricing, Possession */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Configuration</span>
              <span className="text-lg font-black text-slate-900 mt-1 block">{property.dimensions.bhk}</span>
              <span className="text-xs text-slate-500 font-medium">{property.dimensions.facing || 'East Facing'}</span>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Carpet Area</span>
              <span className="text-lg font-black text-blue-900 mt-1 block">
                {formatNumber(property.dimensions.carpetAreaSqFt)} <span className="text-xs font-normal">Sq.Ft</span>
              </span>
              <span className="text-xs font-semibold text-emerald-700">
                {property.dimensions.efficiencyPercentage}% Spatial Efficiency
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Valuation</span>
              <span className="text-lg font-black text-slate-900 mt-1 block">
                {formatINR(property.pricing.totalPrice)}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                ₹{formatNumber(property.pricing.pricePerSqFt)} / sft
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">Possession</span>
              <span className="text-lg font-black text-indigo-900 mt-1 block">{property.possessionDate}</span>
              <span className="text-xs text-indigo-700 font-medium">
                {property.dimensions.totalUnitsInProject} total units in project
              </span>
            </div>
          </div>


          {/* Property Dimensions & Spatial Specs Deep Dive */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
              <Maximize2 className="w-5 h-5 text-blue-600" />
              <span>Full Dimensions & Construction Specifications</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Dimensions Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                <div className="p-3 bg-slate-50 font-bold text-slate-700 border-b border-slate-200">
                  Spatial Measurements
                </div>
                <div className="divide-y divide-slate-100">
                  <div className="flex justify-between p-3">
                    <span className="text-slate-500">Carpet Area:</span>
                    <span className="font-bold text-slate-900">{formatNumber(property.dimensions.carpetAreaSqFt)} Sq.Ft</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-slate-500">Super Built-up Area:</span>
                    <span className="font-bold text-slate-900">{formatNumber(property.dimensions.superBuiltUpSqFt)} Sq.Ft</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-slate-500">Carpet Efficiency:</span>
                    <span className="font-bold text-emerald-600">{property.dimensions.efficiencyPercentage}%</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-slate-500">Floor Level:</span>
                    <span className="font-bold text-slate-900">{property.dimensions.floorLevel || 'Multi-tier'}</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-slate-500">Clear Ceiling Height:</span>
                    <span className="font-bold text-slate-900">{property.dimensions.ceilingHeightFt || 10.5} Feet</span>
                  </div>
                </div>
              </div>

              {/* Construction Specs Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                <div className="p-3 bg-slate-50 font-bold text-slate-700 border-b border-slate-200">
                  Engineering & Material Specifications
                </div>
                <div className="divide-y divide-slate-100">
                  <div className="flex justify-between p-3">
                    <span className="text-slate-500">Flooring:</span>
                    <span className="font-medium text-slate-900 text-right max-w-[65%]">{property.specs.flooring}</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-slate-500">Power Backup:</span>
                    <span className="font-medium text-slate-900 text-right max-w-[65%]">{property.specs.powerBackup}</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-slate-500">Water Supply:</span>
                    <span className="font-medium text-slate-900 text-right max-w-[65%]">{property.specs.waterSupply}</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-slate-500">Car Parking:</span>
                    <span className="font-medium text-slate-900 text-right max-w-[65%]">{property.specs.parking}</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-slate-500">Security Grid:</span>
                    <span className="font-medium text-slate-900 text-right max-w-[65%]">{property.specs.security}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive EMI & Affordability Calculator */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <span>Interactive Home Loan & EMI Calculator</span>
                </h3>
                <p className="text-xs text-slate-400">Estimate monthly cash outflow with customized loan amount and interest rates</p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-2xl text-right">
                <span className="text-xs text-emerald-300 font-bold block">Estimated Monthly EMI</span>
                <span className="text-2xl font-black text-emerald-400">₹{formatNumber(monthlyEMI)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>Loan Principal</span>
                  <span className="text-emerald-400">{formatINR(loanAmount)}</span>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={property.pricing.totalPrice}
                  step={500000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>₹10 L</span>
                  <span>{formatINR(property.pricing.totalPrice)}</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>Interest Rate</span>
                  <span className="text-emerald-400">{interestRate}% p.a.</span>
                </div>
                <input
                  type="range"
                  min={7.5}
                  max={12.0}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>7.5%</span>
                  <span>12.0%</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>Loan Tenure</span>
                  <span className="text-emerald-400">{loanTenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={loanTenureYears}
                  onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>5 Yrs</span>
                  <span>30 Yrs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities Grid */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Lifestyle & Project Amenities</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {property.amenities.map((amenity, i) => (
                <div key={i} className="flex items-center space-x-2 p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Property Investment Showcase */}
          {property.investment?.isInvestable && (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white border border-emerald-700/50 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-black uppercase tracking-wider mb-2 border border-emerald-400/30">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>High-Yield Property Investment</span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-white">
                    Co-Own This Asset &amp; Earn Passive Returns
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                    Pre-leased to {property.investment.tenantProfile || 'Tier-1 Multinational Tenant'}. Earn monthly rental dividends deposited via NEFT + exit capital appreciation profit.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-right sm:text-right shrink-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Min. Investment</span>
                  <span className="text-2xl font-black text-emerald-400 block">
                    {formatINR(property.investment.minTicketSize || 50000)}
                  </span>
                  <span className="text-[11px] text-teal-300 font-semibold block mt-0.5">
                    {property.investment.grossRentalYieldPercentage}% Gross Yield
                  </span>
                </div>
              </div>

              {/* Funding Progress Bar */}
              <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex justify-between items-center text-xs font-bold mb-2">
                  <span className="text-slate-300">Syndicate Funding Progress</span>
                  <span className="text-emerald-400 font-black">{property.investment.fundedPercentage || 70}% Funded</span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, property.investment.fundedPercentage || 70)}%` }}
                  />
                </div>
                <div className="mt-2 text-[11px] text-slate-400 flex justify-between font-medium">
                  <span>Total Valuation: {formatINR(property.pricing.totalPrice)}</span>
                  <span>Target IRR: {property.investment.projectedIRRPercentage}%</span>
                </div>
              </div>

              {/* Financial Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-center">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Rental Yield</span>
                  <span className="text-base font-black text-emerald-400">
                    {property.investment.grossRentalYieldPercentage}% p.a.
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Credited 5th of every month</span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Tenure</span>
                  <span className="text-base font-black text-teal-300">
                    {property.investment.tenureYears || 4} Years
                  </span>
                  <span className="text-[9px] text-emerald-400 block mt-0.5">+45% Capital Appreciation</span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Legal Title</span>
                  <span className="text-base font-black text-sky-300">100% SPV Equity</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">RERA &amp; SEBI Escrow</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  ⚡ Minimum investment starting from {formatINR(property.investment.minTicketSize || 50000)}.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setInvestTargetProperty(property);
                    setIsInvestModalOpen(true);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Invest in Property</span>
                </button>
              </div>
            </div>
          )}

          {/* Schedule Site Visit & Inquiry Form */}
          <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/60 border border-blue-200">
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-6">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">Concierge Site Tours</span>
                <h4 className="text-xl font-black text-slate-900 mt-1">Book an Exclusive VIP Site Walkthrough</h4>
                <p className="text-xs text-slate-500 mt-1">Experience the property with a senior REM architectural relationship manager. No pressure, 0% brokerage.</p>
              </div>

              {bookingSuccess ? (
                <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-center animate-in zoom-in-95">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm font-bold">Site Visit Confirmed!</p>
                  <p className="text-xs mt-1">Your reservation has been added to your Portfolio dashboard. Our concierge will contact you via WhatsApp.</p>
                </div>
              ) : (
                <form onSubmit={handleBookVisit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Date</label>
                      <input
                        type="date"
                        required
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Time Slot</label>
                      <select
                        value={visitSlot}
                        onChange={(e) => setVisitSlot(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                      >
                        <option value="10:00 AM - 11:30 AM">10:00 AM - 11:30 AM</option>
                        <option value="11:00 AM - 12:30 PM">11:00 AM - 12:30 PM</option>
                        <option value="02:00 PM - 03:30 PM">02:00 PM - 03:30 PM</option>
                        <option value="04:30 PM - 06:00 PM">04:30 PM - 06:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setVisitType('Physical Site Tour')}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        visitType === 'Physical Site Tour'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Physical On-Site Visit
                    </button>
                    <button
                      type="button"
                      onClick={() => setVisitType('Virtual Video Walkthrough')}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        visitType === 'Virtual Video Walkthrough'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Live Virtual Walkthrough
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    Confirm VIP Site Visit
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Sticky Action Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-black text-slate-900">
                {formatINR(property.pricing.totalPrice)}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                (₹{formatNumber(property.pricing.pricePerSqFt)} / sft)
              </span>
            </div>
            <p className="text-[11px] text-emerald-700 font-bold">
              Token Booking: {formatINR(property.pricing.bookingTokenAmount)} • 100% Refundable
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {property.investment?.isInvestable && (
              <button
                type="button"
                onClick={() => {
                  setInvestTargetProperty(property);
                  setIsInvestModalOpen(true);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center space-x-1"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Claim 1 Share ({formatINR(property.investment.sharePrice || 1000000)})</span>
              </button>
            )}

            <button
              onClick={() => {
                alert(`Priority Token booking initiated for ${property.title}. Our REM relationship manager will contact you shortly.`);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              Book Priority Token
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
