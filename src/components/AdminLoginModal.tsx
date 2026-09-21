import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  ArrowRight, 
  AlertCircle, 
  Eye, 
  EyeOff,
  Building2
} from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { 
    isAdminAuthModalOpen, 
    setIsAdminAuthModalOpen, 
    loginAsAdmin 
  } = useApp();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAdminAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      const result = loginAsAdmin(password.trim());
      setIsSubmitting(false);

      if (!result.success) {
        setErrorMessage(result.message || 'Invalid admin credentials. Please try again.');
      } else {
        setPassword('');
      }
    }, 200);
  };

  const handleClose = () => {
    setPassword('');
    setErrorMessage('');
    setIsAdminAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-200 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
          title="Cancel"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Security Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-800 to-indigo-600 text-white font-black flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/25">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold uppercase tracking-wider mb-1.5">
            <Lock className="w-3 h-3" />
            <span>Restricted Access</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            REM Staff & Admin Portal
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Authorized administrator verification required to manage real estate catalog and upcoming launches.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center space-x-2.5 text-rose-700 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span className="font-semibold">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Admin Account
            </label>
            <div className="flex items-center space-x-2 px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-600 font-medium">
              <Building2 className="w-4 h-4 text-purple-600 shrink-0" />
              <span className="truncate">admin@rem.com (REM Operations)</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">
                Security Passcode / Password
              </label>
              <span className="text-[10px] text-purple-600 font-bold">
                Hint: admin123
              </span>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4 text-purple-500" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Enter admin passcode"
                className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !password.trim()}
              className="w-full py-3 rounded-xl bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-purple-700/20 cursor-pointer flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Unlock Admin Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleClose}
            className="text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
          >
            ← Back to Homebuyer Portal
          </button>
        </div>

      </div>
    </div>
  );
};
