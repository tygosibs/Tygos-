/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Search,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext.tsx';
import { useI18n } from '../../i18n/I18nContext.tsx';
import { HelpArticle } from '../../domain/types.ts';

export const HelpCenterModal: React.FC = () => {
  const {
    isHelpOpen,
    setIsHelpOpen,
    helpArticles,
    selectedHelpArticle,
    setSelectedHelpArticle,
    setIsAssistantOpen,
  } = useBusiness();
  const { language, dir } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isHelpOpen) return null;

  const isAr = language === 'ar';
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const filteredArticles = helpArticles.filter((art) => {
    const q = searchQuery.toLowerCase();
    const title = (isAr ? art.titleAr : art.titleEn).toLowerCase();
    const summary = (isAr ? art.summaryAr : art.summaryEn).toLowerCase();
    return title.includes(q) || summary.includes(q);
  });

  const activeArticle = selectedHelpArticle || helpArticles[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  {isAr ? 'مركز المعرفة ودليل التشغيل الحي لمنظومة Tygos' : 'Tygos Operational Knowledge & Help Center'}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                  {isAr ? 'عربي متزامن' : 'Live Docs'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isAr
                  ? 'دليل استرشادي تفاعلي ينمو تلقائياً مع المنظومة ويغذي محرك TYGOS بالذكاء والمعايير.'
                  : 'Interactive bilingual SOP documentation sharing a single knowledge layer with TYGOS AI.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsHelpOpen(false);
                setIsAssistantOpen(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'اسأل TYGOS' : 'Ask TYGOS AI'}</span>
            </button>
            <button
              onClick={() => setIsHelpOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Left / Navigation List */}
          <div className="md:col-span-4 border-e border-slate-800 p-4 space-y-3 overflow-y-auto bg-slate-950/40">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute start-3 top-2.5" />
              <input
                type="text"
                placeholder={isAr ? 'بحث في الأدلة والإرشادات...' : 'Search SOP guides...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full ps-9 pe-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              {filteredArticles.map((art) => {
                const isSelected = activeArticle.id === art.id;
                return (
                  <div
                    key={art.id}
                    onClick={() => setSelectedHelpArticle(art)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500/50 text-white'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold block">
                      {isAr ? art.titleAr : art.titleEn}
                    </span>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                      {isAr ? art.summaryAr : art.summaryEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right / Article View */}
          <div className="md:col-span-8 p-5 overflow-y-auto space-y-5 text-xs">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-400 uppercase font-mono">
                  {activeArticle.module} · {activeArticle.category}
                </span>
                <span className="text-[10px] text-slate-500">
                  {isAr ? 'آخر تحديث:' : 'Updated:'} {activeArticle.lastUpdated}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {isAr ? activeArticle.titleAr : activeArticle.titleEn}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isAr ? activeArticle.summaryAr : activeArticle.summaryEn}
              </p>
            </div>

            {/* Main Content */}
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl leading-relaxed whitespace-pre-line text-slate-200">
              {isAr ? activeArticle.contentAr : activeArticle.contentEn}
            </div>

            {/* Step by step */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                {isAr ? 'خطوات التنفيذ التشغيلي المعتمدة (SOP):' : 'Standard Operating Steps:'}
              </h4>
              <div className="space-y-1.5">
                {(isAr ? activeArticle.stepsAr : activeArticle.stepsEn).map((st, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 bg-slate-950/40 rounded-lg border border-slate-800/80"
                  >
                    <span className="w-5 h-5 rounded-full bg-cyan-600/30 text-cyan-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-slate-300">{st}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
              <h4 className="font-bold text-amber-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>{isAr ? 'أخطاء شائعة يجب تجنبها:' : 'Common Mistakes to Avoid:'}</span>
              </h4>
              <ul className="space-y-1 text-slate-300 list-disc list-inside text-[11px]">
                {(isAr ? activeArticle.commonMistakesAr : activeArticle.commonMistakesEn).map(
                  (m, idx) => (
                    <li key={idx}>{m}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
