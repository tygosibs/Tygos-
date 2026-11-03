/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Users,
  Award,
  Heart,
  Star,
  Search,
  MessageSquareWarning,
  DollarSign,
  Utensils,
  Phone,
  Mail,
  ChevronRight,
} from 'lucide-react';
import { MOCK_CUSTOMERS } from '../../data/mockData.ts';
import { Customer } from '../../types/index.ts';

export const CrmModule: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(MOCK_CUSTOMERS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = MOCK_CUSTOMERS.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Guest CRM, VIP Profiles & Loyalty
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Guest visit histories, lifetime spend records, loyalty reward tiers, dietary preferences, and satisfaction ratings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-semibold">
            <Star className="w-4 h-4 fill-emerald-400 text-emerald-400" />
            <span>4.9 / 5.0 Average Guest Index</span>
          </div>
        </div>
      </div>

      {/* 2-Column Split: Guest Directory on Left, Detailed Guest Profile & History on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Customer Directory */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search guest by name, VIP code, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredCustomers.map((cust) => {
              const isSelected = selectedCustomer.id === cust.id;
              return (
                <div
                  key={cust.id}
                  onClick={() => setSelectedCustomer(cust)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500 text-slate-900 dark:text-white shadow-xs'
                      : 'bg-slate-50/50 dark:bg-slate-950/20 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {cust.name}
                        </span>
                        <span className="font-mono text-[10px] text-cyan-500">
                          [{cust.code}]
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{cust.phone}</p>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        cust.loyaltyTier === 'Platinum'
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                          : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      }`}
                    >
                      {cust.loyaltyTier}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-[11px] text-slate-400">
                    <span>{cust.totalVisits} Lifetime Visits</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      ${cust.totalSpent.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Guest Profile & Visit History */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedCustomer.name}
                </h3>
                <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {selectedCustomer.loyaltyTier} Member
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Last Dining Visit: <span className="font-semibold text-cyan-400">{selectedCustomer.lastVisit}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-slate-700 dark:text-slate-300">
                ⭐ {selectedCustomer.satisfactionRating} Rating
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-500 block">Total Lifetime Spend</span>
              <span className="text-lg font-black font-mono text-cyan-600 dark:text-cyan-400">
                ${selectedCustomer.totalSpent.toLocaleString()}
              </span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-500 block">Reward Points</span>
              <span className="text-lg font-black font-mono text-amber-500">
                {selectedCustomer.loyaltyPoints} pts
              </span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-500 block">Total Covers / Visits</span>
              <span className="text-lg font-black font-mono text-emerald-500">
                {selectedCustomer.totalVisits}
              </span>
            </div>
          </div>

          {/* Contact & Dietary Preferences */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase text-[10px] tracking-wider text-slate-400">
              Hospitality Concierge Preferences
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              <div>
                <span className="text-slate-500 block">Direct Phone</span>
                <span className="font-mono text-slate-200">{selectedCustomer.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Email Dispatch</span>
                <span className="text-slate-200">{selectedCustomer.email}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Signature Favorite Item</span>
                <span className="font-semibold text-cyan-400">{selectedCustomer.favoriteDish}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Seating Preference</span>
                <span className="text-slate-200">Main Dining Quiet Corner or VIP Lounge</span>
              </div>
            </div>
          </div>

          {/* Recent Visit & Order Log */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Recent Dining History & Check Trace
            </h4>
            <div className="space-y-1.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Dinner Service · Table T01</span>
                  <p className="text-[11px] text-slate-500">Tygos Prime Truffle Ribeye x2, Cyan Mocktail x2</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-cyan-400">$184.50</span>
                  <span className="block text-[10px] text-emerald-400">Earned +185 pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
