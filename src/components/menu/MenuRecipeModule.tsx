/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Utensils,
  Layers,
  ChefHat,
  Search,
  Plus,
  Scale,
  DollarSign,
  TrendingUp,
  Percent,
  Check,
  X,
  FileSpreadsheet,
} from 'lucide-react';
import { MOCK_MENU_ITEMS } from '../../data/mockData.ts';
import { MenuItem, ProductionDepartment } from '../../types/index.ts';
import { useI18n } from '../../i18n/I18nContext.tsx';

export const MenuRecipeModule: React.FC = () => {
  const { t, formatCurrency, formatNumber } = useI18n();

  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<MenuItem>(MOCK_MENU_ITEMS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const departments: (ProductionDepartment | 'All')[] = [
    'All',
    'Grill',
    'Kitchen',
    'Bakery',
    'Pastry',
    'Bar',
    'Preparation',
  ];

  const filteredProducts = MOCK_MENU_ITEMS.filter((p) => {
    const matchesDept = selectedDepartment === 'All' || p.department === selectedDepartment;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.barcode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const grossProfitMargin =
    selectedProduct.sellingPrice > 0
      ? (
          ((selectedProduct.sellingPrice - selectedProduct.recipeCost) /
            selectedProduct.sellingPrice) *
          100
        ).toFixed(1)
      : '0.0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t('menu.title')}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t('menu.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-colors flex items-center gap-1.5 cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>{t('menu.newRecipe')}</span>
          </button>
        </div>
      </div>

      {/* Production Department Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setSelectedDepartment(dept)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              selectedDepartment === dept
                ? 'bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {dept === 'All' ? t('menu.allStations') : dept}
          </button>
        ))}
      </div>

      {/* 2-Column Split: Product List on Left, Comprehensive Recipe BOM on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Product Catalog */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute start-3 top-2.5" />
            <input
              type="text"
              placeholder={t('common.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ps-9 pe-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-2 max-h-[640px] overflow-y-auto pe-1">
            {filteredProducts.map((p) => {
              const isSelected = selectedProduct.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500 text-slate-900 dark:text-white shadow-xs'
                      : 'bg-slate-50/50 dark:bg-slate-950/20 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {p.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {p.category} · {p.department}
                      </p>
                    </div>
                    <span className="font-mono font-black text-xs text-cyan-600 dark:text-cyan-400" dir="ltr">
                      {formatCurrency(p.sellingPrice)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-[11px]">
                    <span className="text-slate-400">
                      BOM: <strong className="font-mono text-slate-700 dark:text-slate-300" dir="ltr">{formatCurrency(p.recipeCost)}</strong>
                    </span>
                    <span
                      className={`font-mono font-bold ${
                        p.foodCostPercentage <= 30
                          ? 'text-emerald-500'
                          : 'text-amber-500'
                      }`}
                    >
                      {t('menu.foodCost')} {p.foodCostPercentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Recipe Bill of Materials Explorer */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-5">
          {/* Header of Selected Item */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedProduct.name}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 font-bold" dir="ltr">
                  {selectedProduct.barcode}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {selectedProduct.category} · {selectedProduct.department} · {t('common.unit')}: {selectedProduct.unit}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                {t('pos.dineIn')}: {selectedProduct.availableDineIn ? '✓' : '✗'}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                {t('pos.takeAway')}: {selectedProduct.availableTakeAway ? '✓' : '✗'}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                {t('pos.delivery')}: {selectedProduct.availableDelivery ? '✓' : '✗'}
              </span>
            </div>
          </div>

          {/* Financial Metrics Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-500 block">{t('menu.sellingPrice')}</span>
              <span className="text-lg font-black font-mono text-slate-900 dark:text-white" dir="ltr">
                {formatCurrency(selectedProduct.sellingPrice)}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">+14% VAT incl.</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-500 block">{t('menu.totalRecipeCost')}</span>
              <span className="text-lg font-black font-mono text-amber-500" dir="ltr">
                {formatCurrency(selectedProduct.recipeCost)}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">BOM Cost</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-500 block">{t('menu.foodCost')} / {t('menu.grossMargin')}</span>
              <span className="text-lg font-black font-mono text-emerald-500">
                {selectedProduct.foodCostPercentage}%
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">
                {grossProfitMargin}% {t('menu.grossMargin')}
              </span>
            </div>
          </div>

          {/* Bill of Materials (BOM) Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <ChefHat className="w-4 h-4 text-cyan-400" />
                <span>{t('menu.bomTitle')}</span>
              </h4>
              <span className="text-[11px] text-slate-400">
                {selectedProduct.recipe.length} ingredients
              </span>
            </div>

            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-start text-xs">
                <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 border-b border-slate-200 dark:border-slate-800 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3 text-start">{t('menu.ingredient')}</th>
                    <th className="py-2.5 px-3 text-end">{t('menu.qty')}</th>
                    <th className="py-2.5 px-3 text-start">{t('common.unit')}</th>
                    <th className="py-2.5 px-3 text-end">{t('menu.portionCost')}</th>
                    <th className="py-2.5 px-3 text-end">{t('menu.costShare')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {selectedProduct.recipe.map((ing, idx) => {
                    const costShare =
                      selectedProduct.recipeCost > 0
                        ? ((ing.cost / selectedProduct.recipeCost) * 100).toFixed(1)
                        : '0';
                    return (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-950/40">
                        <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-slate-200 text-start">
                          {ing.ingredientName}
                        </td>
                        <td className="py-2.5 px-3 text-end font-mono text-slate-700 dark:text-slate-300" dir="ltr">
                          {ing.quantity}
                        </td>
                        <td className="py-2.5 px-3 text-slate-500 font-mono text-start">
                          {ing.unit}
                        </td>
                        <td className="py-2.5 px-3 text-end font-mono font-bold text-slate-900 dark:text-white" dir="ltr">
                          {formatCurrency(ing.cost)}
                        </td>
                        <td className="py-2.5 px-3 text-end font-mono text-cyan-600 dark:text-cyan-400">
                          {costShare}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modifiers & Preparation Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <span className="text-xs font-semibold text-slate-500 block mb-1">
                {t('menu.modifiers')}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedProduct.modifiers.map((m, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 block mb-1">
                {t('menu.chefNotes')}
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-950/40 p-2 rounded-lg border border-slate-200 dark:border-slate-800/60">
                {selectedProduct.notes || 'Standard culinary station standard operating procedure.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
