import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building, 
  MapPin, 
  Search, 
  Home, 
  Briefcase, 
  Trees, 
  Rocket, 
  Key, 
  Layers, 
  Crown,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const HERO_SLIDESHOW_IMAGES = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', // Luxury villa with pool
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', // Modern architecture home
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', // Elegant interior living
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', // Modern apartment tower
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', // Contemporary residence
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80', // Gated land plots & green scape
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', // Grade-A commercial tech park
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'  // Luxury duplex balcony view
];

interface NavPill {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  isActive: boolean;
  tag?: string;
}

export const HeroBanner: React.FC = () => {
  const { 
    listingTypeFilter,
    setListingTypeFilter,
    propertyTypeFilter,
    setPropertyTypeFilter,
    preLaunchOnly,
    setPreLaunchOnly,
    setSelectedCategory,
    cityFilter, 
    setCityFilter, 
    searchQuery, 
    setSearchQuery,
    setActiveTab
  } = useApp();

  const navPills: NavPill[] = [
    { 
      id: 'all', 
      label: 'All Properties', 
      icon: <Building className="w-3.5 h-3.5" />,
      action: () => {
        setListingTypeFilter('all');
        setPropertyTypeFilter('all');
        setSelectedCategory('all');
        setPreLaunchOnly(false);
      },
      isActive: listingTypeFilter === 'all' && propertyTypeFilter === 'all' && !preLaunchOnly
    },
    { 
      id: 'for_sale', 
      label: 'For Sale', 
      icon: <Home className="w-3.5 h-3.5" />,
      action: () => {
        setListingTypeFilter('sale');
        setPropertyTypeFilter('all');
        setPreLaunchOnly(false);
      },
      isActive: listingTypeFilter === 'sale' && propertyTypeFilter === 'all' && !preLaunchOnly
    },
    { 
      id: 'for_rent', 
      label: 'For Rent', 
      icon: <Key className="w-3.5 h-3.5" />,
      action: () => {
        setListingTypeFilter('rent');
        setPropertyTypeFilter('all');
        setPreLaunchOnly(false);
      },
      isActive: listingTypeFilter === 'rent'
    },
    { 
      id: 'flats', 
      label: 'Flats', 
      icon: <Layers className="w-3.5 h-3.5" />,
      action: () => {
        setPropertyTypeFilter('Apartment');
        setListingTypeFilter('sale');
        setPreLaunchOnly(false);
      },
      isActive: propertyTypeFilter === 'Apartment'
    },
    { 
      id: 'villas', 
      label: 'Villas', 
      icon: <Home className="w-3.5 h-3.5" />,
      action: () => {
        setPropertyTypeFilter('Villa');
        setListingTypeFilter('sale');
        setPreLaunchOnly(false);
      },
      isActive: propertyTypeFilter === 'Villa'
    },
    { 
      id: 'plots', 
      label: 'Plots', 
      icon: <Trees className="w-3.5 h-3.5" />,
      action: () => {
        setPropertyTypeFilter('Plot');
        setListingTypeFilter('sale');
        setPreLaunchOnly(false);
      },
      isActive: propertyTypeFilter === 'Plot'
    },
    { 
      id: 'penthouses', 
      label: 'Penthouses', 
      icon: <Crown className="w-3.5 h-3.5" />,
      action: () => {
        setPropertyTypeFilter('Penthouse');
        setListingTypeFilter('sale');
        setPreLaunchOnly(false);
      },
      isActive: propertyTypeFilter === 'Penthouse'
    },
    { 
      id: 'commercial', 
      label: 'Commercial', 
      icon: <Briefcase className="w-3.5 h-3.5" />,
      action: () => {
        setPropertyTypeFilter('Commercial');
        setListingTypeFilter('all');
        setPreLaunchOnly(false);
      },
      isActive: propertyTypeFilter === 'Commercial'
    },
    { 
      id: 'invest', 
      label: 'Invest in Properties', 
      icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />,
      action: () => {
        setActiveTab('invest');
      },
      isActive: false,
      tag: 'Earn 8-14%'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDESHOW_IMAGES.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-8 pb-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      
      {/* Subtle Right-Side Background Slideshow */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[55%] pointer-events-none overflow-hidden z-0">
        {HERO_SLIDESHOW_IMAGES.map((imgUrl, idx) => (
          <img
            key={imgUrl}
            src={imgUrl}
            alt="REM real estate ambient background"
            className={`absolute inset-0 w-full h-full object-cover grayscale brightness-75 contrast-125 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-20' : 'opacity-0'
            }`}
          />
        ))}

        {/* Gradient masks: fade seamlessly into left text and bottom borders */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-950" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Headline */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
            Buy, Rent &amp; Pre-Launch Properties.
          </h1>
          <p className="mt-3 text-slate-300 text-xs sm:text-sm font-normal leading-relaxed max-w-3xl">
            Explore luxury penthouses, gated villa plots, modern apartments, and commercial tech parks. Verified carpet dimensions, high-definition video walkthroughs, and guaranteed clear titles.
          </p>
        </div>

        {/* Search properties below indicator */}
        <div className="mt-6 flex items-center space-x-1.5 text-xs font-bold text-slate-300">
          <span>Search properties below</span>
          <span className="text-sm">👇</span>
        </div>

        {/* Floating Search & Navigation Pills Box */}
        <div className="mt-2.5 p-4 rounded-2xl bg-white text-slate-900 shadow-xl border border-slate-200">
          
          {/* Navigation Category Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-3 mb-3 border-b border-slate-100 scrollbar-none">
            {navPills.map(pill => (
              <button
                key={pill.id}
                onClick={pill.action}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  pill.isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{pill.icon}</span>
                <span>{pill.label}</span>
                {pill.tag && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-black ${
                    pill.isActive ? 'bg-sky-400 text-slate-950' : 'bg-amber-100 text-amber-900'
                  }`}>
                    {pill.tag}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by property title, builder, or micromarket..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            <div className="md:col-span-4 relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
              >
                <option value="all">Location</option>
                <option value="South Bengaluru">South Bengaluru</option>
                <option value="North Bengaluru">North Bengaluru</option>
              </select>
            </div>
          </div>

          {/* Property Investment Highlight Strip */}
          <div 
            onClick={() => setActiveTab('invest')}
            className="mt-3.5 px-4 py-2.5 rounded-xl bg-blue-50/70 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer hover:border-emerald-400 hover:shadow-xs transition-all group"
          >
            <div className="flex items-center space-x-2">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping shrink-0" />
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded shrink-0">
                Co-Ownership
              </span>
              <span className="text-xs font-extrabold text-slate-800">
                Property Investments: Co-own high-yield commercial &amp; residential properties starting from ₹50,000. Earn monthly rent + capital appreciation!
              </span>
            </div>
            <div className="flex items-center space-x-1 text-xs font-black text-blue-600 group-hover:translate-x-0.5 transition-transform self-end sm:self-auto shrink-0">
              <span>Explore Co-Ownership</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
