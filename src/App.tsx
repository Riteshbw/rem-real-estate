import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { AdminPortal } from './components/AdminPortal';
import { InvestmentHub } from './components/InvestmentHub';
import { PortfolioView } from './components/PortfolioView';
import { InvestModal } from './components/InvestModal';
import { AuthModal } from './components/AuthModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { 
  Building2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin,
  RotateCcw,
  Lock
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    properties, 
    activeTab, 
    setActiveTab,
    currentUser,
    setIsAdminAuthModalOpen,
    selectedProperty, 
    setSelectedProperty,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    cityFilter,
    setCityFilter,
    maxBudgetFilter,
    setMaxBudgetFilter,
    minScoreFilter,
    setMinScoreFilter,
    bhkFilter,
    setBhkFilter,
    listingTypeFilter,
    setListingTypeFilter,
    propertyTypeFilter,
    setPropertyTypeFilter,
    preLaunchOnly,
    setPreLaunchOnly
  } = useApp();

  const [sortBy, setSortBy] = useState('score_desc');
  const [statusFilter, setStatusFilter] = useState('all');

  // Strict route protection: ensure non-admins never view admin portal
  React.useEffect(() => {
    if (activeTab === 'admin' && currentUser.role !== 'admin') {
      setActiveTab('properties');
    }
  }, [activeTab, currentUser.role, setActiveTab]);

  // Filter Properties
  const filteredProperties = properties.filter(prop => {
    // 1. Listing Type (For Sale vs For Rent)
    if (listingTypeFilter === 'sale' && prop.listingType === 'rent') return false;
    if (listingTypeFilter === 'rent' && prop.listingType !== 'rent') return false;

    // 2. Property Type (Apartments, Villas, Plots, Penthouses, Commercial)
    if (propertyTypeFilter !== 'all') {
      if (prop.propertyType !== propertyTypeFilter) return false;
    }

    // 3. Pre-launch toggle
    if (preLaunchOnly && !prop.isUpcoming && prop.status !== 'Pre-Launch') return false;

    // 4. Category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'upcoming_launch' && !prop.isUpcoming && prop.status !== 'Pre-Launch') return false;
      if (selectedCategory !== 'upcoming_launch' && prop.category !== selectedCategory) return false;
    }

    // 5. Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = 
        prop.title.toLowerCase().includes(q) ||
        prop.developer.toLowerCase().includes(q) ||
        prop.location.locality.toLowerCase().includes(q) ||
        prop.location.city.toLowerCase().includes(q) ||
        prop.dimensions.bhk.toLowerCase().includes(q) ||
        (prop.propertyType && prop.propertyType.toLowerCase().includes(q));
      if (!match) return false;
    }

    // 6. Location Filter (supports South Bengaluru & North Bengaluru zones)
    if (cityFilter !== 'all') {
      const loc = (prop.location.locality + ' ' + prop.location.city).toLowerCase();
      if (cityFilter === 'South Bengaluru') {
        const southKeywords = ['south', 'indiranagar', 'sarjapur', 'bellandur', 'kadubeesanahalli', 'outer ring road', 'lavelle', 'richmond', 'carmelaram', 'koramangala', 'jp nagar'];
        if (!southKeywords.some(k => loc.includes(k))) return false;
      } else if (cityFilter === 'North Bengaluru') {
        const northKeywords = ['north', 'airport', 'expressway', 'devanahalli', 'yelahanka', 'hebbal', 'whitefield', 'hope farm'];
        if (!northKeywords.some(k => loc.includes(k))) return false;
      } else if (prop.location.city !== cityFilter) {
        return false;
      }
    }

    // 7. Budget Filter (for rent vs sale)
    if (listingTypeFilter === 'rent') {
      const rentAmount = prop.monthlyRent || prop.pricing.totalPrice;
      if (maxBudgetFilter < 50000000 && maxBudgetFilter <= 1000000) {
        if (rentAmount > maxBudgetFilter) return false;
      }
    } else {
      if (maxBudgetFilter < 50000000 && prop.pricing.totalPrice > maxBudgetFilter) return false;
    }

    // 8. BHK Filter
    if (bhkFilter !== 'all') {
      const bhkLower = prop.dimensions.bhk.toLowerCase();
      if (bhkFilter === '4+ BHK') {
        if (!bhkLower.includes('4 bhk') && !bhkLower.includes('5 bhk') && !bhkLower.includes('6 bhk')) return false;
      } else if (bhkFilter === 'Commercial') {
        if (!bhkLower.includes('commercial') && prop.propertyType !== 'Commercial') return false;
      } else {
        if (!bhkLower.includes(bhkFilter.toLowerCase())) return false;
      }
    }

    // 9. Status Filter
    if (statusFilter !== 'all' && prop.status !== statusFilter) return false;

    return true;
  });

  // Sort Properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'price_asc') return a.pricing.totalPrice - b.pricing.totalPrice;
    if (sortBy === 'price_desc') return b.pricing.totalPrice - a.pricing.totalPrice;
    if (sortBy === 'area_desc') return b.dimensions.carpetAreaSqFt - a.dimensions.carpetAreaSqFt;
    return 0;
  });

  const handleResetFilters = () => {
    setListingTypeFilter('all');
    setPropertyTypeFilter('all');
    setSelectedCategory('all');
    setPreLaunchOnly(false);
    setCityFilter('all');
    setBhkFilter('all');
    setStatusFilter('all');
    setMaxBudgetFilter(50000000);
    setMinScoreFilter(0);
    setSearchQuery('');
  };

  // Dynamic Section Title
  const getSectionTitle = () => {
    if (preLaunchOnly) return 'Upcoming Pre-Launch Projects';
    if (listingTypeFilter === 'rent') {
      if (selectedCategory === 'commercial' || propertyTypeFilter === 'Commercial') return 'Commercial Properties For Rent & Lease';
      return 'Residential Homes For Rent';
    }
    if (propertyTypeFilter !== 'all') {
      return `${propertyTypeFilter}s For Sale`;
    }
    if (listingTypeFilter === 'sale') return 'Properties For Sale';
    return 'All Verified Properties & Sites';
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'admin' && currentUser.role === 'admin' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AdminPortal />
          </div>
        ) : activeTab === 'invest' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <InvestmentHub />
          </div>
        ) : activeTab === 'portfolio' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <PortfolioView />
          </div>
        ) : (
          <div>
            <HeroBanner />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              
              {/* Category & Multi-dimensional Filter Box */}
              <CategoryFilter
                sortBy={sortBy}
                setSortBy={setSortBy}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />

              {/* Header result counter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    {getSectionTitle()}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Showing {sortedProperties.length} verified listings with 0% brokerage and RERA title checks.
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  {(listingTypeFilter !== 'all' || propertyTypeFilter !== 'all' || preLaunchOnly) && (
                    <button
                      onClick={handleResetFilters}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Clear Nav Filter</span>
                    </button>
                  )}

                  <div className="hidden sm:flex items-center space-x-1.5 text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>100% RERA Verified</span>
                  </div>
                </div>
              </div>

              {/* Properties Grid */}
              {sortedProperties.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto my-8">
                  <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-lg font-black text-slate-900">No properties match your filter</h3>
                  <p className="text-xs text-slate-500 mt-1 mb-6">
                    Try expanding your budget range, resetting your filters, or clearing the search keyword.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    View All Properties
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProperties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}

            </div>
          </div>
        )}
      </main>

      {/* Global Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      <InvestModal />

      {/* Authentication Modal */}
      <AuthModal />
      <AdminLoginModal />

      {/* Minimal Footer */}
      <footer className="bg-slate-950 text-white border-t border-slate-800 pt-12 pb-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
            
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-base shadow-sm">
                  REM
                </div>
                <span className="font-extrabold text-lg text-white">REM Realty</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Data-driven real estate platform for REM. Verified carpet dimensions, 4K video walkthroughs, clear RERA titles, and 0% brokerage.
              </p>
            </div>

            <div className="md:col-span-3 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Explore REM</h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li><button onClick={() => { setListingTypeFilter('sale'); setPropertyTypeFilter('all'); }} className="hover:text-white cursor-pointer">Properties For Sale</button></li>
                <li><button onClick={() => { setListingTypeFilter('rent'); setPropertyTypeFilter('all'); }} className="hover:text-white cursor-pointer">Properties For Rent</button></li>
                <li><button onClick={() => { setPreLaunchOnly(true); }} className="hover:text-white cursor-pointer">Pre-Launch Projects</button></li>
                <li><button onClick={() => { setPropertyTypeFilter('Commercial'); }} className="hover:text-white cursor-pointer">Commercial Tech Parks</button></li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Concierge Desk</h4>
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>+91 80 4000 8000</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>concierge@rem.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>REM Tower, Indiranagar, Bangalore</span>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <p>© 2026 REM Realty. All rights reserved. RERA verified.</p>
            <div className="flex items-center space-x-4 text-[11px]">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <button
                onClick={() => {
                  if (currentUser.role === 'admin') {
                    setActiveTab('admin');
                  } else {
                    setIsAdminAuthModalOpen(true);
                  }
                }}
                className="text-slate-600 hover:text-slate-400 flex items-center space-x-1 cursor-pointer transition-colors"
                title="REM Staff Access"
              >
                <Lock className="w-2.5 h-2.5" />
                <span>Staff Access</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
