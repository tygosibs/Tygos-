/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  DollarSign,
  BookOpen,
  FileText,
  CreditCard,
  Building,
  ArrowRight,
  TrendingUp,
  Receipt,
  Scale,
  Plus,
} from 'lucide-react';
import { MOCK_ACCOUNTS, MOCK_JOURNAL_ENTRIES } from '../../data/mockData.ts';

export const FinanceModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'accounts' | 'journal' | 'trial_balance'>('accounts');

  const totalAssets = MOCK_ACCOUNTS.filter((a) => a.type === 'Asset').reduce(
    (sum, a) => sum + a.balance,
    0
  );
  const totalLiabilities = MOCK_ACCOUNTS.filter((a) => a.type === 'Liability').reduce(
    (sum, a) => sum + a.balance,
    0
  );
  const totalRevenue = MOCK_ACCOUNTS.filter((a) => a.type === 'Revenue').reduce(
    (sum, a) => sum + a.balance,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Finance & General Ledger Accounting
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Chart of accounts, double-entry automated journals, cash registers, banks, and trial balances.
          </p>
        </div>

        <div className="flex p-1 bg-slate-100 dark:bg-slate-950 rounded-lg">
          <button
            onClick={() => setActiveTab('accounts')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'accounts'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            Chart of Accounts
          </button>
          <button
            onClick={() => setActiveTab('journal')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'journal'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            Automated Journal Entries
          </button>
          <button
            onClick={() => setActiveTab('trial_balance')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'trial_balance'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            Trial Balance
          </button>
        </div>
      </div>

      {/* Financial Health Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Operating Asset Pool</span>
            <Building className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black mt-2 font-mono text-slate-900 dark:text-white">
            ${totalAssets.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400">Cash, Banks & Raw Inventory</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Current Payables (Liabilities)</span>
            <Receipt className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black mt-2 font-mono text-amber-500">
            ${totalLiabilities.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400">Trade Suppliers & Output VAT</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Recorded Revenue (MTD)</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black mt-2 font-mono text-emerald-500">
            ${totalRevenue.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-400">POS Food & Beverage Sales</span>
        </div>
      </div>

      {activeTab === 'accounts' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Standard Hospitality Chart of Accounts (COA)
            </h3>
            <span className="text-xs text-slate-500">{MOCK_ACCOUNTS.length} active ledger codes</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 border-b border-slate-200 dark:border-slate-800 font-semibold">
                <tr>
                  <th className="py-3 px-4">Account Code</th>
                  <th className="py-3 px-4">Account Title</th>
                  <th className="py-3 px-4">Classification</th>
                  <th className="py-3 px-4 text-right">Debit / Credit Balance</th>
                  <th className="py-3 px-4">Currency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {MOCK_ACCOUNTS.map((acc) => (
                  <tr key={acc.code} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-mono font-bold text-cyan-600 dark:text-cyan-400">
                      {acc.code}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">
                      {acc.name}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {acc.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">
                      ${acc.balance.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400">
                      {acc.currency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'journal' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Traceable Automated Journal Entries
              </h3>
              <p className="text-[11px] text-slate-500">
                Continuous double-entry ledger stream posted from POS settlements and recipe inventory depletions.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 border-b border-slate-200 dark:border-slate-800 font-semibold">
                <tr>
                  <th className="py-3 px-4">Entry #</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-3">Source</th>
                  <th className="py-3 px-4">Debit Account</th>
                  <th className="py-3 px-4">Credit Account</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {MOCK_JOURNAL_ENTRIES.map((je) => (
                  <tr key={je.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-mono font-bold text-cyan-600 dark:text-cyan-400">
                      {je.entryNumber}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-500">
                      {je.date}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">
                      {je.description}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {je.sourceModule}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                      + {je.debitAccount}
                    </td>
                    <td className="py-3 px-4 text-amber-600 dark:text-amber-400 font-medium">
                      - {je.creditAccount}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">
                      ${je.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'trial_balance' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs text-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Balanced Trial Balance Summary
          </h3>
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl font-mono text-sm">
            <div>
              <span className="text-slate-500 block text-xs">Total Debits</span>
              <span className="font-bold text-emerald-500">$326,980.00</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">Total Credits</span>
              <span className="font-bold text-emerald-500">$326,980.00</span>
            </div>
          </div>
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg">
            ✓ General Ledger is fully balanced across all POS, Inventory, and Payroll dimensions.
          </div>
        </div>
      )}
    </div>
  );
};
