import React, { useState } from 'react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { formatINR, formatNumber } from '../utils/formatters';
import { 
  Heart, 
  MapPin, 
  PlayCircle, 
  ShieldCheck, 
  Train, 
  ArrowRight, 
  Scale,
  TrendingUp,
  Users
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { 
    currentUser, 
    toggleFavorite, 
    setSelectedProperty,
    compareIds, 
    toggleCompare,
    setIsInvestModalOpen,
    setInvestTargetProperty
  } = useApp();

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const isFavorite = currentUser.savedPropertyIds.includes(property.id);
  const isCompared = compareIds.includes(property.id);

  const isRent = property.listingType === 'rent';

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col hover:border-blue-400">
      
      {/* Top Media Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={property.images[activeImgIndex] || property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-black shadow-sm backdrop-blur-md ${
              isRent ? 'bg-indigo-600 text-white' : 'bg-blue-600 text-white'
            }`}>
              {isRent ? 'For Rent' : 'For Sale'}
            </span>

            {property.isUpcoming && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-500 text-slate-950 shadow-sm backdrop-blur-md">
                Pre-Launch
              </span>
            )}

            {property.peaceOfMind.reraId && (
              <span className="hidden sm:inline-flex items-center space-x-1 px-2 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 text-sky-300 border border-sky-400/20 backdrop-blur-md">
                <ShieldCheck className="w-3 h-3 text-sky-400" />
                <span>RERA</span>
              </span>
            )}
          </div>

          {/* Action Buttons: Compare & Favorite */}
          <div className="flex items-center space-x-1.5 pointer-events-auto">
            <button
              onClick={() => toggleCompare(property.id)}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                isCompared 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white/80 hover:bg-white text-slate-700'
              }`}
              title="Add to Compare tool"
            >
              <Scale className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => toggleFavorite(property.id)}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                isFavorite 
                  ? 'bg-rose-500 text-white shadow-md' 
                  : 'bg-white/80 hover:bg-white text-slate-700'
              }`}
              title="Save property"
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Video Tour Indicator */}
        {property.videoTourUrl && (
          <button
            onClick={() => setSelectedProperty(property)}
            className="absolute bottom-3 left-3 inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-semibold backdrop-blur-md transition-all cursor-pointer"
          >
            <PlayCircle className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>Watch Video Tour</span>
          </button>
        )}

        {/* Image thumbnail dots */}
        {property.images.length > 1 && (
          <div className="absolute bottom-1.5 inset-x-0 flex justify-center space-x-1">
            {property.images.slice(0, 4).map((_, idx) => (
              <span 
                key={idx}
                onClick={(e) => { e.stopPropagation(); setActiveImgIndex(idx); }}
                className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                  activeImgIndex === idx ? 'bg-white scale-125' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Body Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Developer & Property Type */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>{property.developer}</span>
            <span className="capitalize text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-bold">
              {property.propertyType || property.category.replace('_', ' ')}
            </span>
          </div>

          {/* Title */}
          <h4 
            onClick={() => setSelectedProperty(property)}
            className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
          >
            {property.title}
          </h4>

          {/* Location & Metro Distance */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-600 mt-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate">{property.location.locality}, {property.location.city}</span>
            <span className="text-slate-300">•</span>
            <div className="flex items-center space-x-1 text-slate-500 shrink-0">
              <Train className="w-3 h-3 text-blue-500" />
              <span>{property.location.nearestMetroDistanceKm} km</span>
            </div>
          </div>

          {/* Dimensions Box */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-100 text-center mb-3">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Config</span>
              <span className="text-xs font-bold text-slate-800 truncate block">
                {property.dimensions.bhk.split(' ')[0]} {property.dimensions.bhk.split(' ')[1] || 'Unit'}
              </span>
            </div>
            <div className="border-x border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Carpet Area</span>
              <span className="text-xs font-bold text-slate-800 block">
                {formatNumber(property.dimensions.carpetAreaSqFt)} <span className="text-[10px] font-normal">sft</span>
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Efficiency</span>
              <span className="text-xs font-bold text-blue-600 block">
                {property.dimensions.efficiencyPercentage}%
              </span>
            </div>
          </div>

          {/* Tagline / Key Feature */}
          <div className="mb-3">
            <p className="text-xs text-slate-600 line-clamp-1 font-medium">
              {property.tagline}
            </p>
          </div>

          {/* Investment Banner */}
          {property.investment?.isInvestable && (
            <div className="mb-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <div className="flex items-center space-x-1 font-black text-slate-900 text-[11px]">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Investment ({property.investment.grossRentalYieldPercentage}% Yield)</span>
                </div>
                <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                  From {formatINR(property.investment.minTicketSize || 50000)} • Monthly Rent
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setInvestTargetProperty(property);
                  setIsInvestModalOpen(true);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-blue-600 text-white font-bold text-[10px] uppercase tracking-wider transition-all cursor-pointer"
              >
                Invest
              </button>
            </div>
          )}
        </div>

        {/* Pricing & Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-lg font-black text-slate-900">
              {isRent 
                ? `₹${formatNumber(property.monthlyRent || property.pricing.totalPrice)} / mo`
                : formatINR(property.pricing.totalPrice)
              }
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              {isRent ? 'Monthly Rental' : `₹${formatNumber(property.pricing.pricePerSqFt)} / sft`}
            </div>
          </div>

          <button
            onClick={() => setSelectedProperty(property)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
