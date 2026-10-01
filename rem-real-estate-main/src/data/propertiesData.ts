import { Property, UserProfile } from '../types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'rem-prop-invest-01',
    title: 'REM Silicon Nexus Commercial Tech Hub (Floor 4)',
    developer: 'REM Commercial Assets',
    tagline: '₹1 Crore Grade-A Tech Hub pre-leased to Fortune 500 MNC • 10-Share Pool @ ₹10L/Share',
    description: 'A Grade-A institutional IT park workspace in Bengaluru’s high-growth Outer Ring Road corridor. 100% pre-leased to Deloitte Digital & AWS Innovation Lab under a 9-year corporate lock-in lease with 15% escalation every 3 years. Structured as an exclusive 10-share fractional pool for 10 co-owners.',
    category: 'high_yield_investment',
    status: 'High Yield Active',
    isUpcoming: false,
    listingType: 'sale',
    propertyType: 'Commercial',
    possessionDate: 'Immediate Income Generating',
    pricing: {
      totalPrice: 10000000, // ₹1.00 Crore
      pricePerSqFt: 8850,
      estimatedEmiMonthly: 0,
      maintenancePerMonth: 8500,
      stampDutyAndReg: 700000,
      bookingTokenAmount: 100000,
    },
    dimensions: {
      carpetAreaSqFt: 1130,
      superBuiltUpSqFt: 1350,
      efficiencyPercentage: 84,
      bhk: 'Commercial Tech Floor (1,350 sft)',
      ceilingHeightFt: 13.0,
      facing: 'North-East',
      floorLevel: 'Floor 4 of 12 Floors',
      totalUnitsInProject: 10,
    },
    location: {
      locality: 'Outer Ring Road (ORR) - Bellandur',
      city: 'Bangalore',
      state: 'Karnataka',
      landmark: 'Opposite EcoWorld Technology Park',
      nearestMetroDistanceKm: 0.4,
      airportDistanceKm: 38,
      walkScore: 94,
      lat: 12.9279,
      lng: 77.6845,
    },
    peaceOfMind: {
      overall: 97,
      builderCredibility: 98,
      projectEfficiency: 95,
      legalClearance: 99,
      appreciationPotential: 96,
      reraId: 'PRM/KA/RERA/COMM/2024/009121',
      pros: [
        '10-person fractional ownership: exactly 10 equal shares of ₹10 Lakhs each',
        '9-year corporate lease with Fortune 500 tech tenant with zero rent default risk',
        'Direct monthly rental payout credited to your bank account on the 5th of every month',
        'Clear title deed registered under a dedicated SPV with full RERA compliance'
      ],
      cons: [
        'Only 3 of 10 shares remaining for co-investment allotment'
      ]
    },
    investment: {
      isInvestable: true,
      isFractionalPool: true,
      totalShares: 10,
      soldShares: 7,
      sharePrice: 1000000, // ₹10 Lakhs per share
      poolTotalValuation: 10000000, // ₹1.00 Crore
      minTicketSize: 1000000, // ₹10 Lakhs
      grossRentalYieldPercentage: 9.6, // 9.6% p.a.
      projectedIRRPercentage: 18.2,
      tenureYears: 4,
      distributionFrequency: 'Monthly',
      fundedPercentage: 70,
      monthlyPayoutPerShare: 8000, // ₹8,000 / month / share
      projectedExitPayoutPerShare: 1450000, // ₹14.5 Lakhs after 4 years (+₹4.5L appreciation)
      tenantProfile: 'Deloitte Digital & AWS Solutions (9-Yr Triple Net Lease)',
      capitalAppreciationForecast: [
        { year: 2026, projectedValue: 10000000 },
        { year: 2027, projectedValue: 10900000 },
        { year: 2028, projectedValue: 11950000 },
        { year: 2029, projectedValue: 13150000 },
        { year: 2030, projectedValue: 14500000 },
      ],
      coInvestors: [
        { slot: 1, investorName: 'Rahul Sharma', location: 'Bengaluru', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', sharesCount: 1, date: '2026-01-18' },
        { slot: 2, investorName: 'Priya Mukherjee', location: 'Mumbai', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', sharesCount: 1, date: '2026-01-22' },
        { slot: 3, investorName: 'Vikramaditya Rao', location: 'Hyderabad', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', sharesCount: 1, date: '2026-02-05' },
        { slot: 4, investorName: 'Sunita Reddy', location: 'Chennai', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80', sharesCount: 1, date: '2026-02-12' },
        { slot: 5, investorName: 'Aditya Mehta', location: 'Pune', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', sharesCount: 1, date: '2026-02-28' },
        { slot: 6, investorName: 'Kavita Chawla', location: 'Delhi NCR', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80', sharesCount: 1, date: '2026-03-02' },
        { slot: 7, investorName: 'Gaurav Kulkarni', location: 'Bengaluru', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80', sharesCount: 1, date: '2026-03-10' },
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    videoTourUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-office-space-with-tables-and-chairs-41682-large.mp4',
    floorPlanUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    amenities: [
      'Pre-Leased to Blue-Chip Fortune 500 Tenant',
      'Direct SPV Legal Co-Ownership Certificate',
      'Monthly Rental Payout on 5th via NEFT',
      '4-Year Liquidity Exit Guarantee',
      '100% DG Power & Leased Fiber Grid'
    ],
    specs: {
      flooring: 'Heavy-duty raised anti-static technical tile',
      powerBackup: '100% N+1 Cummins generators with 48-hr backup',
      waterSupply: '24/7 commercial pipeline with filtration plant',
      parking: 'Reserved basement bays',
      security: '24/7 CCTV surveillance & biometric access'
    },
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'rem-prop-invest-02',
    title: 'REM Indiranagar 100ft High-Street Retail Galleria',
    developer: 'REM Commercial Assets',
    tagline: '₹1 Crore prime corner retail storefront pre-leased to Blue Tokai • 10-Share Pool @ ₹10L/Share',
    description: 'Ultra-prime corner retail unit in Bengaluru’s premier commercial corridor. 100% pre-leased to premium specialty brand with strong footfall and long-term lease agreement. Formed as a 10-share co-investment syndicate of ₹10 Lakhs each.',
    category: 'high_yield_investment',
    status: 'High Yield Active',
    isUpcoming: false,
    listingType: 'sale',
    propertyType: 'Commercial',
    possessionDate: 'Immediate Income Generating',
    pricing: {
      totalPrice: 10000000, // ₹1.00 Crore
      pricePerSqFt: 12500,
      estimatedEmiMonthly: 0,
      maintenancePerMonth: 6000,
      stampDutyAndReg: 700000,
      bookingTokenAmount: 100000,
    },
    dimensions: {
      carpetAreaSqFt: 800,
      superBuiltUpSqFt: 960,
      efficiencyPercentage: 83,
      bhk: 'High-Street Retail Storefront',
      ceilingHeightFt: 16.0,
      facing: 'North-East Corner',
      floorLevel: 'Ground Floor Galleria',
      totalUnitsInProject: 10,
    },
    location: {
      locality: 'Indiranagar 100ft Road',
      city: 'Bangalore',
      state: 'Karnataka',
      landmark: 'Next to 100ft Road Metro Junction',
      nearestMetroDistanceKm: 0.3,
      airportDistanceKm: 34,
      walkScore: 98,
      lat: 12.9782,
      lng: 77.6415,
    },
    peaceOfMind: {
      overall: 96,
      builderCredibility: 97,
      projectEfficiency: 93,
      legalClearance: 99,
      appreciationPotential: 97,
      reraId: 'PRM/KA/RERA/COMM/2024/007412',
      pros: [
        '10-share syndication pool for ₹1 Crore high-demand retail asset',
        'Top-tier coffee & lifestyle retailer pre-leased for 7 years',
        '10.2% gross rental yield with monthly payouts of ₹8,500 per share',
        'Projected exit appreciation to ₹14.8 Lakhs per share (+48% gain)'
      ],
      cons: [
        '5 of 10 shares already committed'
      ]
    },
    investment: {
      isInvestable: true,
      isFractionalPool: true,
      totalShares: 10,
      soldShares: 5,
      sharePrice: 1000000, // ₹10 Lakhs
      poolTotalValuation: 10000000, // ₹1.00 Crore
      minTicketSize: 1000000,
      grossRentalYieldPercentage: 10.2, // 10.2% p.a.
      projectedIRRPercentage: 19.4,
      tenureYears: 4,
      distributionFrequency: 'Monthly',
      fundedPercentage: 50,
      monthlyPayoutPerShare: 8500, // ₹8,500 / month / share
      projectedExitPayoutPerShare: 1480000, // ₹14.8 Lakhs exit (+₹4.8L appreciation)
      tenantProfile: 'Blue Tokai Specialty Coffee & Lifestyle Brand',
      capitalAppreciationForecast: [
        { year: 2026, projectedValue: 10000000 },
        { year: 2027, projectedValue: 11000000 },
        { year: 2028, projectedValue: 12100000 },
        { year: 2029, projectedValue: 13400000 },
        { year: 2030, projectedValue: 14800000 },
      ],
      coInvestors: [
        { slot: 1, investorName: 'Ramesh Sundaram', location: 'Bengaluru', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', sharesCount: 1, date: '2026-02-01' },
        { slot: 2, investorName: 'Deepa Narang', location: 'Chandigarh', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80', sharesCount: 1, date: '2026-02-14' },
        { slot: 3, investorName: 'Sanjay Singhania', location: 'Ahmedabad', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', sharesCount: 1, date: '2026-02-22' },
        { slot: 4, investorName: 'Meera Iyer', location: 'Bengaluru', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80', sharesCount: 1, date: '2026-03-01' },
        { slot: 5, investorName: 'Kunal Kapoor', location: 'Delhi', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80', sharesCount: 1, date: '2026-03-08' },
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1200&q=80'
    ],
    videoTourUrl: 'https://assets.mixkit.co/videos/preview/mixkit-shopping-mall-hallway-with-visitors-41480-large.mp4',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    amenities: [
      'Prime Double-Height Corner Frontage',
      'Direct SPV Legal Co-Ownership Certificate',
      'Monthly Rental Payout on 5th via NEFT',
      'Escalator & High Footfall Nexus',
      '24/7 Power Backup & VRV Air Conditioning'
    ],
    specs: {
      flooring: 'Italian terrazzo with brass inlays',
      powerBackup: '100% silent DG backup',
      waterSupply: '24/7 commercial line',
      parking: 'Valet and basement parking',
      security: 'AI-monitored CCTV and guard staff'
    },
    createdAt: '2026-01-20T10:00:00Z'
  },
  {
    id: 'rem-prop-invest-03',
    title: 'REM AeroVille Managed Executive Villa Suite',
    developer: 'REM Signature Projects',
    tagline: '₹1 Crore luxury serviced villa in North Airport Corridor • 10-Share Pool @ ₹10L/Share',
    description: 'A boutique luxury serviced villa suite located in North Bengaluru’s booming International Airport corridor. Professionally managed by premium hospitality operator catering to corporate CXOs and airline dignitaries. Structured as a 10-share fractional pool of ₹10 Lakhs each.',
    category: 'high_yield_investment',
    status: 'High Yield Active',
    isUpcoming: false,
    listingType: 'sale',
    propertyType: 'Villa',
    possessionDate: 'Immediate Income Generating',
    pricing: {
      totalPrice: 10000000, // ₹1.00 Crore
      pricePerSqFt: 6250,
      estimatedEmiMonthly: 0,
      maintenancePerMonth: 7000,
      stampDutyAndReg: 700000,
      bookingTokenAmount: 100000,
    },
    dimensions: {
      carpetAreaSqFt: 1450,
      superBuiltUpSqFt: 1600,
      efficiencyPercentage: 90,
      bhk: '2 BHK Luxury Serviced Villa Suite',
      ceilingHeightFt: 12.0,
      facing: 'East Facing',
      floorLevel: 'Ground + 1 Villa Suite',
      totalUnitsInProject: 10,
    },
    location: {
      locality: 'North Airport Expressway Corridor',
      city: 'Bangalore',
      state: 'Karnataka',
      landmark: 'Near Aerospace & SEZ Park',
      nearestMetroDistanceKm: 2.1,
      airportDistanceKm: 12,
      walkScore: 82,
      lat: 13.1945,
      lng: 77.7021,
    },
    peaceOfMind: {
      overall: 94,
      builderCredibility: 96,
      projectEfficiency: 92,
      legalClearance: 98,
      appreciationPotential: 98,
      reraId: 'PRM/KA/RERA/VILLA/2024/005831',
      pros: [
        '10-person fractional ownership: exactly 10 equal shares of ₹10 Lakhs each',
        'Airport corridor property with massive land capital appreciation potential',
        '9.0% net rental distribution plus free 14-day owner stay voucher per year',
        'Exit projection to ₹14.2 Lakhs per share in 4 years (+42% appreciation gain)'
      ],
      cons: [
        '8 of 10 shares already taken — only 2 slots open'
      ]
    },
    investment: {
      isInvestable: true,
      isFractionalPool: true,
      totalShares: 10,
      soldShares: 8,
      sharePrice: 1000000, // ₹10 Lakhs
      poolTotalValuation: 10000000, // ₹1.00 Crore
      minTicketSize: 1000000,
      grossRentalYieldPercentage: 9.0, // 9.0% p.a.
      projectedIRRPercentage: 17.5,
      tenureYears: 4,
      distributionFrequency: 'Monthly',
      fundedPercentage: 80,
      monthlyPayoutPerShare: 7500, // ₹7,500 / month / share
      projectedExitPayoutPerShare: 1420000, // ₹14.2 Lakhs exit (+₹4.2L appreciation)
      tenantProfile: 'St. Regis Corporate Managed Long-Stay Suites',
      capitalAppreciationForecast: [
        { year: 2026, projectedValue: 10000000 },
        { year: 2027, projectedValue: 10900000 },
        { year: 2028, projectedValue: 11900000 },
        { year: 2029, projectedValue: 13000000 },
        { year: 2030, projectedValue: 14200000 },
      ],
      coInvestors: [
        { slot: 1, investorName: 'Amitabh Sen', location: 'Kolkata', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', sharesCount: 1, date: '2026-01-25' },
        { slot: 2, investorName: 'Natasha Thomas', location: 'Kochi', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80', sharesCount: 1, date: '2026-02-02' },
        { slot: 3, investorName: 'Prateek Gupta', location: 'Bengaluru', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', sharesCount: 1, date: '2026-02-10' },
        { slot: 4, investorName: 'Ritu Agarwal', location: 'Jaipur', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80', sharesCount: 1, date: '2026-02-18' },
        { slot: 5, investorName: 'Varun Joshi', location: 'Bengaluru', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80', sharesCount: 1, date: '2026-02-25' },
        { slot: 6, investorName: 'Shalini Nair', location: 'Trivandrum', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', sharesCount: 1, date: '2026-03-01' },
        { slot: 7, investorName: 'Manoj Patel', location: 'Surat', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', sharesCount: 1, date: '2026-03-05' },
        { slot: 8, investorName: 'Sneha Roy', location: 'Bengaluru', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80', sharesCount: 1, date: '2026-03-09' },
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    videoTourUrl: 'https://assets.mixkit.co/videos/preview/mixkit-lakefront-villa-with-swimming-pool-and-jetty-43110-large.mp4',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
    amenities: [
      '14-Day Owner Stay Voucher Every Year',
      'Direct SPV Legal Co-Ownership Certificate',
      'Monthly Rental Payout on 5th via NEFT',
      'Clubhouse, Infinity Pool & Concierge',
      'High-Growth Airport Investment Corridor'
    ],
    specs: {
      flooring: 'Imported Greek marble and teak finish',
      powerBackup: '100% full solar + DG backup',
      waterSupply: 'Dedicated RO treated line',
      parking: '2 Covered parking slots',
      security: 'Gated community 24/7 security'
    },
    createdAt: '2026-01-25T10:00:00Z'
  },
  {
    id: 'rem-prop-01',
    title: 'REM Skyvillas & Signature Penthouses',
    developer: 'REM Luxury Living',
    tagline: 'Duplex skyvillas with 270° panoramic skyline views & private plunge pools',
    description: 'A masterpiece of architectural innovation situated in the prime corridor. REM Skyvillas offers expansive multi-level residences with private elevators, double-height living ceilings, German Poggenpohl modular kitchens, and private infinity decks.',
    category: 'residential',
    status: 'Ready to Move',
    isUpcoming: false,
    listingType: 'sale',
    propertyType: 'Penthouse',
    possessionDate: 'Immediate / Ready',
    pricing: {
      totalPrice: 42500000, // ₹4.25 Cr
      pricePerSqFt: 11800,
      estimatedEmiMonthly: 368000,
      maintenancePerMonth: 18500,
      stampDutyAndReg: 2975000,
      bookingTokenAmount: 200000,
    },
    dimensions: {
      carpetAreaSqFt: 2950,
      superBuiltUpSqFt: 3600,
      efficiencyPercentage: 82,
      bhk: '4 BHK Duplex Penthouse',
      ceilingHeightFt: 12.5,
      facing: 'North-East (Vaastu Compliant)',
      floorLevel: '28th of 32 Floors',
      totalUnitsInProject: 48,
    },
    location: {
      locality: 'Indiranagar 100ft Road Ext.',
      city: 'Bangalore',
      state: 'Karnataka',
      landmark: 'Next to Golf Meadows Club',
      nearestMetroDistanceKm: 0.8,
      airportDistanceKm: 34,
      walkScore: 92,
      lat: 12.9784,
      lng: 77.6408,
    },
    peaceOfMind: {
      overall: 94,
      builderCredibility: 96,
      projectEfficiency: 88,
      legalClearance: 98,
      appreciationPotential: 92,
      reraId: 'PRM/KA/RERA/1251/310/PR/210405/004120',
      pros: [
        'Exceptional 82% carpet area efficiency with zero dead space',
        'Direct 800m walking access to Purple Line Metro station',
        'Grade-A construction with certified acoustic double-glazed Italian windows',
        'Fully clear title deeds certified by leading tier-1 legal firm'
      ],
      cons: [
        'Premium ticket price limited to ultra-high-net-worth segment',
        'Monthly clubhouse maintenance is above city average due to heated infinity pool'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    videoTourUrl: 'https://assets.mixkit.co/videos/preview/mixkit-living-room-in-a-luxury-home-42407-large.mp4',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
    amenities: [
      'Heated Rooftop Infinity Pool',
      'Private High-Speed Elevator',
      'Automated Home Automation (KNX)',
      'EV Supercharging Bays (3 per unit)',
      'Private Wine Cellar & Cigar Lounge',
      '24/7 Concierge & Valet Desk',
      'Squash Court & TechnoGym Center'
    ],
    specs: {
      flooring: 'Imported Statuario Italian Marble across Living & Dining',
      powerBackup: '100% DG Backup with automatic synchro panel',
      waterSupply: 'Dual water piping system with on-site RO treatment plant',
      parking: '3 Reserved Covered Basement Slots with private EV port',
      security: 'Biometric Smart Locks, 5-Tier Surveillance, Perimeter Laser sensors'
    },
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'rem-prop-02',
    title: 'REM Horizon Tech Park Grade-A (Tower B)',
    developer: 'REM Commercial Assets',
    tagline: 'Premium institutional Grade-A commercial office space for corporate lease',
    description: 'Prime Grade-A commercial office tower situated in the heart of the Silicon Corridor. Fully fitted modern workspace with meeting rooms, cafeteria, and data center provisions.',
    category: 'commercial',
    status: 'Ready to Move',
    isUpcoming: false,
    listingType: 'rent',
    propertyType: 'Commercial',
    monthlyRent: 850000,
    possessionDate: 'Ready for Immediate Fitout',
    pricing: {
      totalPrice: 850000, // Monthly Rent
      pricePerSqFt: 145,
      estimatedEmiMonthly: 0,
      bookingTokenAmount: 25000,
    },
    dimensions: {
      carpetAreaSqFt: 11200,
      superBuiltUpSqFt: 12750,
      efficiencyPercentage: 88,
      bhk: 'Commercial Office Floor (12,750 sft)',
      ceilingHeightFt: 14.0,
      facing: 'North-East',
      floorLevel: 'Floor 6',
      totalUnitsInProject: 8,
    },
    location: {
      locality: 'Outer Ring Road (ORR) - Kadubeesanahalli',
      city: 'Bangalore',
      state: 'Karnataka',
      landmark: 'Opposite Global Tech Gateway',
      nearestMetroDistanceKm: 0.3,
      airportDistanceKm: 42,
      walkScore: 96,
      lat: 12.9352,
      lng: 77.6946,
    },
    peaceOfMind: {
      overall: 96,
      builderCredibility: 98,
      projectEfficiency: 95,
      legalClearance: 99,
      appreciationPotential: 94,
      reraId: 'PRM/KA/RERA/COMM/2024/098421',
      pros: [
        'Direct connection to the ORR Metro interchange station',
        'LEED Platinum green building rating with energy-efficient facade',
        '100% DG power backup and fiber optic redundant internet'
      ],
      cons: [
        'Minimum lock-in lease period of 3 years'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    videoTourUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-office-space-with-tables-and-chairs-41682-large.mp4',
    floorPlanUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    amenities: [
      'LEED Platinum Certified Green Building',
      '100% N+1 Redundant Power & Cooling Grid',
      'Multi-cuisine Food Court & Executive Cafes',
      '24/7 Turnstile Biometric Access Control',
      'EV Fleet Charging Stations (50 bays)'
    ],
    specs: {
      flooring: 'Heavy duty anti-static raised flooring for IT infrastructure',
      powerBackup: '4 x 2000 kVA Cummins generators with 48-hr diesel storage',
      waterSupply: 'Zero Liquid Discharge (ZLD) certified STP facility',
      parking: 'Basement multi-level mechanical parking for 1,200 cars',
      security: 'Cisco Integrated Building Management System & armed security'
    },
    createdAt: '2026-02-01T10:00:00Z'
  },
  {
    id: 'rem-prop-03',
    title: 'The Verdant Groves Luxury Plotted Estate',
    developer: 'REM Green Holdings',
    tagline: 'Gated 40-acre villa community plots with organic orchards & clubhouse',
    description: 'An exclusive low-density plotted retreat designed for custom luxury villas. Set amidst 2,000 mature teak and mahogany trees, this sanctuary combines unpolluted tranquility with rapid capital appreciation.',
    category: 'land_plots',
    status: 'Ready to Move',
    isUpcoming: false,
    listingType: 'sale',
    propertyType: 'Plot',
    possessionDate: 'Ready for Villa Construction',
    pricing: {
      totalPrice: 16500000, // ₹1.65 Cr
      pricePerSqFt: 5500,
      estimatedEmiMonthly: 142000,
      maintenancePerMonth: 4500,
      stampDutyAndReg: 1155000,
      bookingTokenAmount: 100000,
    },
    dimensions: {
      carpetAreaSqFt: 3000,
      superBuiltUpSqFt: 3000,
      efficiencyPercentage: 100,
      bhk: '3,000 Sq.Ft Villa Plot (50x60 ft)',
      facing: 'East Facing',
      floorLevel: 'Independent Plot',
      totalUnitsInProject: 96,
    },
    location: {
      locality: 'North Airport Expressway Corridor',
      city: 'Bangalore',
      state: 'Karnataka',
      landmark: 'Near Aerospace & Defense Park',
      nearestMetroDistanceKm: 3.2,
      airportDistanceKm: 12,
      walkScore: 78,
      lat: 13.1989,
      lng: 77.7068,
    },
    peaceOfMind: {
      overall: 92,
      builderCredibility: 94,
      projectEfficiency: 98,
      legalClearance: 97,
      appreciationPotential: 96,
      reraId: 'PRM/KA/RERA/PLOT/2025/112904',
      pros: [
        '100% clear BDA & BIAAPA approvals with individual Khata A titles',
        'Direct 15-minute commute to International Airport Terminal',
        'Underground cabling for electricity, optical fiber, and piped gas already laid'
      ],
      cons: [
        'Requires building a private villa structure within 5 years per community bylaws'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    videoTourUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-countryside-residence-42868-large.mp4',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    amenities: [
      'Clubhouse with Olympic Size Pool',
      'Tennis & Pickleball Courts',
      'Organic Community Farm & Fruit Orchards',
      'Underground Utility Grid (Zero Overhead Wires)',
      '1.5 km Tree-Canopied Jogging Boulevard'
    ],
    specs: {
      flooring: 'Paved interlocking concrete paver driveways',
      powerBackup: 'Dedicated 24/7 substation connection with solar microgrid',
      waterSupply: 'Rainwater harvesting lakes + individual metered water connections',
      parking: 'Each plot accommodates up to 4 covered parking slots',
      security: 'Gated perimeter wall, RFID boom barriers, 24/7 security patrol'
    },
    createdAt: '2026-02-10T10:00:00Z'
  },
  {
    id: 'rem-prop-04',
    title: 'REM Urban Sanctuary (Smart Living)',
    developer: 'REM Urban Residences',
    tagline: 'Modern tech-integrated 2 & 3 BHK homes just 400m from Metro station',
    description: 'Engineered for contemporary urban professionals. REM Urban Sanctuary features sound-isolated work-from-home pods, automated climate control, smart package lockers, and high-efficiency floor layouts.',
    category: 'residential',
    status: 'Under Construction',
    isUpcoming: false,
    listingType: 'sale',
    propertyType: 'Apartment',
    possessionDate: 'December 2026',
    pricing: {
      totalPrice: 13500000, // ₹1.35 Cr
      pricePerSqFt: 8800,
      estimatedEmiMonthly: 116000,
      maintenancePerMonth: 6200,
      stampDutyAndReg: 945000,
      bookingTokenAmount: 50000,
    },
    dimensions: {
      carpetAreaSqFt: 1180,
      superBuiltUpSqFt: 1534,
      efficiencyPercentage: 77,
      bhk: '3 BHK Smart Home',
      ceilingHeightFt: 10.5,
      facing: 'East',
      floorLevel: '12th of 24 Floors',
      totalUnitsInProject: 240,
    },
    location: {
      locality: 'Whitefield - Hope Farm Junction',
      city: 'Bangalore',
      state: 'Karnataka',
      landmark: 'Next to REM Tech Park',
      nearestMetroDistanceKm: 0.4,
      airportDistanceKm: 38,
      walkScore: 89,
      lat: 12.9815,
      lng: 77.7542,
    },
    peaceOfMind: {
      overall: 91,
      builderCredibility: 93,
      projectEfficiency: 86,
      legalClearance: 97,
      appreciationPotential: 90,
      reraId: 'PRM/KA/RERA/RES/2024/782319',
      pros: [
        'Zero brokerage with direct REM concierge assurance',
        'Just 400 meters walk from Hope Farm Metro Station',
        'Built using modern Mivan aluminum shuttering technology'
      ],
      cons: [
        'Possession is scheduled for late 2026 (70% superstructure completed)'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    videoTourUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-living-room-and-kitchen-42777-large.mp4',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    amenities: [
      'Coworking Lounge with High-Speed Leased Line',
      'Rooftop Skypark & Barbecue Deck',
      'Badminton Court & Half Basketball Court',
      'Smart Package Delivery Lockers'
    ],
    specs: {
      flooring: 'Vitrified tiles in living and wooden laminate in master bedroom',
      powerBackup: '100% backup for all common areas and 3 kVA for apartment',
      waterSupply: 'Treated Cauvery water connection',
      parking: '1 Dedicated covered basement car park',
      security: 'App-based visitor gate pass, 24/7 security guard post'
    },
    createdAt: '2026-02-15T10:00:00Z'
  },
  {
    id: 'rem-prop-05',
    title: 'REM CyberHub Retail Galleria',
    developer: 'REM Commercial Assets',
    tagline: 'High-visibility corner retail storefront for premium brand lease',
    description: 'An institutional-grade commercial retail asset situated along the prime commercial nexus with double frontage, escalator connectivity, and 24/7 power backup.',
    category: 'commercial',
    status: 'Ready to Move',
    isUpcoming: false,
    listingType: 'rent',
    propertyType: 'Commercial',
    monthlyRent: 420000,
    possessionDate: 'Immediate',
    pricing: {
      totalPrice: 420000, // Monthly rent
      pricePerSqFt: 210,
      estimatedEmiMonthly: 0,
      bookingTokenAmount: 25000,
    },
    dimensions: {
      carpetAreaSqFt: 2000,
      superBuiltUpSqFt: 2600,
      efficiencyPercentage: 77,
      bhk: 'Ground Floor Retail Storefront',
      ceilingHeightFt: 18.0,
      facing: 'Double-frontage Corner Boulevard',
      floorLevel: 'Ground Floor Galleria',
      totalUnitsInProject: 22,
    },
    location: {
      locality: 'Cyber City Hub / Golf Course Ext.',
      city: 'Gurugram',
      state: 'Haryana',
      landmark: 'Adjacent to Rapid Metro Cyber Gateway',
      nearestMetroDistanceKm: 0.2,
      airportDistanceKm: 14,
      walkScore: 98,
      lat: 28.4906,
      lng: 77.0911,
    },
    peaceOfMind: {
      overall: 95,
      builderCredibility: 97,
      projectEfficiency: 92,
      legalClearance: 98,
      appreciationPotential: 96,
      reraId: 'HRERA-PKL-GGM-2023-882190',
      pros: [
        'Direct footfall from adjacent Fortune 500 corporate towers',
        'Direct escalator connection from Rapid Metro Station into the Galleria'
      ],
      cons: [
        'High security deposit required per commercial lease standard'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1200&q=80'
    ],
    videoTourUrl: 'https://assets.mixkit.co/videos/preview/mixkit-shopping-mall-hallway-with-visitors-41480-large.mp4',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    amenities: [
      'Central Air Conditioning VRV system',
      'Double Height Glass Facade',
      'Valet Parking for 600+ Luxury Cars',
      'Outdoor Al Fresco Piazza'
    ],
    specs: {
      flooring: 'Heavy duty Italian terrazzo tile',
      powerBackup: '100% synchronized dual generator backup',
      waterSupply: '24/7 dedicated commercial pipeline',
      parking: 'Automated 3-level basement parking',
      security: 'AI-assisted crowd heatmapping and armed security'
    },
    createdAt: '2026-02-20T10:00:00Z'
  },
  {
    id: 'rem-prop-06',
    title: 'Cascadia Waterfront Residences (Upcoming Product)',
    developer: 'REM Signature Projects',
    tagline: 'Ultra-exclusive lakeside residences designed by world-renowned architects',
    description: 'Upcoming flagship project launching Q3 2026. Set on a 14-acre private peninsula with 800 meters of lakefront shoreline. Features biometric private docks, solar glass facades, and cantilevered infinity balconies.',
    category: 'upcoming_launch',
    status: 'Pre-Launch',
    isUpcoming: true,
    listingType: 'sale',
    propertyType: 'Apartment',
    launchDate: 'October 2026',
    possessionDate: 'Q4 2028',
    pricing: {
      totalPrice: 31000000, // ₹3.10 Cr pre-launch price
      pricePerSqFt: 12500,
      estimatedEmiMonthly: 268000,
      maintenancePerMonth: 12000,
      stampDutyAndReg: 2170000,
      bookingTokenAmount: 100000,
    },
    dimensions: {
      carpetAreaSqFt: 2150,
      superBuiltUpSqFt: 2680,
      efficiencyPercentage: 80,
      bhk: '3 & 4 BHK Lakefront Condos',
      ceilingHeightFt: 11.5,
      facing: 'Lake Facing (North-West)',
      floorLevel: 'Choice of Floors (1 to 28)',
      totalUnitsInProject: 110,
    },
    location: {
      locality: 'Bellandur Lakefront Promenade',
      city: 'Bangalore',
      state: 'Karnataka',
      landmark: 'Next to REM Horizon Waterfront Club',
      nearestMetroDistanceKm: 1.1,
      airportDistanceKm: 40,
      walkScore: 84,
      lat: 12.9344,
      lng: 77.6749,
    },
    peaceOfMind: {
      overall: 93,
      builderCredibility: 97,
      projectEfficiency: 90,
      legalClearance: 95,
      appreciationPotential: 98,
      reraId: 'PRM/KA/RERA/PRE-LAUNCH/2026/00192',
      pros: [
        'Pre-launch inaugural pricing offers 18% discount over projected launch price',
        'Unobstructed lifelong lakefront views protected by environmental buffer zoning'
      ],
      cons: [
        'Pre-launch stage; structural excavation commencing shortly'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ],
    videoTourUrl: 'https://assets.mixkit.co/videos/preview/mixkit-lakefront-villa-with-swimming-pool-and-jetty-43110-large.mp4',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
    amenities: [
      'Private Yacht Jetty & Kayaking Club',
      'Cantilevered Glass Bottom Infinity Pool',
      'Spa Wellness Sanctuary with Thermal Baths'
    ],
    specs: {
      flooring: 'Engineered French Oak hardwood flooring in bedrooms, Botticino marble in living',
      powerBackup: '100% green solar microgrid + dual generator redundancy',
      waterSupply: 'Advanced RO filtration + rainwater purification cycle',
      parking: '2 Covered parking slots with pre-installed EV fast chargers',
      security: 'Facial recognition lobby access, 24/7 security concierge'
    },
    createdAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'rem-prop-08',
    title: 'REM Panorama Heights (Phase II)',
    developer: 'REM Urban Residences',
    tagline: 'Vastu-compliant hillside apartments overlooking the central tech forest',
    description: 'A thoughtfully crafted community offering superior livability with 78% open spaces, multi-tiered landscaped podiums, clean solar architecture, and zero-compromise security.',
    category: 'residential',
    status: 'Ready to Move',
    isUpcoming: false,
    listingType: 'sale',
    propertyType: 'Apartment',
    possessionDate: 'Ready to Move',
    pricing: {
      totalPrice: 18500000, // ₹1.85 Cr
      pricePerSqFt: 9200,
      estimatedEmiMonthly: 159000,
      maintenancePerMonth: 7500,
      stampDutyAndReg: 1295000,
      bookingTokenAmount: 100000,
    },
    dimensions: {
      carpetAreaSqFt: 1540,
      superBuiltUpSqFt: 2010,
      efficiencyPercentage: 77,
      bhk: '3.5 BHK (With Home Study)',
      ceilingHeightFt: 10.5,
      facing: 'North Facing',
      floorLevel: '14th of 22 Floors',
      totalUnitsInProject: 180,
    },
    location: {
      locality: 'Sarjapur Road - Carmelaram',
      city: 'Bangalore',
      state: 'Karnataka',
      landmark: 'Near Wipro Corporate Campus',
      nearestMetroDistanceKm: 1.5,
      airportDistanceKm: 44,
      walkScore: 82,
      lat: 12.9116,
      lng: 77.6882,
    },
    peaceOfMind: {
      overall: 89,
      builderCredibility: 92,
      projectEfficiency: 84,
      legalClearance: 96,
      appreciationPotential: 88,
      reraId: 'PRM/KA/RERA/SARJ/2024/491021',
      pros: [
        'Spacious home study included, ideal for hybrid work arrangements',
        'Top reputed international schools within 10 minutes'
      ],
      cons: [
        'Sarjapur road peak hour traffic congestion currently being widened'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    videoTourUrl: 'https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-contemporary-flat-42571-large.mp4',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
    amenities: [
      'Podium Swimming Pool & Heated Kids Pool',
      'Cricket Practice Net with Bowling Machine',
      'Dedicated Pet Park with Agility Obstacles'
    ],
    specs: {
      flooring: 'Vitrified tiles in living/dining, anti-skid ceramic in balconies',
      powerBackup: '100% backup for all lighting points and common facilities',
      waterSupply: 'Sewage treatment plant + Dual flush piping throughout',
      parking: '2 Covered basement car parks with automated tags',
      security: '24/7 CCTV surveillance, Video Door Phone in every apartment'
    },
    createdAt: '2026-03-02T10:00:00Z'
  },
  {
    id: 'rem-prop-09',
    title: 'REM Palm Meadows Signature Villa',
    developer: 'REM Luxury Living',
    tagline: 'Gated 5 BHK private pool estate with landscaped lawns & private terrace',
    description: 'An architectural masterpiece offering timeless Spanish-contemporary design, double-height grand foyer, private temperature-controlled pool, Italian kitchen, and servant quarters.',
    category: 'residential',
    status: 'Ready to Move',
    isUpcoming: false,
    listingType: 'sale',
    propertyType: 'Villa',
    possessionDate: 'Immediate',
    pricing: {
      totalPrice: 58000000, // ₹5.80 Cr
      pricePerSqFt: 12888,
      estimatedEmiMonthly: 502000,
      maintenancePerMonth: 22000,
      stampDutyAndReg: 4060000,
      bookingTokenAmount: 500000,
    },
    dimensions: {
      carpetAreaSqFt: 4100,
      superBuiltUpSqFt: 4500,
      efficiencyPercentage: 91,
      bhk: '5 BHK Independent Villa (G+2)',
      ceilingHeightFt: 13.0,
      facing: 'North-East',
      floorLevel: 'Triplex Villa',
      totalUnitsInProject: 32,
    },
    location: {
      locality: 'Whitefield - ECC Road',
      city: 'Bangalore',
      state: 'Karnataka',
      landmark: 'Next to Palm Meadows Club',
      nearestMetroDistanceKm: 1.2,
      airportDistanceKm: 36,
      walkScore: 88,
      lat: 12.9698,
      lng: 77.7499,
    },
    peaceOfMind: {
      overall: 95,
      builderCredibility: 96,
      projectEfficiency: 93,
      legalClearance: 98,
      appreciationPotential: 94,
      reraId: 'PRM/KA/RERA/VILLA/2024/091244',
      pros: [
        'Private 4,500 sqft corner plot with manicured European lawns',
        'Private heated swimming pool and jacuzzi built-in',
        '100% Vaastu compliant layout with North-East main entrance'
      ],
      cons: [
        'Limited inventory of only 32 exclusive residences in community'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    videoTourUrl: 'https://assets.mixkit.co/videos/preview/mixkit-lakefront-villa-with-swimming-pool-and-jetty-43110-large.mp4',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
    amenities: [
      'Private Swimming Pool & Sun Deck',
      'Private 4-Car Covered Garage',
      'Home Cinema Room with Dolby Atmos',
      'Private Elevator within the Villa'
    ],
    specs: {
      flooring: 'Imported Greek Thassos marble and natural teakwood planks',
      powerBackup: '100% silent generator backup with solar grid tie-in',
      waterSupply: 'Dual pipeline with dedicated rainwater collection cistern',
      parking: '4 Covered slots inside private compound gate',
      security: 'Perimeter laser tripwire, video intercom on each level'
    },
    createdAt: '2026-03-03T10:00:00Z'
  },
  {
    id: 'rem-prop-10',
    title: 'REM Parkview Furnished Residence (For Rent)',
    developer: 'REM Urban Residences',
    tagline: 'Designer furnished 3 BHK overlooking Cubbon Park greens',
    description: 'Fully furnished luxury apartment for rent. Comes equipped with high-end Bosch appliances, custom walnut wardrobes, central VRV air conditioning, and high-speed Wi-Fi.',
    category: 'residential',
    status: 'Ready to Move',
    isUpcoming: false,
    listingType: 'rent',
    propertyType: 'Apartment',
    monthlyRent: 95000,
    possessionDate: 'Immediate',
    pricing: {
      totalPrice: 95000, // Monthly Rent
      pricePerSqFt: 53,
      estimatedEmiMonthly: 0,
      maintenancePerMonth: 8500,
      bookingTokenAmount: 25000,
    },
    dimensions: {
      carpetAreaSqFt: 1650,
      superBuiltUpSqFt: 1950,
      efficiencyPercentage: 84,
      bhk: '3 BHK Fully Furnished',
      ceilingHeightFt: 11.0,
      facing: 'East Facing',
      floorLevel: '9th Floor',
      totalUnitsInProject: 60,
    },
    location: {
      locality: 'Lavelle Road / Richmond Town',
      city: 'Bangalore',
      state: 'Karnataka',
      landmark: 'Near Bangalore Club',
      nearestMetroDistanceKm: 0.6,
      airportDistanceKm: 33,
      walkScore: 95,
      lat: 12.9716,
      lng: 77.5946,
    },
    peaceOfMind: {
      overall: 93,
      builderCredibility: 95,
      projectEfficiency: 89,
      legalClearance: 98,
      appreciationPotential: 90,
      reraId: 'PRM/KA/RERA/RENT/2024/00188',
      pros: [
        '100% turnkey fully furnished with high-end designer furniture',
        'Just 600m to MG Road Metro interchange'
      ],
      cons: [
        '10-month rental security deposit required'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    videoTourUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-living-room-and-kitchen-42777-large.mp4',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    amenities: [
      'Fully Equipped Fitness Gym',
      'Rooftop Lounge & Barbecue Area',
      '2 Reserved Basement Car Parks'
    ],
    specs: {
      flooring: 'Imported marble and wooden laminate',
      powerBackup: '100% full apartment backup',
      waterSupply: '24/7 treated Cauvery water',
      parking: '2 Covered slots',
      security: 'Biometric lock, 24/7 security concierge'
    },
    createdAt: '2026-03-04T10:00:00Z'
  },
  {
    id: 'rem-prop-11',
    title: 'REM Serene Garden Villa Estate',
    developer: 'REM Luxury Living',
    tagline: '4 BHK modern minimalist villa with private courtyard & rooftop solar lounge',
    description: 'Designed for quiet luxury. Double-height skylit living pavilion, organic garden, Italian modular kitchen, and smart automated lighting across all rooms.',
    category: 'residential',
    status: 'Ready to Move',
    isUpcoming: false,
    listingType: 'sale',
    propertyType: 'Villa',
    possessionDate: 'Immediate',
    pricing: {
      totalPrice: 46000000, // ₹4.60 Cr
      pricePerSqFt: 12105,
      estimatedEmiMonthly: 398000,
      maintenancePerMonth: 16000,
      stampDutyAndReg: 3220000,
      bookingTokenAmount: 250000,
    },
    dimensions: {
      carpetAreaSqFt: 3400,
      superBuiltUpSqFt: 3800,
      efficiencyPercentage: 89,
      bhk: '4 BHK Garden Villa (G+1)',
      ceilingHeightFt: 12.0,
      facing: 'East Facing',
      floorLevel: 'Duplex Villa',
      totalUnitsInProject: 24,
    },
    location: {
      locality: 'Indiranagar Defence Colony',
      city: 'Bangalore',
      state: 'Karnataka',
      landmark: 'Near Defence Colony Club',
      nearestMetroDistanceKm: 0.9,
      airportDistanceKm: 35,
      walkScore: 91,
      lat: 12.9754,
      lng: 77.6412,
    },
    peaceOfMind: {
      overall: 94,
      builderCredibility: 96,
      projectEfficiency: 91,
      legalClearance: 98,
      appreciationPotential: 93,
      reraId: 'PRM/KA/RERA/VILLA/2025/11094',
      pros: [
        'Quiet leafy residential street in Bangalore’s most prestigious neighborhood',
        'Private internal courtyard with natural sunlight filtration'
      ],
      cons: [
        'Only 2 homes currently remaining for immediate registration'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    videoTourUrl: 'https://assets.mixkit.co/videos/preview/mixkit-living-room-in-a-luxury-home-42407-large.mp4',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
    amenities: [
      'Private Landscaped Garden & Patio',
      '3 Covered Private Parking Slots',
      'Solar Rooftop Grid',
      'EV Car Charger Station'
    ],
    specs: {
      flooring: 'Italian Botticino marble',
      powerBackup: '100% seamless backup',
      waterSupply: 'Dual water line with water softener',
      parking: '3 Reserved covered slots',
      security: 'CCTV surveillance, Smart video doorbell'
    },
    createdAt: '2026-03-05T10:00:00Z'
  }
];

export const PRESET_USERS: Record<string, UserProfile> = {
  investor: {
    id: 'user-investor-01',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@investor.rem',
    phone: '+91 98450 12845',
    role: 'investor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    savedPropertyIds: ['rem-prop-invest-01', 'rem-prop-01', 'rem-prop-09'],
    investments: [
      {
        id: 'inv-1001',
        propertyId: 'rem-prop-invest-01',
        propertyTitle: 'REM Silicon Nexus Commercial Tech Hub (Floor 4)',
        propertyLocation: 'Outer Ring Road (ORR) - Bellandur, Bangalore',
        category: 'high_yield_investment',
        investedAmount: 1000000, // ₹10 Lakhs (1 of 10 shares)
        investmentDate: '2026-01-18',
        currentValuation: 1090000,
        totalPayoutsReceived: 32000, // 4 months @ ₹8,000/mo
        monthlyPayout: 8000,
        ownershipPercentage: 10,
        sharesCount: 1,
        projectedExitValuation: 1450000, // ₹14.5 Lakhs after 4 years
        nextPayoutDate: '2026-10-05',
        status: 'Active'
      }
    ],
    scheduledVisits: []
  },
  buyer: {
    id: 'user-buyer-02',
    name: 'Ananya Verma',
    email: 'ananya.verma@gmail.com',
    phone: '+91 97112 45890',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    savedPropertyIds: ['rem-prop-invest-01', 'rem-prop-04', 'rem-prop-08'],
    investments: [],
    scheduledVisits: []
  },
  admin: {
    id: 'user-admin-03',
    name: 'Admin - REM Operations',
    email: 'admin@rem.com',
    phone: '+91 80 4000 8000',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    savedPropertyIds: ['rem-prop-01', 'rem-prop-06'],
    investments: [],
    scheduledVisits: []
  }
};
