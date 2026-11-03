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
  ChevronDown,
  LogOut,
  Search,
  Menu,
  X,
  ExternalLink,
  Sparkles,
  Sliders,
  Shield,
  HelpCircle,
  Bell,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.tsx';
import { useI18n } from '../../i18n/I18nContext.tsx';
import { useBusiness } from '../../context/BusinessContext.tsx';
import { TygosLogo } from '../brand/TygosLogo.tsx';
import { LanguageSelector } from '../common/LanguageSelector.tsx';
import { ThemeSwitcher } from '../common/ThemeSwitcher.tsx';
import { ConnectivityStatus } from '../common/ConnectivityStatus.tsx';
import { UserRole } from '../../types/index.ts';

const TYGOS_MARK_SRC = '/assets/aistudio/1793697201912_bf1cbdeb.png';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
  const role: UserRole = currentUser?.role || 'tenant_admin';
  const { t, language, dir } = useI18n();
  const isAr = language === 'ar';
  const {
    setIsAssistantOpen,
    setIsSimulationModalOpen,
    setIsAuditReportModalOpen,
    setIsHelpOpen,
    privilegedRequests,
  } = useBusiness();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const pendingRequestsCount = privilegedRequests.filter((r) => r.status === 'pending').length;

  const roleLabels: Record<UserRole, { ar: string; en: string }> = {
    super_admin: { ar: 'المدير العام للمنظومة', en: 'Super Admin' },
    tenant_admin: { ar: 'مالك / مدير المنشأة', en: 'Establishment Owner' },
    general_manager: { ar: 'المدير العام (GM)', en: 'General Manager' },
    financial_manager: { ar: 'المدير المالي (CFO)', en: 'Financial Director' },
    financial_accountant: { ar: 'المحاسب المالي', en: 'Financial Accountant' },
    cost_accountant: { ar: 'محاسب التكاليف والانحراف', en: 'Cost Controller' },
    tax_accountant: { ar: 'محاسب الضرائب والفواتير', en: 'Tax Accountant' },
    store_manager: { ar: 'أمين المستودع المركزي', en: 'Warehouse Manager' },
    cashier: { ar: 'أمين الصندوق (كاشير)', en: 'Cashier' },
    hr_manager: { ar: 'مدير الموارد البشرية', en: 'HR Manager' },
    public_relations: { ar: 'علاقات الضيوف وكبار الشخصيات', en: 'Guest Relations' },
    kitchen_manager: { ar: 'رئيس الطهاة (شيف المطبخ)', en: 'Executive Chef' },
    bar_manager: { ar: 'مدير قسم المشروبات والبار', en: 'Bar & Beverage Manager' },
    waiter: { ar: 'مقدم خدمة (نادل)', en: 'Service Waiter' },
  };

  const navItems = [
    {
      id: 'dashboard',
      label: t('navigation.dashboard', 'Executive Dashboard'),
      icon: LayoutDashboard,
      roles: [
        'tenant_admin',
        'general_manager',
        'financial_manager',
        'financial_accountant',
        'cost_accountant',
        'store_manager',
        'super_admin',
      ],
    },
    {
      id: 'pos',
      label: t('navigation.pos', 'Point of Sale (POS)'),
      icon: UtensilsCrossed,
      roles: ['cashier', 'waiter', 'general_manager', 'tenant_admin', 'super_admin'],
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
        'financial_accountant',
        'super_admin',
      ],
    },
  ];

  // If super admin, prepend Super Admin console
  if (role === 'super_admin') {
    navItems.unshift({
      id: 'super_admin',
      label: t('admin.controlCenter', 'Super Admin Center'),
      icon: ShieldAlert,
      roles: ['super_admin'],
    });
  }

  const allowedNav = navItems.filter((item) => item.roles.includes(role));
  const currentRoleLabel = roleLabels[role]?.[language === 'ar' ? 'ar' : 'en'] || role;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors" dir={dir}>
      {/* 1. Maintenance / Audit Banner */}
      {activeSupportSession && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-950 animate-ping" />
            <span>
              {language === 'ar'
                ? `جلسة دعم فني نشطة للمنشأة [${activeSupportSession.targetEstablishmentCode}] · المشرف: ${activeSupportSession.adminUsername}`
                : `Active Support Session for [${activeSupportSession.targetEstablishmentCode}] · Admin: ${activeSupportSession.adminUsername}`}
            </span>
          </div>
          <button
            onClick={endSupportSession}
            className="px-3 py-1 rounded bg-slate-950 text-amber-300 hover:bg-slate-900 text-xs font-semibold cursor-pointer"
          >
            {language === 'ar' ? 'إنهاء جلسة الدعم' : 'Exit Support Session'}
          </button>
        </div>
      )}

      {/* 2. Top Header Bar */}
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

        {/* Zone 3: Interactive Utilities */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Tygos AI Assistant Trigger */}
          <button
            type="button"
            onClick={() => setIsAssistantOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-xs cursor-pointer transition-all"
            title={language === 'ar' ? 'مساعد TYGOS الذكي' : 'TYGOS AI Assistant'}
          >
            <div className="w-4 h-4 rounded-sm bg-slate-950/40 p-0.5 flex items-center justify-center">
              <img src={TYGOS_MARK_SRC} alt="Tygos" className="w-full h-full object-contain" />
            </div>
            <span className="hidden sm:inline">TYGOS</span>
          </button>

          {/* Security & Audit Center Notification */}
          <button
            type="button"
            onClick={() => setIsAuditReportModalOpen(true)}
            className="relative p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={language === 'ar' ? 'سجل التدقيق الأمني' : 'Security Audit Trail'}
          >
            <Shield className="w-4 h-4 text-purple-400" />
            {pendingRequestsCount > 0 && (
              <span className="absolute -top-1 -end-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-mono font-bold rounded-full flex items-center justify-center">
                {pendingRequestsCount}
              </span>
            )}
          </button>

          {/* Help Center */}
          <button
            type="button"
            onClick={() => setIsHelpOpen(true)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={language === 'ar' ? 'دليل التشغيل والمعرفة (SOP)' : 'Help & Knowledge Center'}
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
          </button>

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

      {/* 3. Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <aside
          className={`w-64 border-e border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex flex-col justify-between shrink-0 p-4 transition-all z-30 ${
            mobileMenuOpen
              ? 'fixed inset-y-0 start-0 z-50 bg-white dark:bg-slate-900 shadow-2xl pt-20 lg:pt-4 block'
              : 'hidden lg:flex'
          }`}
        >
          {/* Menu Items List */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 block">
              {language === 'ar' ? 'الوحدات التشغيلية والمالية' : 'Operations & Management'}
            </span>
            {allowedNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-500' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer: Phase 3 Architecture Banner */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 mt-4">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-300 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span>{isAr ? 'المرحلة 3 · الذكاء المترابط' : 'Phase 3 Connected Engine'}</span>
            </div>
            <p className="leading-relaxed text-[10px]">
              {isAr
                ? 'محرك تكلفة حقيقي، إصدارات الوصفات، وتحليل مسببات الأرباح ومساعد TYGOS الذكي دون قواعد بيانات.'
                : 'True product costing, recipe versioning, profit drivers, and TYGOS AI without real database.'}
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-[1600px] w-full mx-auto relative">
          {children}

          {/* Floating TYGOS AI Assistant Trigger Button (Bottom-End) */}
          <div className="fixed bottom-6 end-6 z-40">
            <button
              onClick={() => setIsAssistantOpen(true)}
              className="group p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white shadow-xl hover:scale-105 transition-all flex items-center gap-2 border border-cyan-400/40 cursor-pointer"
              title={isAr ? 'تحدث مع مساعد TYGOS' : 'Chat with TYGOS'}
            >
              <div className="w-8 h-8 rounded-xl bg-slate-950/50 p-1 flex items-center justify-center">
                <img
                  src={TYGOS_MARK_SRC}
                  alt="TYGOS AI"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-bold pe-2 hidden sm:inline">
                {isAr ? 'مساعد TYGOS' : 'Ask TYGOS'}
              </span>
            </button>
          </div>
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
          <span className="text-cyan-500 font-bold">
            {isAr ? 'المرحلة 3 · معمارية الأعمال والذكاء الإداري' : 'Phase 3 · Core Business & AI Intelligence'}
          </span>
        </div>
      </footer>
    </div>
  );
};
