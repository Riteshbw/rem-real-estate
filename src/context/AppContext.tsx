import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Property, 
  UserProfile, 
  LeadInquiry, 
  PropertyCategory, 
  ActiveTab,
  UserInvestment,
  ScheduledVisit,
  ListingTypeFilter,
  PropertyTypeFilter
} from '../types';
import { INITIAL_PROPERTIES, PRESET_USERS } from '../data/propertiesData';
import { formatINR } from '../utils/formatters';

interface AppContextType {
  properties: Property[];
  currentUser: UserProfile;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedProperty: Property | null;
  setSelectedProperty: (prop: Property | null) => void;
  compareIds: string[];
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  toggleFavorite: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: PropertyCategory | 'all';
  setSelectedCategory: (category: PropertyCategory | 'all') => void;
  cityFilter: string;
  setCityFilter: (city: string) => void;
  maxBudgetFilter: number;
  setMaxBudgetFilter: (budget: number) => void;
  minScoreFilter: number;
  setMinScoreFilter: (score: number) => void;
  bhkFilter: string;
  setBhkFilter: (bhk: string) => void;
  inquiries: LeadInquiry[];
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  listingTypeFilter: ListingTypeFilter;
  setListingTypeFilter: (val: ListingTypeFilter) => void;
  propertyTypeFilter: PropertyTypeFilter;
  setPropertyTypeFilter: (val: PropertyTypeFilter) => void;
  preLaunchOnly: boolean;
  setPreLaunchOnly: (val: boolean) => void;
  isLoanCalcModalOpen: boolean;
  setIsLoanCalcModalOpen: (open: boolean) => void;
  isValuationModalOpen: boolean;
  setIsValuationModalOpen: (open: boolean) => void;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;
  isInvestModalOpen: boolean;
  setIsInvestModalOpen: (open: boolean) => void;
  investTargetProperty: Property | null;
  setInvestTargetProperty: (prop: Property | null) => void;
  isAdminAuthModalOpen: boolean;
  setIsAdminAuthModalOpen: (open: boolean) => void;
  
  // Actions
  switchUser: (key: 'investor' | 'buyer' | 'admin') => void;
  loginUser: (user: UserProfile) => void;
  logoutUser: () => void;
  loginAsAdmin: (password: string) => { success: boolean; message?: string };
  exitAdminMode: () => void;
  addProperty: (newProp: Property) => void;
  updateProperty: (updatedProp: Property) => void;
  deleteProperty: (id: string) => void;
  investInProperty: (propertyId: string, amount: number, sharesCount?: number) => boolean;
  bookSiteVisit: (propertyId: string, date: string, timeSlot: string, type: 'Physical Site Tour' | 'Virtual Video Walkthrough') => void;
  submitGeneralInquiry: (inquiry: Omit<LeadInquiry, 'id' | 'timestamp' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: 'New' | 'Contacted' | 'Closed') => void;
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  PROPERTIES: 'rem_properties_v2',
  CURRENT_USER: 'rem_current_user_v2',
  INQUIRIES: 'rem_inquiries_v2',
  COMPARE: 'rem_compare_v2',
};

