/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Wallet,
  Building,
  Package,
  AlertTriangle,
  Users,
  ChefHat,
  ArrowRight,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.tsx';
import { useI18n } from '../../i18n/I18nContext.tsx';
import { MOCK_COST_KPIS, MOCK_TABLES } from '../../data/mockData.ts';

export const TenantDashboard: React.FC = () => {
  const { currentEstablishment, setActiveView } = useAuth();
  const { t, formatCurrency, formatNumber, isRtl } = useI18n();
  const [selectedTraceStep, setSelectedTraceStep] = useState<number>(0);

  const openTablesCount = MOCK_TABLES.filter((t) => t.status === 'occupied').length;
  const waitingPaymentCount = MOCK_TABLES.filter((t) => t.status === 'waiting_payment').length;

  const traceSteps = [
    {
      title: t('dashboard.stepSale'),
      detail: 'Tygos Prime Truffle Ribeye ($48.00) · Table T01',
      targetView: 'pos',
      tag: 'Front of House',
    },
    {
      title: t('dashboard.stepRecipe'),
      detail: '320g Black Angus Ribeye + 30g Truffle Butter + Asparagus',
      targetView: 'menu',
      tag: 'BOM / Kitchen',
    },
    {
      title: t('dashboard.stepInventory'),
      detail: '0.32kg deducted from Walk-in Chiller stock automatically',
      targetView: 'inventory',
      tag: 'Stock Depletion',
    },
    {
      title: t('dashboard.stepCost'),
      detail: 'Recipe cost $14.80 (Food Cost 30.8%) recorded in real-time',
      targetView: 'cost_control',
      tag: 'Variance Control',
    },
    {
      title: t('dashboard.stepAccounting'),
      detail: 'Debit COGS $14.80, Credit Inventory Asset $14.80',
      targetView: 'finance',
      tag: 'General Ledger',
    },
    {
      title: t('dashboard.stepProfit'),
      detail: 'Gross contribution $33.20 (69.2% margin) stream to P&L',
      targetView: 'finance',
      tag: 'Executive P&L',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Establishment Identity */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {currentEstablishment?.name || 'The Royal Mirage Fine Dining'}
            </h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-bold" dir="ltr">
              {currentEstablishment?.code || 'R.0001'}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t('dashboard.subtitle')} · {t('common.phase2Badge')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('pos')}
            className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ChefHat className="w-4 h-4" />
            <span>{t('pos.title')}</span>
          </button>
        </div>
      </div>

      {/* Primary Financial & Operational Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">{t('dashboard.todaysSales')}</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black mt-2 text-slate-900 dark:text-white font-mono" dir="ltr">
            {formatCurrency(8420)}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-500 font-medium mt-1">
            <ArrowUpRight className="w-3 h-3 rtl:rotate-90" />
            <span>+14.2%</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">{t('dashboard.orders')}</span>
            <ShoppingBag className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-2xl font-black mt-2 text-slate-900 dark:text-white font-mono">
            {formatNumber(142)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {t('dashboard.avgTicket')}: <span className="font-mono text-cyan-600 dark:text-cyan-400" dir="ltr">{formatCurrency(59.3)}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">{t('dashboard.cashAndBank')}</span>
            <Wallet className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-xl font-bold mt-2 text-slate-900 dark:text-white font-mono" dir="ltr">
            {formatCurrency(228550)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Cash & Bank
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">{t('dashboard.inventoryValue')}</span>
            <Package className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black mt-2 text-slate-900 dark:text-white font-mono" dir="ltr">
            {formatCurrency(98450)}
          </div>
          <div className="text-[11px] text-amber-500 font-medium mt-1">
            4 {t('inventory.variance')}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">{t('dashboard.primeCost')}</span>
            <TrendingUp className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black mt-2 text-slate-900 dark:text-white font-mono">
            55.2%
          </div>
          <div className="text-[11px] text-amber-500 font-medium mt-1">
            Target: 53.0%
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">{t('dashboard.customerRating')}</span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black mt-2 text-emerald-500 font-mono">
            4.9 <span className="text-xs font-normal text-slate-400">/ 5.0</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            98% CSAT
          </div>
        </div>
      </div>

      {/* Traceable Hospitality Value Chain Architecture Diagram */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-cyan-900/40 rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              {t('dashboard.traceabilityTitle')}
            </h3>
          </div>
          <span className="text-[11px] text-cyan-300/80 font-mono">
            Tygos Integrated Core
          </span>
        </div>

        {/* Step Flow Nodes */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 my-3">
          {traceSteps.map((s, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedTraceStep(idx)}
              className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                selectedTraceStep === idx
                  ? 'bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-950/50'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-200">{s.title}</span>
                {selectedTraceStep === idx && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                )}
              </div>
              <span className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider block mb-1">
                {s.tag}
              </span>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {s.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Selected Step Drill-down Action */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-300">
            <strong className="text-cyan-300">
              {traceSteps[selectedTraceStep].title}
            </strong>{' '}
            — {traceSteps[selectedTraceStep].detail}
          </span>
          <button
            onClick={() => setActiveView(traceSteps[selectedTraceStep].targetView)}
            className="px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{t('dashboard.inspectModule')}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>
      </div>

      {/* Operations Grid: Tables & Cost Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table & Floor Status */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {t('dashboard.floorPlanStatus')}
            </h3>
            <button
              onClick={() => setActiveView('pos')}
              className="text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
            >
              {t('pos.floorPlan')}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4 text-center">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 rounded-lg">
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium block">
                {t('dashboard.occupied')}
              </span>
              <span className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-300">
                {openTablesCount}
              </span>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-500/20 rounded-lg">
              <span className="text-xs text-amber-600 dark:text-amber-400 font-medium block">
                {t('dashboard.waitingPayment')}
              </span>
              <span className="text-xl font-bold font-mono text-amber-700 dark:text-amber-300">
                {waitingPaymentCount}
              </span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg">
              <span className="text-xs text-slate-500 font-medium block">
                {t('dashboard.available')}
              </span>
              <span className="text-xl font-bold font-mono text-slate-700 dark:text-slate-300">
                4
              </span>
            </div>
          </div>

          {/* Quick Table Mini-List */}
          <div className="space-y-2 text-xs">
            {MOCK_TABLES.slice(0, 4).map((tbl) => (
              <div
                key={tbl.id}
                className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/30 flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-slate-900 dark:text-white me-2">
                    {tbl.tableNumber}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {tbl.customerName || t('dashboard.available')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {tbl.orderTotal && (
                    <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400" dir="ltr">
                      {formatCurrency(tbl.orderTotal)}
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      tbl.status === 'occupied'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : tbl.status === 'waiting_payment'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : 'bg-slate-500/10 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {tbl.status === 'occupied' ? t('dashboard.occupied') : tbl.status === 'waiting_payment' ? t('dashboard.waitingPayment') : t('dashboard.available')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Control & Variance Matrix */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {t('dashboard.costBreakdown')}
            </h3>
            <button
              onClick={() => setActiveView('cost_control')}
              className="text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
            >
              {t('navigation.costControl')}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {MOCK_COST_KPIS.map((kpi, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-950/40"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {kpi.title}
                  </span>
                  <span
                    className={`font-semibold font-mono text-xs ${
                      kpi.status === 'normal'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {kpi.currentPercent}%
                  </span>
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-2.5">
                  <div
                    className={`h-full rounded-full transition-all ${
                      kpi.status === 'normal' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min(kpi.currentPercent * 1.5, 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between mt-2 text-[11px] text-slate-400">
                  <span>Target: {kpi.targetPercent}%</span>
                  <span className="font-mono" dir="ltr">{formatCurrency(kpi.monthlyAmount)} MTD</span>
                </div>
              </div>
            ))}
          </div>

          {/* Pending Executive Approvals Alert Box */}
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>
                <strong>{t('dashboard.pendingApprovals')}</strong>: Apex Premium Meats ($5,640.00) & Caputo Imports ($4,180.00).
              </span>
            </div>
            <button
              onClick={() => setActiveView('purchasing')}
              className="text-amber-700 dark:text-amber-400 hover:underline font-semibold shrink-0 ms-2 cursor-pointer"
            >
              {t('navigation.purchasing')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
