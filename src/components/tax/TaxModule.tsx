/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Receipt,
  FileCheck2,
  Sliders,
  DollarSign,
  TrendingDown,
  TrendingUp,
  FileCode,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { MOCK_TAX_RECORDS } from '../../data/mockData.ts';

export const TaxModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vat' | 'edocs' | 'settings'>('vat');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Tax Engine & Electronic Invoicing
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Output VAT on guest orders, input VAT on verified supplier bills, tax payable netting, and government e-invoice reconciliation.
          </p>
        </div>

        <div className="flex p-1 bg-slate-100 dark:bg-slate-950 rounded-lg">
          <button
            onClick={() => setActiveTab('vat')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'vat'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            VAT Periods & Net Payable
          </button>
          <button
            onClick={() => setActiveTab('edocs')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'edocs'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            Electronic Documents (E-Docs)
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'settings'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            Tax Configuration (Configurable)
          </button>
        </div>
      </div>

      {activeTab === 'vat' && (
        <div className="space-y-6">
          {/* Active Period Netting Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">
                Output VAT Collected (Sales)
              </span>
              <div className="text-2xl font-black mt-2 font-mono text-cyan-600 dark:text-cyan-400">
                $2,651.60
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">From $18,940 gross sales MTD</span>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">
                Input VAT Deductible (Purchases)
              </span>
              <div className="text-2xl font-black mt-2 font-mono text-emerald-500">
                $1,148.00
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Verified supplier invoices</span>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">
                Net Tax Payable to Authority
              </span>
              <div className="text-2xl font-black mt-2 font-mono text-amber-500">
                $1,503.60
              </div>
              <span className="text-[11px] text-amber-500 font-semibold mt-1 block">Due Nov 30, 2026</span>
            </div>
          </div>

          {/* Tax Periods Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Tax Filing & Reconciliation History
              </h3>
              <span className="text-xs text-slate-500">Jurisdiction: Multi-region capable</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 border-b border-slate-200 dark:border-slate-800 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Period</th>
                    <th className="py-3 px-3 text-right">Taxable Sales</th>
                    <th className="py-3 px-3 text-right">Output VAT</th>
                    <th className="py-3 px-3 text-right">Taxable Purchases</th>
                    <th className="py-3 px-3 text-right">Input VAT</th>
                    <th className="py-3 px-3 text-right">Net Payable</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">E-Doc Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {MOCK_TAX_RECORDS.map((rec, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                        {rec.period}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-700 dark:text-slate-300">
                        ${rec.totalSales.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                        ${rec.outputVat.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-700 dark:text-slate-300">
                        ${rec.totalPurchases.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-emerald-500 font-semibold">
                        ${rec.inputVat.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-black text-amber-500">
                        ${rec.taxPayable.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            rec.status === 'submitted'
                              ? 'bg-emerald-500/10 text-emerald-500'
                              : rec.status === 'reconciled'
                              ? 'bg-blue-500/10 text-blue-500'
                              : 'bg-amber-500/10 text-amber-500'
                          }`}
                        >
                          {rec.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                        {rec.eDocReference}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'edocs' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs text-xs space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <FileCode className="w-5 h-5" />
            <span>Government Electronic Invoicing & Cryptographic Signing API Gateway</span>
          </div>
          <p className="text-slate-500 leading-relaxed">
            Every POS order and supplier invoice automatically conforms to official tax authority electronic schemas (e.g. ZATCA Phase 2, ETA Egypt E-Receipt, EU VAT Peppol UBL).
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <span>Cryptographic HSM / Private Certificate Status:</span>
              <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ready & Active
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Signed Invoices Dispatched This Month:</span>
              <span className="font-mono text-cyan-400 font-bold">1,492 documents</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs text-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Configurable Tax Rates (Non-Hardcoded Architecture)</span>
          </div>
          <p className="text-slate-500">
            Per Phase 1 architectural requirements, tax calculations are isolated in configurable parameter schemas rather than hard-coded logic:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Standard Hospitality Rate</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">14.0%</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Municipality / Tourism Fee</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">1.0%</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Service Charge</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">12.0%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
