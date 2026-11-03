/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, ArrowRight, ArrowLeft, Shield, Building2, UserCheck, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.tsx';
import { BusinessType, Establishment } from '../../types/index.ts';
import { TygosLogo } from '../brand/TygosLogo.tsx';

export const RegisterWizard: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const { registerEstablishment, registeredSuccessEst, setRegisteredSuccessEst, setActiveView } = useAuth();

  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    ownerName: 'Alexander Vance',
    businessName: 'The Azure Horizon Grand Bistro',
    businessType: 'restaurant_cafe' as BusinessType,
    nationalId: 'EG-298010412039',
    crNumber: 'CR-9041284',
    taxNumber: 'TX-502-918-223',
    address: 'Nile Corniche Avenue, Suite 10',
    city: 'Cairo',
    state: 'Cairo Governorate',
    country: 'Egypt',
    phone: '+20 100 482 9182',
    secondaryPhone: '',
    email: 'alexander@azurebistro.com',
    username: 'alex_azure',
    password: 'Password@2026',
    confirmPassword: 'Password@2026',
    language: 'en' as const,
    currency: 'USD',
    timezone: 'UTC+2 (Cairo)',
    notes: 'Primary flagship branch opening with 120 covers.',
    termsAccepted: true,
    privacyAccepted: true,
  });

  const [error, setError] = useState<string>('');

  const businessTypes: { value: BusinessType; label: string; prefix: string }[] = [
    { value: 'restaurant', label: 'Restaurant', prefix: 'R' },
    { value: 'cafe', label: 'Café', prefix: 'C' },
    { value: 'restaurant_cafe', label: 'Restaurant & Café', prefix: 'RC' },
    { value: 'take_away', label: 'Take Away', prefix: 'T' },
    { value: 'fast_food', label: 'Fast Food', prefix: 'T' },
    { value: 'bakery', label: 'Bakery', prefix: 'BK' },
    { value: 'pastry', label: 'Pastry Shop', prefix: 'PS' },
    { value: 'hotel', label: 'Hotel', prefix: 'H' },
    { value: 'resort', label: 'Resort', prefix: 'V' },
    { value: 'tourist_village', label: 'Tourist Village', prefix: 'V' },
    { value: 'food_beverage_outlet', label: 'Food & Beverage Outlet', prefix: 'FB' },
    { value: 'other', label: 'Other Hospitality', prefix: 'O' },
  ];

  const handleNext = () => {
    setError('');
    if (step === 1) {
      if (!formData.ownerName || !formData.businessName || !formData.nationalId) {
        setError('Please fill in all mandatory identification and establishment details.');
        return;
      }
    }
    if (step === 2) {
      if (!formData.address || !formData.city || !formData.country || !formData.phone || !formData.email) {
        setError('Please complete the mandatory address and contact numbers.');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!formData.termsAccepted || !formData.privacyAccepted) {
      setError('You must accept the Terms & Conditions and Privacy Policy.');
      return;
    }

    const created = registerEstablishment(formData);
    // Success screen will be displayed
  };

  const handleFinishAndEnter = () => {
    setRegisteredSuccessEst(null);
    setActiveView('dashboard');
  };

  // If registered successfully, show Establishment Code Flow
  if (registeredSuccessEst) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#070b14] text-slate-100">
        <div className="w-full max-w-xl bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-amber-500" />
          
          <div className="mx-auto w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-9 h-9 text-emerald-400" />
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white mb-2">
            Establishment Registered Successfully
          </h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            Your multi-tenant hospitality partition has been provisioned. Save your establishment code for future terminal and staff sign-ins.
          </p>

          {/* Generated Code Badge */}
          <div className="p-6 bg-slate-950/80 border border-slate-800 rounded-xl mb-6 text-center">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-semibold block mb-1">
              Official Establishment Code
            </span>
            <div className="text-4xl font-black font-mono tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400">
              {registeredSuccessEst.code}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Partition Prefix: <span className="font-semibold text-slate-300">{registeredSuccessEst.prefix}</span> · Serial: <span className="font-semibold text-slate-300">{registeredSuccessEst.number}</span>
            </p>
          </div>

          {/* Registration Details Summary */}
          <div className="grid grid-cols-2 gap-3 text-left p-4 bg-slate-800/40 rounded-xl border border-slate-800/60 text-xs mb-8">
            <div>
              <span className="text-slate-500 block">Business Name</span>
              <span className="font-semibold text-slate-200">{registeredSuccessEst.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Authorized Owner</span>
              <span className="font-semibold text-slate-200">{registeredSuccessEst.ownerName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Root Username</span>
              <span className="font-mono text-cyan-300 font-medium">{formData.username}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Primary Contact</span>
              <span className="text-slate-200">{registeredSuccessEst.phone}</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-500 block">Registered Email</span>
              <span className="text-slate-200">{registeredSuccessEst.email}</span>
            </div>
          </div>

          <button
            onClick={handleFinishAndEnter}
            className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue to Setup & Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-[#070b14] text-slate-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <TygosLogo variant="compact" />
          <button
            onClick={onCancel}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Back to Login
          </button>
        </div>

        {/* Wizard Steps Tracker */}
        <div className="py-6 flex items-center justify-between gap-2 border-b border-slate-800/80 mb-6">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
              1
            </div>
            <span className="text-xs font-medium text-slate-300 hidden sm:inline">Establishment</span>
          </div>
          <div className="h-0.5 flex-1 bg-slate-800" />
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
              2
            </div>
            <span className="text-xs font-medium text-slate-300 hidden sm:inline">Location & Contact</span>
          </div>
          <div className="h-0.5 flex-1 bg-slate-800" />
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
              3
            </div>
            <span className="text-xs font-medium text-slate-300 hidden sm:inline">Account & Security</span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-950/40 border border-rose-500/30 rounded-lg text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          {/* Step 1: Business Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-cyan-400" />
                <span>Establishment & Ownership Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Owner Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Business / Establishment Name *
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Business Type *
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value as BusinessType })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                >
                  {businessTypes.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label} (Code Prefix: {t.prefix}.0000)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    National ID *
                  </label>
                  <input
                    type="text"
                    value={formData.nationalId}
                    onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-cyan-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Commercial Reg. (CR)
                  </label>
                  <input
                    type="text"
                    value={formData.crNumber}
                    onChange={(e) => setFormData({ ...formData, crNumber: e.target.value })}
                    placeholder="Optional"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-cyan-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Tax Card Number
                  </label>
                  <input
                    type="text"
                    value={formData.taxNumber}
                    onChange={(e) => setFormData({ ...formData, taxNumber: e.target.value })}
                    placeholder="Optional"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-cyan-500 focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location & Contact */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span>Geographic Location & Contact Details</span>
              </h3>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Full Street Address *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">State / Governorate</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Country *</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Primary Phone *</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Secondary Phone</label>
                  <input
                    type="text"
                    value={formData.secondaryPhone}
                    onChange={(e) => setFormData({ ...formData, secondaryPhone: e.target.value })}
                    placeholder="Optional"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Account Credentials & Preferences */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-cyan-400" />
                <span>Security Credentials & System Settings</span>
              </h3>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Root Username *</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Password *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="w-full px-3 py-2 pr-10 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Confirm Password *</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                      className="w-full px-3 py-2 pr-10 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Preferred Language</label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="en">English (US/UK)</option>
                    <option value="ar">العربية (Arabic - RTL)</option>
                    <option value="fr">Français (French)</option>
                    <option value="nl">Nederlands (Dutch)</option>
                    <option value="tr">Türkçe (Turkish)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Base Currency</label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="EGP">EGP (E£)</option>
                    <option value="SAR">SAR (SR)</option>
                    <option value="AED">AED (AED)</option>
                    <option value="TRY">TRY (₺)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Time Zone</label>
                  <input
                    type="text"
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-0"
                  />
                  <span>I agree to the Tygos SaaS Terms of Service and Multi-tenant Agreement</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.privacyAccepted}
                    onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-0"
                  />
                  <span>I acknowledge the Data Privacy Policy and In-Memory Isolation Policy</span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-cyan-900/40"
              >
                <Shield className="w-4 h-4" />
                <span>Complete Registration</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
