import React from 'react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/formatters';
import { PropertyTypeFilter } from '../types';
import { 
  DollarSign, 
  RotateCcw, 
  ArrowUpDown,
  Building2,
  Home,
  MapPin,
  Calendar,
  SlidersHorizontal,
  X,
  Sparkles,
  Layers
} from 'lucide-react';

interface CategoryFilterProps {
  sortBy: string;
  setSortBy: (sort: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  sortBy,
  setSortBy,
  statusFilter,
  setStatusFilter
}) => {
  const {
    cityFilter,
    setCityFilter,
    maxBudgetFilter,
    setMaxBudgetFilter,
    bhkFilter,
    setBhkFilter,
    listingTypeFilter,
    setListingTypeFilter,
    propertyTypeFilter,
    setPropertyTypeFilter,
    preLaunchOnly,
    setPreLaunchOnly
  } = useApp();

  const isRent = listingTypeFilter === 'rent';

  const propertyTypes: { label: string; value: PropertyTypeFilter }[] = [
    { label: 'All Types', value: 'all' },
    { label: 'Apartments', value: 'Apartment' },
    { label: 'Villas', value: 'Villa' },
    { label: 'Plots', value: 'Plot' },
    { label: 'Penthouses', value: 'Penthouse' },
    { label: 'Commercial', value: 'Commercial' },
  ];

  const bhkOptions = [
    { label: 'All BHK', value: 'all' },
    { label: '1 BHK', value: '1 BHK' },
    { label: '2 BHK', value: '2 BHK' },
    { label: '3 BHK', value: '3 BHK' },
    { label: '4 BHK', value: '4 BHK' },
    { label: '4+ BHK', value: '4+ BHK' },
  ];

  const cities = [
    { label: 'Location', value: 'all' },
    { label: 'South Bengaluru', value: 'South Bengaluru' },
    { label: 'North Bengaluru', value: 'North Bengaluru' },
  ];

  const statuses = [
    { label: 'All Status', value: 'all' },
    { label: 'Ready to Move', value: 'Ready to Move' },
    { label: 'Under Construction', value: 'Under Construction' },
    { label: 'Pre-Launch', value: 'Pre-Launch' },
  ];

  const handleReset = () => {
    setListingTypeFilter('all');
    setPropertyTypeFilter('all');
    setBhkFilter('all');
    setCityFilter('all');
    setStatusFilter('all');
    setPreLaunchOnly(false);
    setMaxBudgetFilter(50000000);
    setSortBy('price_asc');
  };

  const activeFilterCount = 
    (listingTypeFilter !== 'all' ? 1 : 0) +
    (propertyTypeFilter !== 'all' ? 1 : 0) +
    (bhkFilter !== 'all' ? 1 : 0) +
    (cityFilter !== 'all' ? 1 : 0) +
    (statusFilter !== 'all' ? 1 : 0) +
    (preLaunchOnly ? 1 : 0) +
    (maxBudgetFilter < 50000000 ? 1 : 0);

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs mb-6 space-y-3.5">
      
      {/* Top Header: Title, Listing Mode & Reset */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Property Filters</h3>
              {activeFilterCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-600 text-white">
                  {activeFilterCount} Active
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Refine listings by property type, BHK, budget & location</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-center">
          {/* Quick Listing Mode Toggle */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setListingTypeFilter('all')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                listingTypeFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setListingTypeFilter('sale')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                listingTypeFilter === 'sale'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setListingTypeFilter('rent')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                listingTypeFilter === 'rent'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Rent
            </button>
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={handleReset}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-all cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Row 1: Property Type Pills */}
      <div>
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
          Property Type
        </label>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {propertyTypes.map(t => {
            const isSelected = propertyTypeFilter === t.value;
            return (
              <button
                key={t.value}
                onClick={() => setPropertyTypeFilter(t.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 2: BHK Configuration Pills */}
      <div>
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
          Unit Configuration (BHK)
        </label>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {bhkOptions.map(bhk => {
            const isSelected = bhkFilter === bhk.value;
            return (
              <button
                key={bhk.value}
                onClick={() => setBhkFilter(bhk.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                }`}
              >
                {bhk.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 3: Dropdowns for Location → Construction Stage → Sort Listings → Pre-Launch Deals */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2.5 border-t border-slate-100">
        
        {/* Location Filter */}
        <div className="md:col-span-3">
          <label className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 mb-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>Location</span>
          </label>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="w-full text-xs font-bold text-slate-800 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
          >
            {cities.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Construction Status Filter */}
        <div className="md:col-span-3">
          <label className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 mb-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Construction Stage</span>
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full text-xs font-bold text-slate-800 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
          >
            {statuses.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="md:col-span-3">
          <label className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 mb-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span>Sort Listings</span>
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full text-xs font-bold text-slate-800 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
          >
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="area_desc">Largest Carpet Area</option>
          </select>
        </div>

        {/* Pre-launch Quick Toggle */}
        <div className="md:col-span-3 flex flex-col justify-end">
          <button
            onClick={() => setPreLaunchOnly(!preLaunchOnly)}
            className={`w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              preLaunchOnly
                ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs'
                : 'bg-slate-50 border-slate-200/90 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${preLaunchOnly ? 'text-amber-600 fill-amber-500' : 'text-slate-400'}`} />
            <span>Pre-Launch Deals Only</span>
          </button>
        </div>

      </div>

      {/* Row 4: Max Budget Bar (Placed below at the end) */}
      <div className="pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700">
          <DollarSign className="w-3.5 h-3.5 text-blue-600" />
          <span>{isRent ? 'Monthly Rental Budget' : 'Purchase Budget Range'}</span>
        </div>

        <div className="w-full sm:w-[45%] sm:max-w-md ml-auto">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-slate-400">Max Budget:</span>
            <span className="text-xs font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-100">
              {maxBudgetFilter >= 50000000 
                ? 'Any Budget' 
                : isRent 
                  ? `< ₹${(maxBudgetFilter / 1000).toFixed(0)}k/mo`
                  : `< ${formatINR(maxBudgetFilter)}`}
            </span>
          </div>

          <input
            type="range"
            min={isRent ? 25000 : 10000000}
            max={isRent ? 1000000 : 50000000}
            step={isRent ? 25000 : 2500000}
            value={maxBudgetFilter}
            onChange={(e) => setMaxBudgetFilter(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-100 rounded-lg"
          />

          <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-0.5">
            {isRent ? (
              <>
                <span>₹25k</span>
                <span>₹2.5L</span>
                <span>₹5.0L</span>
                <span>Any</span>
              </>
            ) : (
              <>
                <span>₹1.0 Cr</span>
                <span>₹2.5 Cr</span>
                <span>₹4.0 Cr</span>
                <span>Any</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Row 5: Dismissible Active Filter Chips (if any active) */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400">Active Filters:</span>

          {listingTypeFilter !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 text-[11px] font-bold">
              <span>Listing: {listingTypeFilter === 'sale' ? 'Buy' : 'Rent'}</span>
              <button onClick={() => setListingTypeFilter('all')} className="hover:text-blue-900 cursor-pointer ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {propertyTypeFilter !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 text-[11px] font-bold">
              <span>Type: {propertyTypeFilter}</span>
              <button onClick={() => setPropertyTypeFilter('all')} className="hover:text-blue-900 cursor-pointer ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {bhkFilter !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 text-[11px] font-bold">
              <span>BHK: {bhkFilter}</span>
              <button onClick={() => setBhkFilter('all')} className="hover:text-blue-900 cursor-pointer ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {cityFilter !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 text-[11px] font-bold">
              <span>City: {cityFilter}</span>
              <button onClick={() => setCityFilter('all')} className="hover:text-blue-900 cursor-pointer ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {statusFilter !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 text-[11px] font-bold">
              <span>Status: {statusFilter}</span>
              <button onClick={() => setStatusFilter('all')} className="hover:text-blue-900 cursor-pointer ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {preLaunchOnly && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold">
              <span>Pre-Launch Only</span>
              <button onClick={() => setPreLaunchOnly(false)} className="hover:text-amber-900 cursor-pointer ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {maxBudgetFilter < 50000000 && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 text-[11px] font-bold">
              <span>Budget: {isRent ? `< ₹${(maxBudgetFilter / 1000).toFixed(0)}k` : `< ${formatINR(maxBudgetFilter)}`}</span>
              <button onClick={() => setMaxBudgetFilter(50000000)} className="hover:text-blue-900 cursor-pointer ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={handleReset}
            className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer ml-auto"
          >
            Clear All
          </button>
        </div>
      )}

    </div>
  );
};
