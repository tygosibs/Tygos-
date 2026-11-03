/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  LayoutDashboard,
  UtensilsCrossed,
  ChefHat,
  Scale,
  Package,
  ShoppingBag,
  DollarSign,
  Receipt,
  Users,
  HeartHandshake,
  MessageSquare,
  ShieldAlert,
  Search,
  Sun,
  Moon,
  Globe,
  LogOut,
  Menu,
  X,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronDown,
  Building2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.tsx';
import { useTheme } from '../../theme/ThemeContext.tsx';
import { LanguageCode, useI18n } from '../../i18n/I18nContext.tsx';
import { TygosLogo } from '../brand/TygosLogo.tsx';
import { SyncStatusIndicator } from '../sync/SyncStatusIndicator.tsx';
import { UserRole } from '../../types/index.ts';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const {
    currentUser,
    currentEstablishment,
    activeView,
    setActiveView,
    logout,
    switchRole,
    activeSupportSession,
    endSupportSession,
    setIsSearchOpen,
  } = useAuth();

  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t, dir } = useI18n();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Role-filtered navigation definition
  const role = currentUser?.role || 'tenant_admin';

  const allNavItems = [
    {
      id: 'super_admin',
      label: t('nav.super_admin', 'Super Admin Center'),
      icon: ShieldAlert,
      roles: ['super_admin'],
      badge: 'Platform',
    },
    {
      id: 'dashboard',
      label: t('nav.dashboard', 'Executive Dashboard'),
      icon: LayoutDashboard,
      roles: ['tenant_admin', 'general_manager', 'financial_manager', 'super_admin'],
    },
    {
      id: 'pos',
      label: t('nav.pos', 'Point of Sale (POS)'),
      icon: UtensilsCrossed,
      roles: ['tenant_admin', 'general_manager', 'cashier', 'waiter', 'store_manager', 'super_admin'],
      badge: 'Touch POS',
    },
    {
      id: 'menu',
      label: t('nav.menu', 'Menu & Recipes (BOM)'),
      icon: ChefHat,
      roles: ['tenant_admin', 'general_manager', 'kitchen_manager', 'bar_manager', 'cost_accountant', 'super_admin'],
    },
    {
      id: 'cost_control',
      label: t('nav.cost_control', 'Cost Control & Variance'),
      icon: Scale,
      roles: ['tenant_admin', 'general_manager', 'cost_accountant', 'financial_manager', 'super_admin'],
    },
    {
      id: 'inventory',
      label: t('nav.inventory', 'Inventory Warehouses'),
      icon: Package,
      roles: ['tenant_admin', 'general_manager', 'store_manager', 'cost_accountant', 'kitchen_manager', 'super_admin'],
    },
    {
      id: 'purchasing',
      label: t('nav.purchasing', 'Purchasing & Suppliers'),
      icon: ShoppingBag,
      roles: ['tenant_admin', 'general_manager', 'store_manager', 'financial_manager', 'financial_accountant', 'super_admin'],
    },
    {
      id: 'finance',
      label: t('nav.finance', 'Finance & Accounting'),
      icon: DollarSign,
      roles: ['tenant_admin', 'general_manager', 'financial_manager', 'financial_accountant', 'super_admin'],
    },
    {
      id: 'tax',
      label: t('nav.tax', 'Tax & E-Invoicing'),
      icon: Receipt,
      roles: ['tenant_admin', 'financial_manager', 'tax_accountant', 'super_admin'],
    },
    {
      id: 'hr',
      label: t('nav.hr', 'HR & Labor Accounting'),
      icon: Users,
      roles: ['tenant_admin', 'general_manager', 'hr_manager', 'super_admin'],
    },
    {
      id: 'crm',
      label: t('nav.crm', 'CRM & Guest Loyalty'),
      icon: HeartHandshake,
      roles: ['tenant_admin', 'general_manager', 'public_relations', 'cashier', 'super_admin'],
    },
    {
      id: 'chat',
      label: t('nav.chat', 'Staff Internal Chat'),
      icon: MessageSquare,
      roles: [
        'tenant_admin',
        'general_manager',
        'kitchen_manager',
        'bar_manager',
        'cashier',
        'waiter',
        'store_manager',
        'hr_manager',
        'cost_accountant',
        'financial_accountant',
        'super_admin',
      ],
    },
  ];

  // Filter navigation items accessible to active role
  const visibleNavItems = allNavItems.filter((item) => item.roles.includes(role));

  const roleLabels: Record<UserRole, string> = {
    super_admin: 'Super Admin',
    tenant_admin: 'Tenant Admin',
    general_manager: 'General Manager',
    financial_manager: 'Financial Manager (CFO)',
    financial_accountant: 'Financial Accountant',
    cost_accountant: 'Cost Controller',
    tax_accountant: 'Tax Accountant',
    store_manager: 'Store / Warehouse Manager',
    cashier: 'POS Cashier',
    hr_manager: 'HR Manager',
    public_relations: 'Public Relations & VIP',
    kitchen_manager: 'Executive Chef',
    bar_manager: 'Head Mixologist',
    waiter: 'Floor Waiter',
  };

  const languages: { code: LanguageCode; label: string; dir: string }[] = [
    { code: 'en', label: 'English', dir: 'LTR' },
    { code: 'ar', label: 'العربية (Arabic)', dir: 'RTL' },
    { code: 'fr', label: 'Français', dir: 'LTR' },
    { code: 'nl', label: 'Nederlands', dir: 'LTR' },
    { code: 'tr', label: 'Türkçe', dir: 'LTR' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col antialiased transition-colors duration-200">
      {/* 1. Secure Maintenance Support Session Banner (if Super Admin entered tenant) */}
      {activeSupportSession && (
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-bold px-4 py-2 text-xs flex items-center justify-between shadow-md z-50">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              ACTIVE TEMPORARY SUPPORT TUNNEL: Viewing{' '}
              <strong>{activeSupportSession.targetEstablishmentName}</strong> (
              <span className="font-mono">{activeSupportSession.targetEstablishmentCode}</span>).
              Session Reason: "{activeSupportSession.reason}".
            </span>
          </div>
          <button
            onClick={endSupportSession}
            className="px-3 py-1 bg-slate-950 text-white rounded-md text-[11px] hover:bg-slate-900 transition-colors cursor-pointer shrink-0 ml-2"
          >
            Exit Monitored Support Session
          </button>
        </div>
      )}

      {/* 2. Top Bar (Top Bar Contract: 3 Zones) */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Zone 1: Single text/logo element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div
            onClick={() => setActiveView(role === 'super_admin' ? 'super_admin' : 'dashboard')}
            className="cursor-pointer"
          >
            <TygosLogo variant="compact" />
          </div>
          {currentEstablishment && role !== 'super_admin' && (
            <div className="hidden sm:flex items-center gap-1.5 ml-2 pl-3 border-l border-slate-200 dark:border-slate-800">
              <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400">
                {currentEstablishment.code}
              </span>
              <span className="text-xs text-slate-500 truncate max-w-xs">
                {currentEstablishment.name}
              </span>
            </div>
          )}
        </div>

        {/* Zone 2: Search Affordance & Universal Quick Actions */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-400 hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>{t('common.search', 'Search everything (Cmd+K)...')}</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              ⌘K
            </span>
          </button>
        </div>

        {/* Zone 3: Interactive Utilities (Sync, Role Simulator, Lang, Theme, User) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Offline/Online Sync Status */}
          <SyncStatusIndicator />

          {/* Role Simulator Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 hover:bg-cyan-100 dark:hover:bg-cyan-950/60 transition-colors cursor-pointer"
              title="Simulate different staff and management roles"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span className="hidden xl:inline">{roleLabels[role]}</span>
              <span className="xl:hidden">Role: {role.split('_')[0].toUpperCase()}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-2 z-50 text-xs max-h-96 overflow-y-auto">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1 block">
                  Simulate Role-Based Dashboards
                </span>
                {Object.entries(roleLabels).map(([rKey, rLabel]) => (
                  <button
                    key={rKey}
                    onClick={() => {
                      switchRole(rKey as UserRole);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      role === rKey
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{rLabel}</span>
                    {role === rKey && <span className="text-[10px]">Active</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold uppercase"
              title="Change System Language & Direction"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{language}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-1.5 z-50 text-xs">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                      language === l.code
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-[10px] opacity-70 font-mono">{l.dir}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-600" />
            )}
          </button>

          {/* Sign Out Action */}
          <button
            onClick={logout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
            title="Sign Out / Switch Establishment"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 3. Main Body Split: Left Sidebar + Content Canvas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar (240px - 260px) */}
        <aside
          className={`w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shrink-0 flex flex-col justify-between p-3 overflow-y-auto ${
            mobileMenuOpen ? 'fixed inset-y-16 left-0 z-40 block shadow-2xl' : 'hidden lg:flex'
          }`}
        >
          {/* Nav Links */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 block">
              Navigation · {roleLabels[role]}
            </span>

            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                        isActive
                          ? 'bg-slate-950 text-white'
                          : 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer: Phase 1 Isolation Banner */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 mt-4">
            <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Phase 1 Architecture</span>
            </div>
            <p className="leading-tight">
              UI/UX & Mock Data isolation. No real database or cloud infrastructure provisioned yet.
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>

      {/* 4. Footer Banner */}
      <footer className="py-2.5 px-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700 dark:text-slate-200">Tygos</span>
          <span>· Hospitality ERP & Intelligence Platform</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px]">
          <span>Dark Mode (Primary)</span>
          <span>·</span>
          <span>Multilingual (LTR / RTL)</span>
          <span>·</span>
          <span className="text-cyan-500 font-semibold">Phase 1 Approved Scope</span>
        </div>
      </footer>
    </div>
  );
};
