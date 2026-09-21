/**
 * Utility functions for Indian real estate currency and unit formatting
 */

export function formatINR(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr.toFixed(2).replace(/\.00$/, '')} Cr`;
  }
  if (amount >= 100000) {
    const lakh = amount / 100000;
    return `₹${lakh.toFixed(2).replace(/\.00$/, '')} L`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatNumber(val: number): string {
  return val.toLocaleString('en-IN');
}

export function calculateEMI(principal: number, annualInterestRate: number = 8.5, tenureYears: number = 20): number {
  const monthlyRate = annualInterestRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  return Math.round(emi);
}
