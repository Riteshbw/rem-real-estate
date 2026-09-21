import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR, formatNumber } from '../utils/formatters';
import { 
  Building2, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  HeartHandshake,
  Wallet,
  CalendarCheck,
  CheckCircle2
} from 'lucide-react';

export const InvestmentHub: React.FC = () => {
  const { 
    properties, 
    setSelectedProperty, 
    setIsInvestModalOpen, 
    setInvestTargetProperty,
    setActiveTab,
    currentUser 
  } = useApp();

  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Filter properties with investment options
  const investableProperties = properties.filter(p => p.investment?.isInvestable);

  const faqs = [
    {
      q: "How does co-investing in a property work?",
      a: "Instead of one person needing Crores to buy a property, multiple people come together to co-own it. Each person puts in what they're comfortable with (starting from ₹50,000). You get legal proof of your share and receive your portion of the rent every month."
    },
    {
      q: "When and how do I receive my rent?",
      a: "The properties are already rented out to reputable corporate or commercial tenants. Your share of the rent is transferred directly to your bank account on the 5th of every month via NEFT."
    },
    {
      q: "How do I make a profit when the property is sold?",
      a: "Real estate properties naturally grow in market value. After a 3 to 5 year period, the property is either sold or refinanced at the higher market value. You get your original money back plus your share of the capital gain profit."
    },
    {
      q: "What if I want to withdraw my money early?",
      a: "After an initial 12-month period, you can easily transfer or sell your share to another buyer through REM's portal at current market valuation."
    },
    {
      q: "Who takes care of property repairs, tenants, and maintenance?",
      a: "REM handles 100% of the day-to-day operations—tenant management, rent collection, property tax, and maintenance. You simply enjoy passive monthly rent with zero landlord headaches."
    }
  ];

  return (
    <div className="space-y-10 pb-16">
      
      {/* 1. Humanized Friendly Hero Banner */}
      <div className="relative rounded-3xl bg-slate-900 text-white p-8 sm:p-12 overflow-hidden border border-slate-800 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-400/30">
            <HeartHandshake className="w-4 h-4" />
            <span>Co-Own Real Estate With Others</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Own Great Properties Together. <br />
            <span className="text-blue-400">
              Collect Rent Every Month.
            </span>
          </h1>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Real estate has always been one of the safest ways to grow wealth, but buying an entire commercial property alone requires Crores. Now, you can pool in with others, start with as little as <strong className="text-white font-bold">₹50,000</strong>, and get regular monthly rent sent straight to your bank account.
          </p>

          {/* Quick Highlight Pills */}
          <div className="mt-6 flex flex-wrap gap-2.5 text-xs font-semibold text-slate-200">
            <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 flex items-center space-x-1.5">
              <span>💸 Monthly Rent Direct to Bank</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 flex items-center space-x-1.5">
              <span>📈 Share in Property Value Growth</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 flex items-center space-x-1.5">
              <span>🛡️ 100% Verified Legal Ownership</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 flex items-center space-x-1.5">
              <span>✨ Zero Landlord Work</span>
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3.5 items-center">
            <button
              onClick={() => {
                const el = document.getElementById('properties-catalog');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/25 cursor-pointer flex items-center space-x-2"
            >
              <span>See Available Properties</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider border border-slate-700 transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <Users className="w-4 h-4 text-blue-400" />
              <span>My Investments</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. 3 Easy Steps: How It Works */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Simple &amp; Transparent</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            How It Works in 3 Simple Steps
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            No complicated jargon, no hidden fees. Just straightforward property co-ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-4 shadow-xs">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">
              Pick a Property You Like
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore handpicked tech offices, retail spaces, and suites with established tenants already paying rent.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-4 shadow-xs">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">
              Choose How Much to Put In
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Start with whatever fits your budget—from ₹50,000 to ₹5 Lakhs+. You receive official legal documentation for your share.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-4 shadow-xs">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">
              Relax &amp; Collect Your Rent
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your share of the rent arrives in your bank account every month. When the property is sold later, you receive your full capital profit.
            </p>
          </div>

        </div>
      </div>

      {/* 3. Available Properties Catalog */}
      <div id="properties-catalog" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Properties Open for Co-Investing
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pre-vetted properties with verified titles and reliable rental tenants in Bengaluru.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200 self-start sm:self-auto">
            {investableProperties.length} Properties Available
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {investableProperties.map(property => {
            const inv = property.investment!;
            const minTicket = inv.minTicketSize || 50000;
            const fundedPct = inv.fundedPercentage || 70;
            const coInvestorsCount = inv.coInvestors?.length || 6;

            return (
              <div 
                key={property.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-blue-400 group"
              >
                <div>
                  {/* Property Cover Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-600 text-white shadow-xs">
                        ~{inv.grossRentalYieldPercentage}% Yearly Rent
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-md">
                        Start with {formatINR(minTicket)}
                      </span>
                    </div>

                    <div className="absolute bottom-3 inset-x-3 text-white">
                      <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider block">
                        Tenant
                      </span>
                      <p className="text-xs font-bold text-white line-clamp-1">
                        {inv.tenantProfile || 'Blue-Chip Corporate Tenant'}
                      </p>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
                      <span>{property.developer}</span>
                      <span className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-semibold">
                        {property.location.locality}, {property.location.city}
                      </span>
                    </div>

                    <h3 
                      onClick={() => setSelectedProperty(property)}
                      className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
                    >
                      {property.title}
                    </h3>
                    
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {property.tagline || property.description}
                    </p>

                    {/* Progress Bar & Community Co-Owners */}
                    <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="flex justify-between items-center text-xs font-bold mb-2">
                        <span className="text-slate-700 flex items-center space-x-1.5">
                          <Users className="w-3.5 h-3.5 text-blue-600" />
                          <span>Joined by {coInvestorsCount} co-owners</span>
                        </span>
                        <span className="text-blue-600 font-black">{fundedPct}% Funded</span>
                      </div>
                      
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                          style={{ width: `${Math.min(100, fundedPct)}%` }}
                        />
                      </div>
                      
                      <div className="mt-2 text-[10px] text-slate-500 flex justify-between font-semibold">
                        <span>Total Property: {formatINR(property.pricing.totalPrice)}</span>
                        <span>Rent Paid: Monthly (5th)</span>
                      </div>
                    </div>

                    {/* Human Highlights */}
                    <div className="grid grid-cols-2 gap-2 mt-4 text-center">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Minimum to Join</span>
                        <span className="text-sm font-black text-slate-900">
                          {formatINR(minTicket)}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100">
                        <span className="text-[10px] font-bold text-blue-700 uppercase block">Expected Annual Rent</span>
                        <span className="text-sm font-black text-blue-800">
                          {inv.grossRentalYieldPercentage}% / yr
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-6 pt-0 flex space-x-2">
                  <button
                    onClick={() => setSelectedProperty(property)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => {
                      setInvestTargetProperty(property);
                      setIsInvestModalOpen(true);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center justify-center space-x-1"
                  >
                    <span>Invest in Property</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* 4. Common Questions */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
              Clear &amp; Simple
            </span>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Common Questions About Co-Investing
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Everything you and your friends need to know to get started.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = expandedFaqIndex === i;
              return (
                <div 
                  key={i} 
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setExpandedFaqIndex(isOpen ? null : i)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between font-bold text-slate-900 text-xs sm:text-sm hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Friendly Help Box */}
          <div className="mt-8 p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-7 h-7 text-blue-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Want to invest together with friends?</h4>
                <p className="text-[11px] text-slate-500">Our concierge team can help structure private group investments.</p>
              </div>
            </div>
            <a
              href="mailto:support@remrealty.com"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl whitespace-nowrap transition-colors"
            >
              Talk to Us
            </a>
          </div>

        </div>
      </div>

    </div>
  );
};