const INITIAL_INQUIRIES: LeadInquiry[] = [
  {
    id: 'inq-001',
    propertyId: 'rem-prop-02',
    propertyTitle: 'REM Horizon Tech Park Grade-A (Tower B)',
    userName: 'Rahul Sharma',
    userEmail: 'rahul.sharma@investor.rem',
    userPhone: '+91 98450 12845',
    inquiryType: 'Investment Pledge',
    amount: 2500000,
    notes: 'Committed ₹25 Lakhs for 4-year tenure. KYC verified.',
    timestamp: '2026-08-15T14:20:00Z',
    status: 'Closed'
  },
  {
    id: 'inq-002',
    propertyId: 'rem-prop-06',
    propertyTitle: 'Cascadia Waterfront Residences (Upcoming Product)',
    userName: 'Rahul Sharma',
    userEmail: 'rahul.sharma@investor.rem',
    userPhone: '+91 98450 12845',
    inquiryType: 'Site Visit',
    notes: 'VIP lakefront site tour requested with lead architect.',
    timestamp: '2026-09-02T11:15:00Z',
    status: 'Contacted'
  },
  {
    id: 'inq-003',
    propertyId: 'rem-prop-04',
    propertyTitle: 'REM Urban Sanctuary (Smart Living)',
    userName: 'Ananya Verma',
    userEmail: 'ananya.verma@gmail.com',
    userPhone: '+91 97112 45890',
    inquiryType: 'Site Visit',
    notes: 'Weekend inspection with family for 3 BHK unit.',
    timestamp: '2026-09-04T09:30:00Z',
    status: 'New'
  }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Properties State
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PROPERTIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error reading properties from localStorage', e);
    }
    return INITIAL_PROPERTIES;
  });

  // Current User State (defaults to Buyer profile for homebuyer experience)
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error reading currentUser from localStorage', e);
    }
    return PRESET_USERS.buyer;
  });

  // Navigation & Modal State
  const [activeTab, setActiveTab] = useState<ActiveTab>('properties');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState<boolean>(false);
  const [isInvestModalOpen, setIsInvestModalOpen] = useState<boolean>(false);
  const [investTargetProperty, setInvestTargetProperty] = useState<Property | null>(null);

  // Comparison State
  const [compareIds, setCompareIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.COMPARE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['rem-prop-01', 'rem-prop-04'];
  });

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<PropertyCategory | 'all'>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [maxBudgetFilter, setMaxBudgetFilter] = useState<number>(50000000); // 5 Cr max slider default
  const [minScoreFilter, setMinScoreFilter] = useState<number>(0);
  const [bhkFilter, setBhkFilter] = useState<string>('all');
  const [listingTypeFilter, setListingTypeFilter] = useState<ListingTypeFilter>('all');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<PropertyTypeFilter>('all');
  const [preLaunchOnly, setPreLaunchOnly] = useState<boolean>(false);
  const [isLoanCalcModalOpen, setIsLoanCalcModalOpen] = useState<boolean>(false);
  const [isValuationModalOpen, setIsValuationModalOpen] = useState<boolean>(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  // Admin Inquiries / CRM
  const [inquiries, setInquiries] = useState<LeadInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.INQUIRIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_INQUIRIES;
  });

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.COMPARE, JSON.stringify(compareIds));
  }, [compareIds]);

  // Actions
  const switchUser = (key: 'investor' | 'buyer' | 'admin') => {
    const user = PRESET_USERS[key];
    if (user) {
      setCurrentUser(user);
    }
  };

  const loginUser = (user: UserProfile) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
  };

  const logoutUser = () => {
    setCurrentUser(PRESET_USERS.buyer);
    setActiveTab('properties');
  };

  const loginAsAdmin = (password: string): { success: boolean; message?: string } => {
    const trimmed = password.trim();
    if (trimmed === 'admin123' || trimmed === 'rem2026' || trimmed === 'admin') {
      setCurrentUser(PRESET_USERS.admin);
      setActiveTab('admin');
      setIsAdminAuthModalOpen(false);
      return { success: true };
    }
    return { success: false, message: 'Invalid administrator passcode. Access denied.' };
  };

  const exitAdminMode = () => {
    setCurrentUser(PRESET_USERS.buyer);
    setActiveTab('properties');
  };

  const toggleFavorite = (id: string) => {
    setCurrentUser(prev => {
      const exists = prev.savedPropertyIds.includes(id);
      const newSaved = exists
        ? prev.savedPropertyIds.filter(item => item !== id)
        : [...prev.savedPropertyIds, id];
      return { ...prev, savedPropertyIds: newSaved };
    });
  };

  const toggleCompare = (id: string) => {
    setCompareIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 properties simultaneously.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const clearCompare = () => setCompareIds([]);

  const addProperty = (newProp: Property) => {
    setProperties(prev => [newProp, ...prev]);
  };

  const updateProperty = (updatedProp: Property) => {
    setProperties(prev => prev.map(p => p.id === updatedProp.id ? updatedProp : p));
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const investInProperty = (propertyId: string, amount: number, sharesCount?: number): boolean => {
    const prop = properties.find(p => p.id === propertyId);
    if (!prop || !prop.investment) return false;

    const effectiveAmount = amount > 0 ? amount : 100000;
    const computedShares = sharesCount || Math.max(1, Math.round(effectiveAmount / (prop.investment.sharePrice || 1000000)));

    const monthlyYieldRate = (prop.investment.grossRentalYieldPercentage / 100) / 12;
    const monthlyPayout = Math.round(effectiveAmount * monthlyYieldRate);

    const tenure = prop.investment.tenureYears || 4;
    const projectedExitValuation = Math.round(effectiveAmount * (1 + (0.45 * (tenure / 4))));

    const ownershipPercentage = Number(((effectiveAmount / prop.pricing.totalPrice) * 100).toFixed(2));

    const newInvestment: UserInvestment = {
      id: `inv-${Date.now().toString().slice(-5)}`,
      propertyId: prop.id,
      propertyTitle: prop.title,
      propertyLocation: `${prop.location.locality}, ${prop.location.city}`,
      category: prop.category,
      investedAmount: effectiveAmount,
      investmentDate: new Date().toISOString().split('T')[0],
      currentValuation: effectiveAmount,
      totalPayoutsReceived: 0,
      monthlyPayout,
      ownershipPercentage,
      sharesCount: computedShares,
      projectedExitValuation,
      nextPayoutDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Active'
    };

    // 1. Update properties to record funding progress
    setProperties(prev => prev.map(p => {
      if (p.id !== propertyId || !p.investment) return p;
      const currentFunded = p.investment.fundedPercentage || 65;
      const addFunded = Math.max(1, Math.round((effectiveAmount / p.pricing.totalPrice) * 100));
      const newFunded = Math.min(100, currentFunded + addFunded);
      const currentSold = p.investment.soldShares || 0;
      const newSold = Math.min(p.investment.totalShares || 10, currentSold + (sharesCount || 1));

      const newCoInvestors = [
        ...(p.investment.coInvestors || []),
        {
          slot: currentSold + 1,
          investorName: currentUser.name,
          location: 'Bengaluru',
          avatar: currentUser.avatar,
          sharesCount: computedShares,
          date: new Date().toISOString().split('T')[0],
          isCurrentUser: true,
        }
      ];
      return {
        ...p,
        investment: {
          ...p.investment,
          soldShares: newSold,
          fundedPercentage: newFunded,
          coInvestors: newCoInvestors
        }
      };
    }));

    // 2. Update current user investments
    setCurrentUser(prev => ({
      ...prev,
      investments: [newInvestment, ...prev.investments]
    }));

    // 3. Record Lead Inquiry for Admin CRM
    const lead: LeadInquiry = {
      id: `inq-${Date.now().toString().slice(-5)}`,
      propertyId: prop.id,
      propertyTitle: prop.title,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userPhone: currentUser.phone || '+91 99999 00000',
      inquiryType: 'Investment Pledge',
      amount: effectiveAmount,
      notes: `Direct property investment pledge of ${formatINR(effectiveAmount)} (${ownershipPercentage}% equity). SPV Certificate issued.`,
      timestamp: new Date().toISOString(),
      status: 'New'
    };

    setInquiries(prev => [lead, ...prev]);
    return true;
  };

  const bookSiteVisit = (
    propertyId: string, 
    date: string, 
    timeSlot: string, 
    type: 'Physical Site Tour' | 'Virtual Video Walkthrough'
  ) => {
    const prop = properties.find(p => p.id === propertyId);
    if (!prop) return;

    const newVisit: ScheduledVisit = {
      id: `visit-${Date.now().toString().slice(-4)}`,
      propertyId: prop.id,
      propertyTitle: prop.title,
      propertyLocation: `${prop.location.locality}, ${prop.location.city}`,
      date,
      timeSlot,
      type,
      conciergeAssigned: 'REM Senior Relationship Manager',
      status: 'Confirmed'
    };

    setCurrentUser(prev => ({
      ...prev,
      scheduledVisits: [newVisit, ...prev.scheduledVisits]
    }));

    // Record inquiry
    const lead: LeadInquiry = {
      id: `inq-${Date.now().toString().slice(-5)}`,
      propertyId: prop.id,
      propertyTitle: prop.title,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userPhone: currentUser.phone || '+91 99999 00000',
      inquiryType: 'Site Visit',
      notes: `Requested ${type} on ${date} during slot ${timeSlot}.`,
      timestamp: new Date().toISOString(),
      status: 'New'
    };

    setInquiries(prev => [lead, ...prev]);
  };

  const submitGeneralInquiry = (inquiry: Omit<LeadInquiry, 'id' | 'timestamp' | 'status'>) => {
    const lead: LeadInquiry = {
      ...inquiry,
      id: `inq-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toISOString(),
      status: 'New'
    };
    setInquiries(prev => [lead, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: 'New' | 'Contacted' | 'Closed') => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
  };

  const resetToDefaults = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.PROPERTIES);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.INQUIRIES);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.COMPARE);
    setProperties(INITIAL_PROPERTIES);
    setCurrentUser(PRESET_USERS.investor);
    setInquiries(INITIAL_INQUIRIES);
    setCompareIds(['rem-prop-01', 'rem-prop-04']);
  };

  return (
    <AppContext.Provider value={{
      properties,
      currentUser,
      activeTab,
      setActiveTab,
      selectedProperty,
      setSelectedProperty,
      compareIds,
      toggleCompare,
      clearCompare,
      toggleFavorite,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      cityFilter,
      setCityFilter,
      maxBudgetFilter,
      setMaxBudgetFilter,
      minScoreFilter,
      setMinScoreFilter,
      bhkFilter,
      setBhkFilter,
      inquiries,
      isAuthModalOpen,
      setIsAuthModalOpen,
      listingTypeFilter,
      setListingTypeFilter,
      propertyTypeFilter,
      setPropertyTypeFilter,
      preLaunchOnly,
      setPreLaunchOnly,
      isLoanCalcModalOpen,
      setIsLoanCalcModalOpen,
      isValuationModalOpen,
      setIsValuationModalOpen,
      isCompareModalOpen,
      setIsCompareModalOpen,
      isInvestModalOpen,
      setIsInvestModalOpen,
      investTargetProperty,
      setInvestTargetProperty,
      isAdminAuthModalOpen,
      setIsAdminAuthModalOpen,
      loginAsAdmin,
      exitAdminMode,
      switchUser,
      loginUser,
      logoutUser,
      addProperty,
      updateProperty,
      deleteProperty,
      investInProperty,
      bookSiteVisit,
      submitGeneralInquiry,
      updateInquiryStatus,
      resetToDefaults
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
