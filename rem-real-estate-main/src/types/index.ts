export type PropertyCategory = 
  | 'residential' 
  | 'commercial' 
  | 'land_plots' 
  | 'high_yield_investment' 
  | 'upcoming_launch';

export type PropertyStatus = 
  | 'Ready to Move' 
  | 'Under Construction' 
  | 'Pre-Launch' 
  | 'High Yield Active'
  | 'Sold Out';

export interface PeaceOfMindScore {
  overall: number; // 0 - 100
  builderCredibility: number; // 0 - 100
  projectEfficiency: number; // 0 - 100 (% spatial usage)
  legalClearance: number; // 0 - 100 (RERA, title deed)
  appreciationPotential: number; // 0 - 100
  pros: string[];
  cons: string[];
  reraId: string;
}

export interface PropertyDimensions {
  carpetAreaSqFt: number;
  superBuiltUpSqFt: number;
  efficiencyPercentage: number; // carpet / super builtup
  bhk: string; // e.g., '2 BHK', '3 BHK', '4 BHK Penthouse', 'Commercial SFT', 'Plots'
  ceilingHeightFt?: number;
  facing?: string; // 'North-East', 'East', etc.
  floorLevel?: string; // '18th of 32 Floors', 'Ground + 2'
  totalUnitsInProject?: number;
}

export interface PricingDetails {
  totalPrice: number; // in INR
  pricePerSqFt: number;
  estimatedEmiMonthly: number; // standard 20-yr 8.5%
  maintenancePerMonth?: number;
  stampDutyAndReg?: number;
  bookingTokenAmount: number;
}

export interface LocationDetails {
  locality: string;
  city: string;
  state: string;
  landmark: string;
  nearestMetroDistanceKm: number;
  airportDistanceKm: number;
  walkScore: number; // 0 - 100
  lat?: number;
  lng?: number;
}

export interface CoInvestorSlot {
  slot: number; // 1 to 10
  investorName: string;
  location: string;
  avatar?: string;
  sharesCount: number;
  date: string;
  isCurrentUser?: boolean;
}

export interface InvestmentMetrics {
  isInvestable: boolean;
  minTicketSize: number; // in INR e.g. 10,00,000 (10 Lakhs)
  grossRentalYieldPercentage: number; // e.g., 9.6%
  projectedIRRPercentage: number; // e.g., 18.2%
  tenureYears: number; // e.g. 4
  distributionFrequency: 'Monthly' | 'Quarterly' | 'Annual';
  fundedPercentage: number; // e.g. 70%
  tenantProfile?: string; // e.g. 'Amazon India Dev Center', 'Deloitte Digital'
  capitalAppreciationForecast: { year: number; projectedValue: number }[];
  // 10-Share Co-Ownership Pool Details
  isFractionalPool?: boolean;
  totalShares?: number; // 10
  soldShares?: number; // e.g. 7
  sharePrice?: number; // 10,00,000 (10 Lakhs)
  poolTotalValuation?: number; // 1,00,00,000 (1 Crore)
  monthlyPayoutPerShare?: number; // e.g. 8000
  projectedExitPayoutPerShare?: number; // e.g. 1450000
  coInvestors?: CoInvestorSlot[];
}

export interface Property {
  id: string;
  title: string;
  developer: string;
  tagline: string;
  description: string;
  category: PropertyCategory;
  status: PropertyStatus;
  isUpcoming: boolean;
  launchDate?: string;
  possessionDate: string;
  pricing: PricingDetails;
  dimensions: PropertyDimensions;
  location: LocationDetails;
  peaceOfMind: PeaceOfMindScore;
  investment?: InvestmentMetrics;
  images: string[];
  videoTourUrl: string; // Video walkthrough link / sample embed
  videos?: string[]; // Multiple video walkthrough links
  floorPlanUrl: string;
  amenities: string[];
  listingType?: 'sale' | 'rent';
  propertyType?: 'Apartment' | 'Villa' | 'Plot' | 'Penthouse' | 'Commercial';
  monthlyRent?: number;
  specs: {
    flooring: string;
    powerBackup: string;
    waterSupply: string;
    parking: string;
    security: string;
  };
  createdAt: string;
}

export type ListingTypeFilter = 'all' | 'sale' | 'rent';
export type PropertyTypeFilter = 'all' | 'Apartment' | 'Villa' | 'Plot' | 'Penthouse' | 'Commercial';

export interface UserInvestment {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  category: PropertyCategory;
  investedAmount: number;
  investmentDate: string;
  currentValuation: number;
  totalPayoutsReceived: number;
  monthlyPayout: number;
  ownershipPercentage: number;
  nextPayoutDate: string;
  status: 'Active' | 'Under Review' | 'Matured';
  sharesCount?: number;
  projectedExitValuation?: number;
}

export interface ScheduledVisit {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  date: string;
  timeSlot: string;
  type: 'Physical Site Tour' | 'Virtual Video Walkthrough';
  conciergeAssigned: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'buyer' | 'investor' | 'admin';
  avatar: string;
  savedPropertyIds: string[];
  investments: UserInvestment[];
  scheduledVisits: ScheduledVisit[];
}

export interface LeadInquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  inquiryType: 'Site Visit' | 'Investment Pledge' | 'Brochure Request' | 'Price Negotiation';
  amount?: number;
  notes: string;
  timestamp: string;
  status: 'New' | 'Contacted' | 'Closed';
}

export type ActiveTab = 'properties' | 'admin' | 'invest' | 'portfolio' | 'compare';
