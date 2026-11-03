/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Scale,
  Trash2,
  PieChart,
  Layers,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { MOCK_CONSUMPTION_VARIANCES, MOCK_COST_KPIS } from '../../data/mockData.ts';

export const CostControlModule: React.FC = () => {
  const [selectedCostCenter, setSelectedCostCenter] = useState<string>('All');

  const costCenters = [
    { name: 'All Centers', code: 'ALL' },
    { name: 'Kitchen Hot Line', code: 'CC-01' },
    { name: 'Butchery & Meat Prep', code: 'CC-02' },
    { name: 'Lounge Bar & Mixology', code: 'CC-03' },
    { name: 'Artisan Bakehouse & Pastry', code: 'CC-04' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Cost Control & Operational Variance
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Theoretical vs actual ingredient consumption, production waste logs, yield percentages, and prime cost auditing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20 font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>1 Critical Variance Detected</span>
          </span>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_COST_KPIS.map((kpi, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">{kpi.title}</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  kpi.status === 'normal'
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                }`}
              >
                {kpi.status}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                {kpi.currentPercent}%
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Target: {kpi.targetPercent}%
              </span>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>MTD Expenditure:</span>
              <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                ${kpi.monthlyAmount.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Theoretical vs Actual Consumption Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Theoretical vs Actual Ingredient Consumption
            </h3>
            <p className="text-[11px] text-slate-500">
              Cross-checked automatically between POS recipe deductions and physical warehouse issues.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {costCenters.map((cc) => (
              <button
                key={cc.code}
                onClick={() => setSelectedCostCenter(cc.code)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCostCenter === cc.code
                    ? 'bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-white'
                }`}
              >
                {cc.name}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 border-b border-slate-200 dark:border-slate-800 font-semibold">
              <tr>
                <th className="py-3 px-4">Raw Ingredient</th>
                <th className="py-3 px-3">Unit</th>
                <th className="py-3 px-3 text-right">Theoretical (BOM)</th>
                <th className="py-3 px-3 text-right">Actual Depletion</th>
                <th className="py-3 px-3 text-right">Variance Qty</th>
                <th className="py-3 px-3 text-right">Variance Value</th>
                <th className="py-3 px-3 text-right">Recorded Waste</th>
                <th className="py-3 px-3 text-right">Yield %</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {MOCK_CONSUMPTION_VARIANCES.map((v) => (
                <tr
                  key={v.ingredientId}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-200">
                    {v.name}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500">
                    {v.unit}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700 dark:text-slate-300">
                    {v.theoreticalConsumption}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700 dark:text-slate-300">
                    {v.actualConsumption}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-amber-500">
                    +{v.varianceQuantity}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-rose-500">
                    ${v.varianceValue.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-500">
                    {v.wasteQuantity} {v.unit}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                    {v.yieldPercent}%
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        v.status === 'normal'
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : v.status === 'warning'
                          ? 'bg-amber-500/10 text-amber-500'
                          : 'bg-rose-500/10 text-rose-500 border border-rose-500/30'
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>Formula: Variance = Actual Physical Usage - Recipe Theoretical Usage</span>
          <span className="font-mono text-rose-500 font-medium">Net Variance Impact: -$596.80</span>
        </div>
      </div>
    </div>
  );
};
