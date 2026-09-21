import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  ShieldCheck, 
  User, 
  ChevronDown, 
  Search,
  Calculator,
  TrendingUp,
  Scale,
  Home,
  Briefcase,
  Key,
  Layers,
  Sparkles,
  Trees,
  Check
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currentUser, 
    switchUser, 
    setIsAuthModalOpen,
    searchQuery,
    setSearchQuery,
    setListingTypeFilter,
    listingTypeFilter,
    setPropertyTypeFilter,
    propertyTypeFilter,
    setPreLaunchOnly,
    preLaunchOnly,
    setSelectedCategory,
    selectedCategory,
    setIsLoanCalcModalOpen,
    setIsValuationModalOpen,
    setIsCompareModalOpen,
    compareIds,
    exitAdminMode,
    logoutUser
  } = useApp();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Helper to apply filters & navigate to properties tab
  const handleNavSelection = (config: {
    listingType?: 'all' | 'sale' | 'rent';
    propertyType?: 'all' | 'Apartment' | 'Villa' | 'Plot' | 'Penthouse' | 'Commercial';
    category?: 'all' | 'residential' | 'commercial' | 'land_plots' | 'upcoming_launch';
    preLaunch?: boolean;
  }) => {
    setActiveTab('properties');
    if (config.listingType !== undefined) setListingTypeFilter(config.listingType);
    if (config.propertyType !== undefined) setPropertyTypeFilter(config.propertyType);
    if (config.category !== undefined) setSelectedCategory(config.category);
    if (config.preLaunch !== undefined) setPreLaunchOnly(config.preLaunch);
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-6">
            <div 
              onClick={() => {
                handleNavSelection({ listingType: 'all', propertyType: 'all', category: 'all', preLaunch: false });
              }}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-sm shadow-blue-500/20 group-hover:bg-blue-700 transition-all">
                REM
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg tracking-tight text-slate-900 leading-none">REM</span>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Realty</span>
              </div>
            </div>

            {/* Quick Search */}
            <div className="hidden xl:flex items-center relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search properties, locations..."
                className="pl-8.5 pr-4 py-1.5 bg-slate-100 hover:bg-slate-200/70 focus:bg-white text-xs font-medium text-slate-800 placeholder-slate-400 rounded-full border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all w-52 focus:w-64 outline-none"
              />
            </div>
          </div>

          {/* New Nav Hierarchy */}
          <nav className="hidden md:flex items-center space-x-1">
            
            {/* 1. PROPERTIES DROPDOWN */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('properties')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavSelection({ listingType: 'all', propertyType: 'all', category: 'all', preLaunch: false })}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeDropdown === 'properties' || (activeTab === 'properties' && propertyTypeFilter === 'all' && !preLaunchOnly && selectedCategory === 'all')
                    ? 'bg-slate-100 text-blue-600'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                <span>Properties</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeDropdown === 'properties' && (
                <div className="absolute left-0 mt-1 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Browse Properties
                  </div>
                  <button
                    onClick={() => handleNavSelection({ listingType: 'sale', propertyType: 'all', category: 'all', preLaunch: false })}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-slate-50 flex items-center justify-between ${
                      listingTypeFilter === 'sale' && propertyTypeFilter === 'all' && !preLaunchOnly ? 'text-blue-600 bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>For Sale</span>
                    {listingTypeFilter === 'sale' && propertyTypeFilter === 'all' && !preLaunchOnly && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                  <button
                    onClick={() => handleNavSelection({ listingType: 'rent', propertyType: 'all', category: 'all', preLaunch: false })}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-slate-50 flex items-center justify-between ${
                      listingTypeFilter === 'rent' && propertyTypeFilter === 'all' ? 'text-blue-600 bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>For Rent</span>
                    {listingTypeFilter === 'rent' && propertyTypeFilter === 'all' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                  <button
                    onClick={() => handleNavSelection({ preLaunch: true, propertyType: 'all', listingType: 'all', category: 'all' })}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-slate-50 flex items-center justify-between ${
                      preLaunchOnly ? 'text-blue-600 bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>Pre-Launch</span>
                    {preLaunchOnly && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                  <button
                    onClick={() => handleNavSelection({ category: 'commercial', propertyType: 'Commercial', listingType: 'all', preLaunch: false })}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-slate-50 flex items-center justify-between ${
                      propertyTypeFilter === 'Commercial' ? 'text-blue-600 bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>Commercial</span>
                    {propertyTypeFilter === 'Commercial' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* 2. BUY DROPDOWN */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('buy')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeDropdown === 'buy' || (listingTypeFilter === 'sale' && propertyTypeFilter !== 'all')
                    ? 'bg-slate-100 text-blue-600'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                <span>Buy</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeDropdown === 'buy' && (
                <div className="absolute left-0 mt-1 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Buy Residential & Plots
                  </div>
                  <button
                    onClick={() => handleNavSelection({ listingType: 'sale', propertyType: 'Apartment', category: 'all', preLaunch: false })}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-slate-50 flex items-center justify-between ${
                      listingTypeFilter === 'sale' && propertyTypeFilter === 'Apartment' ? 'text-blue-600 bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>Apartments</span>
                    {listingTypeFilter === 'sale' && propertyTypeFilter === 'Apartment' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                  <button
                    onClick={() => handleNavSelection({ listingType: 'sale', propertyType: 'Villa', category: 'all', preLaunch: false })}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-slate-50 flex items-center justify-between ${
                      listingTypeFilter === 'sale' && propertyTypeFilter === 'Villa' ? 'text-blue-600 bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>Villas</span>
                    {listingTypeFilter === 'sale' && propertyTypeFilter === 'Villa' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                  <button
                    onClick={() => handleNavSelection({ listingType: 'sale', propertyType: 'Plot', category: 'land_plots', preLaunch: false })}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-slate-50 flex items-center justify-between ${
                      propertyTypeFilter === 'Plot' ? 'text-blue-600 bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>Plots</span>
                    {propertyTypeFilter === 'Plot' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                  <button
                    onClick={() => handleNavSelection({ listingType: 'sale', propertyType: 'Penthouse', category: 'all', preLaunch: false })}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-slate-50 flex items-center justify-between ${
                      propertyTypeFilter === 'Penthouse' ? 'text-blue-600 bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>Penthouses</span>
                    {propertyTypeFilter === 'Penthouse' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* 3. RENT DROPDOWN */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('rent')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeDropdown === 'rent' || (listingTypeFilter === 'rent')
                    ? 'bg-slate-100 text-blue-600'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                <span>Rent</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeDropdown === 'rent' && (
                <div className="absolute left-0 mt-1 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Rent Properties
                  </div>
                  <button
                    onClick={() => handleNavSelection({ listingType: 'rent', category: 'residential', propertyType: 'all', preLaunch: false })}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-slate-50 flex items-center justify-between ${
                      listingTypeFilter === 'rent' && selectedCategory === 'residential' ? 'text-blue-600 bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>Residential</span>
                    {listingTypeFilter === 'rent' && selectedCategory === 'residential' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                  <button
                    onClick={() => handleNavSelection({ listingType: 'rent', category: 'commercial', propertyType: 'Commercial', preLaunch: false })}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-slate-50 flex items-center justify-between ${
                      listingTypeFilter === 'rent' && selectedCategory === 'commercial' ? 'text-blue-600 bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>Commercial</span>
                    {listingTypeFilter === 'rent' && selectedCategory === 'commercial' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* 4. INVEST IN PROPERTIES - KEY FEATURE */}
            <button
              onClick={() => setActiveTab('invest')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                activeTab === 'invest'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'text-blue-700 bg-blue-50 hover:bg-blue-100/90 border border-blue-200 hover:border-blue-400'
              }`}
              title="Invest in High-Yield Pre-Leased Commercial & Residential Real Estate"
            >
              <TrendingUp className={`w-3.5 h-3.5 ${activeTab === 'invest' ? 'text-white' : 'text-blue-600'}`} />
              <span>Co-Own Properties</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase tracking-wider ${
                activeTab === 'invest' ? 'bg-blue-800 text-white' : 'bg-blue-100 text-blue-800'
              }`}>
                Earn Rent
              </span>
            </button>

            {/* 5. TOOLS DROPDOWN */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('tools')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeDropdown === 'tools'
                    ? 'bg-slate-100 text-blue-600'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                <span>Tools</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeDropdown === 'tools' && (
                <div className="absolute left-0 mt-1 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Calculators & Valuation
                  </div>
                  <button
                    onClick={() => {
                      setIsLoanCalcModalOpen(true);
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center space-x-2.5 transition-all cursor-pointer"
                  >
                    <Calculator className="w-4 h-4 text-blue-600" />
                    <span>Loan Calculator</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsValuationModalOpen(true);
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center space-x-2.5 transition-all cursor-pointer"
                  >
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Property Valuation</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsCompareModalOpen(true);
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center justify-between transition-all cursor-pointer"
                  >
                    <div className="flex items-center space-x-2.5">
                      <Scale className="w-4 h-4 text-indigo-600" />
                      <span>Compare</span>
                    </div>
                    {compareIds.length > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-800">
                        {compareIds.length}
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>

          </nav>

          {/* Right Actions: Admin Console & Profile */}
          <div className="flex items-center space-x-3">
            
            {/* Admin Console Button - ONLY visible when authenticated as Admin */}
            {currentUser.role === 'admin' && (
              <button
                onClick={() => setActiveTab(activeTab === 'admin' ? 'properties' : 'admin')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Console</span>
              </button>
            )}

            {/* Profile Dropdown */}
            <div className="relative">
              <div 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 py-1 px-2 rounded-full border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs cursor-pointer transition-all"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover border border-slate-200"
                />
                <span className="text-xs font-bold text-slate-800 hidden sm:inline max-w-[120px] truncate">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>

              {isProfileMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2.5 px-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setIsProfileMenuOpen(false)}
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 mb-1.5">
                    <p className="text-[11px] text-slate-400 font-semibold">Signed in as</p>
                    <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{currentUser.email}</p>
                    <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      currentUser.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {currentUser.role === 'admin' ? '🛡️ REM Operations Admin' : '🏡 Verified Homebuyer'}
                    </span>
                  </div>

                  {/* Admin-only controls */}
                  {currentUser.role === 'admin' ? (
                    <div className="space-y-1">
                      <p className="px-3 text-[10px] font-bold text-purple-600 uppercase tracking-wider">
                        Admin Controls:
                      </p>
                      <button
                        onClick={() => { setActiveTab('admin'); setIsProfileMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-purple-700 hover:bg-purple-50 flex items-center space-x-2 cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                        <span>Open Admin Console</span>
                      </button>
                      <button
                        onClick={() => { setActiveTab('properties'); setIsProfileMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center space-x-2 cursor-pointer"
                      >
                        <Home className="w-3.5 h-3.5 text-slate-500" />
                        <span>View Buyer Catalog</span>
                      </button>
                      <div className="border-t border-slate-100 pt-1 mt-1">
                        <button
                          onClick={() => { exitAdminMode(); setIsProfileMenuOpen(false); }}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center space-x-2 cursor-pointer"
                        >
                          <span>Exit Admin Session</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Buyer Menu: strictly buyer features, zero admin access */
                    <div className="space-y-1">
                      <button
                        onClick={() => { setActiveTab('portfolio'); setIsProfileMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 hover:bg-emerald-50 flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                          <span>My Investments</span>
                        </div>
                        {currentUser.investments.length > 0 && (
                          <span className="font-bold text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                            {currentUser.investments.length} Active
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => { setIsAuthModalOpen(true); setIsProfileMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-2 cursor-pointer"
                      >
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>Switch Account / Sign In</span>
                      </button>
                      <button
                        onClick={() => { logoutUser(); setIsProfileMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center space-x-2 cursor-pointer"
                      >
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center justify-between py-2 border-t border-slate-100 text-xs font-bold text-slate-700 overflow-x-auto space-x-2">
          <button
            onClick={() => setActiveTab('invest')}
            className={`px-2.5 py-1 rounded-lg shrink-0 font-black flex items-center space-x-1 ${
              activeTab === 'invest' 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-50 text-blue-800 border border-blue-200'
            }`}
          >
            <span>Invest in Properties</span>
          </button>
          <button
            onClick={() => handleNavSelection({ listingType: 'all', propertyType: 'all', category: 'all', preLaunch: false })}
            className={`px-2.5 py-1 rounded-lg shrink-0 ${activeTab === 'properties' && listingTypeFilter === 'all' && propertyTypeFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100'}`}
          >
            All Properties
          </button>
          <button
            onClick={() => handleNavSelection({ listingType: 'sale' })}
            className={`px-2.5 py-1 rounded-lg shrink-0 ${listingTypeFilter === 'sale' ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}
          >
            For Sale
          </button>
          <button
            onClick={() => handleNavSelection({ listingType: 'rent' })}
            className={`px-2.5 py-1 rounded-lg shrink-0 ${listingTypeFilter === 'rent' ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}
          >
            For Rent
          </button>
          <button
            onClick={() => handleNavSelection({ preLaunch: true })}
            className={`px-2.5 py-1 rounded-lg shrink-0 ${preLaunchOnly ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}
          >
            Pre-Launch
          </button>
          <button
            onClick={() => setIsLoanCalcModalOpen(true)}
            className="px-2.5 py-1 rounded-lg shrink-0 bg-blue-50 text-blue-700"
          >
            Loan Calc
          </button>
          <button
            onClick={() => setIsValuationModalOpen(true)}
            className="px-2.5 py-1 rounded-lg shrink-0 bg-emerald-50 text-emerald-700"
          >
            Valuation
          </button>
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="px-2.5 py-1 rounded-lg shrink-0 bg-indigo-50 text-indigo-700"
          >
            Compare ({compareIds.length})
          </button>
        </div>

      </div>
    </header>
  );
};
