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
  LogOut,
  Menu,
  X,
  AlertCircle,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.tsx';
import { useI18n } from '../../i18n/I18nContext.tsx';
import { TygosLogo } from '../brand/TygosLogo.tsx';
import { ConnectivityStatus } from '../common/ConnectivityStatus.tsx';
import { LanguageSelector } from '../common/LanguageSelector.tsx';
import { ThemeSwitcher } from '../common/ThemeSwitcher.tsx';
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

  const { t, dir, language } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const role = currentUser?.role || 'tenant_admin';

  const allNavItems = [
    {
      id: 'super_admin',
      label: t('navigation.superAdmin', 'Super Admin Center'),
      icon: ShieldAlert,
      roles: ['super_admin'],
      badge: 'Platform',
    },
    {
      id: 'dashboard',
      label: t('navigation.dashboard', 'Executive Dashboard'),
      icon: LayoutDashboard,
      roles: ['tenant_admin', 'general_manager', 'financial_manager', 'super_admin'],
    },
    {
      id: 'pos',
      label: t('navigation.pos', 'Point of Sale (POS)'),
      icon: UtensilsCrossed,
      roles: ['tenant_admin', 'general_manager', 'cashier', 'waiter', 'store_manager', 'super_admin'],
      badge: 'POS',
    },
    {
      id: 'menu',
      label: t('navigation.menu', 'Menu & Recipes (BOM)'),
      icon: ChefHat,
      roles: ['tenant_admin', 'general_manager', 'kitchen_manager', 'bar_manager', 'cost_accountant', 'super_admin'],
    },
    {
      id: 'cost_control',
      label: t('navigation.costControl', 'Cost Control & Variance'),
      icon: Scale,
      roles: ['tenant_admin', 'general_manager', 'cost_accountant', 'financial_manager', 'super_admin'],
    },
    {
      id: 'inventory',
      label: t('navigation.inventory', 'Inventory Warehouses'),
      icon: Package,
      roles: ['tenant_admin', 'general_manager', 'store_manager', 'cost_accountant', 'kitchen_manager', 'super_admin'],
    },
    {
      id: 'purchasing',
      label: t('navigation.purchasing', 'Purchasing & Suppliers'),
      icon: ShoppingBag,
      roles: ['tenant_admin', 'general_manager', 'store_manager', 'financial_manager', 'financial_accountant', 'super_admin'],
    },
    {
      id: 'finance',
      label: t('navigation.finance', 'Finance & Accounting'),
      icon: DollarSign,
      roles: ['tenant_admin', 'general_manager', 'financial_manager', 'financial_accountant', 'super_admin'],
    },
    {
      id: 'tax',
      label: t('navigation.tax', 'Tax & E-Invoicing'),
      icon: Receipt,
      roles: ['tenant_admin', 'financial_manager', 'tax_accountant', 'super_admin'],
    },
    {
      id: 'hr',
      label: t('navigation.hr', 'HR & Labor Accounting'),
      icon: Users,
      roles: ['tenant_admin', 'general_manager', 'hr_manager', 'super_admin'],
    },
    {
      id: 'crm',
      label: t('navigation.crm', 'CRM & Guest Loyalty'),
      icon: HeartHandshake,
      roles: ['tenant_admin', 'general_manager', 'public_relations', 'cashier', 'super_admin'],
    },
    {
      id: 'chat',
      label: t('navigation.chat', 'Staff Internal Chat'),
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

  const visibleNavItems = allNavItems.filter((item) => item.roles.includes(role));

  const roleLabels: Record<UserRole, { ar: string; en: string }> = {
    super_admin: { ar: 'المدير العام للمنظومة', en: 'Super Admin' },
    tenant_admin: { ar: 'مدير المنشأة / المالك', en: 'Tenant Admin' },
    general_manager: { ar: 'المدير العام للتشغيل', en: 'General Manager' },
    financial_manager: { ar: 'المدير المالي (CFO)', en: 'Financial Manager' },
    financial_accountant: { ar: 'المحاسب المالي', en: 'Financial Accountant' },
    cost_accountant: { ar: 'محاسب التكاليف والانحراف', en: 'Cost Accountant' },
    tax_accountant: { ar: 'محاسب الضرائب', en: 'Tax Accountant' },
    store_manager: { ar: 'أمين المستودعات والمخازن', en: 'Store Manager' },
    cashier: { ar: 'كاشير نقطة البيع', en: 'POS Cashier' },
    hr_manager: { ar: 'مدير الموارد البشرية', en: 'HR Manager' },
    public_relations: { ar: 'مسؤول علاقات كبار الضيوف', en: 'Public Relations' },
    kitchen_manager: { ar: 'رئيس الطهاة (Executive Chef)', en: 'Kitchen Head' },
    bar_manager: { ar: 'مدير المشروبات والبار', en: 'Bar Manager' },
    waiter: { ar: 'مضيف الصالة (Waiter)', en: 'Floor Waiter' },
  };

  const currentRoleLabel = roleLabels[role]?.[language === 'ar' ? 'ar' : 'en'] || role;

  return (
    <div
      dir={dir}
      className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col antialiased transition-colors duration-200"
    >
      {/* 1. Secure Maintenance Support Session Banner */}
      {activeSupportSession && (
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold px-4 py-2 text-xs flex items-center justify-between shadow-md z-50">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              {language === 'ar' ? (
                <>
                  جلسة دعم فني مؤقتة نشطة: المنشأة المستهدفة{' '}
                  <strong>{activeSupportSession.targetEstablishmentName}</strong> (
                  <span className="font-mono" dir="ltr">{activeSupportSession.targetEstablishmentCode}</span>).{' '}
                  السبب: "{activeSupportSession.reason}".
                </>
              ) : (
                <>
                  ACTIVE TEMPORARY SUPPORT TUNNEL: Viewing{' '}
                  <strong>{activeSupportSession.targetEstablishmentName}</strong> (
                  <span className="font-mono" dir="ltr">{activeSupportSession.targetEstablishmentCode}</span>).{' '}
                  Reason: "{activeSupportSession.reason}".
                </>
              )}
            </span>
          </div>
          <button
            onClick={endSupportSession}
            className="px-3 py-1 bg-slate-950 text-white rounded-md text-[11px] hover:bg-slate-900 transition-colors cursor-pointer shrink-0 ms-2"
          >
            {language === 'ar' ? 'إنهاء جلسة الدعم' : 'Exit Support Session'}
          </button>
        </div>
      )}

      {/* 2. Top Bar (Top Bar Contract: 3 Zones) */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark & Partition Identifier */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white"
            aria-label="Toggle Navigation Menu"
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
            <div className="hidden sm:flex items-center gap-2 ms-2 ps-3 border-s border-slate-200 dark:border-slate-800">
              <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400" dir="ltr">
                {currentEstablishment.code}
              </span>
              <span className="text-xs text-slate-500 truncate max-w-xs">
                {currentEstablishment.name}
              </span>
            </div>
          )}
        </div>

        {/* Zone 2: Universal Search Affordance */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-cyan-500" />
              <span>{t('common.search', 'Search across system (⌘K)...')}</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400" dir="ltr">
              ⌘K
            </span>
          </button>
        </div>

        {/* Zone 3: Interactive Utilities (Connectivity, Role Switcher, Language, Theme, Logout) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Connectivity & Sync Status */}
          <ConnectivityStatus />

          {/* Role Simulator Switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 hover:bg-cyan-100 dark:hover:bg-cyan-950/60 transition-colors cursor-pointer"
              title={language === 'ar' ? 'محاكاة الأدوار والصلاحيات' : 'Simulate roles'}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span className="hidden xl:inline">{currentRoleLabel}</span>
              <span className="xl:hidden">
                {language === 'ar' ? 'الدور' : 'Role'}
              </span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute end-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-2 z-50 text-xs max-h-96 overflow-y-auto animate-fade-in">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1 block">
                  {t('auth.quickRoles', 'Simulate Role-Based Dashboards')}
                </span>
                {Object.entries(roleLabels).map(([rKey, rObj]) => {
                  const label = language === 'ar' ? rObj.ar : rObj.en;
                  return (
                    <button
                      key={rKey}
                      type="button"
                      onClick={() => {
                        switchRole(rKey as UserRole);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-start px-2.5 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                        role === rKey
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{label}</span>
                      {role === rKey && <span className="text-[10px]">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Language Selector */}
          <LanguageSelector variant="header" />

          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* Sign Out Action */}
          <button
            type="button"
            onClick={logout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
            title={t('auth.logout', 'Sign Out')}
          >
            <LogOut className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </header>

      {/* 3. Main Body Split: Left/Right Sidebar + Content Canvas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`w-64 bg-white dark:bg-slate-900 border-e border-slate-200 dark:border-slate-800 shrink-0 flex flex-col justify-between p-3 overflow-y-auto ${
            mobileMenuOpen
              ? 'fixed inset-y-16 start-0 z-40 block shadow-2xl'
              : 'hidden lg:flex'
          }`}
        >
          {/* Navigation Links */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 block">
              {language === 'ar' ? 'القوائم التشغيلية' : 'Navigation'} · {currentRoleLabel}
            </span>

            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
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

          {/* Sidebar Footer: Phase 2 Foundation Banner */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 mt-4">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-300 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span>{t('common.phase2Badge', 'Phase 2 Architecture')}</span>
            </div>
            <p className="leading-relaxed">
              {language === 'ar'
                ? 'واجهات عربية أصيلة مع دعم كامل للغة الإنجليزية ونظام سمات متكامل دون قواعد بيانات.'
                : 'Native Arabic-first foundation with complete English support and dual-theme tokens.'}
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>

      {/* 4. Footer Banner */}
      <footer className="py-2.5 px-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800 dark:text-slate-200">Tygos</span>
          <span>· {t('brand.tagline', 'Hospitality ERP & Intelligence Platform')}</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px]">
          <span>{language === 'ar' ? 'العربية (الافتراضية)' : 'Arabic (Primary)'}</span>
          <span>·</span>
          <span>{dir.toUpperCase()}</span>
          <span>·</span>
          <span className="text-cyan-500 font-bold">{t('common.phase2Badge', 'Phase 2 Foundation')}</span>
        </div>
      </footer>
    </div>
  );
};
