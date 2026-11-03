/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Truck,
  FileText,
  CheckCircle,
  Clock,
  Plus,
  DollarSign,
  Search,
  Building,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { MOCK_PURCHASE_ORDERS, MOCK_SUPPLIERS } from '../../data/mockData.ts';
import { PurchaseOrder, Supplier } from '../../types/index.ts';

export const PurchasingModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'suppliers'>('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder>(MOCK_PURCHASE_ORDERS[0]);

  const filteredPOs = MOCK_PURCHASE_ORDERS.filter((po) =>
    po.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    po.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSuppliers = MOCK_SUPPLIERS.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Purchasing & Supplier Procurement
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Requisitions, three-way PO matching, receiving docks, supplier balance ledgers, and payment approvals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex p-1 bg-slate-100 dark:bg-slate-950 rounded-lg">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'orders'
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-white'
              }`}
            >
              Purchase Orders
            </button>
            <button
              onClick={() => setActiveTab('suppliers')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'suppliers'
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-white'
              }`}
            >
              Approved Suppliers
            </button>
          </div>
        </div>
      </div>

      {/* Procurement Lifecycle Steps Diagram */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
          Standard 3-Way Match Requisition Workflow
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs text-center">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-cyan-500 font-bold block">Step 1</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Requisition</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-cyan-500 font-bold block">Step 2</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">PO Approval</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-cyan-500 font-bold block">Step 3</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Supplier Issue</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-cyan-500 font-bold block">Step 4</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Goods Receiving</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-cyan-500 font-bold block">Step 5</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Invoice Match</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-emerald-500 font-bold block">Step 6</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">AP Payment</span>
          </div>
        </div>
      </div>

      {activeTab === 'orders' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Purchase Orders Table */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Purchase Orders Pipeline
              </h3>
              <div className="relative w-48">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter PO..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-1 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 border-b border-slate-200 dark:border-slate-800 font-semibold">
                  <tr>
                    <th className="py-3 px-4">PO Number</th>
                    <th className="py-3 px-4">Supplier</th>
                    <th className="py-3 px-3">Delivery Date</th>
                    <th className="py-3 px-3 text-right">Items</th>
                    <th className="py-3 px-3 text-right">Amount</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {filteredPOs.map((po) => {
                    const isSelected = selectedPO.id === po.id;
                    return (
                      <tr
                        key={po.id}
                        onClick={() => setSelectedPO(po)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-cyan-50 dark:bg-cyan-950/40'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'
                        }`}
                      >
                        <td className="py-3 px-4 font-mono font-bold text-cyan-600 dark:text-cyan-400">
                          {po.orderNumber}
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">
                          {po.supplierName}
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-500">
                          {po.deliveryDate}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-slate-700 dark:text-slate-300">
                          {po.itemsCount} lines
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 dark:text-white">
                          ${po.totalAmount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              po.status === 'paid'
                                ? 'bg-emerald-500/10 text-emerald-500'
                                : po.status === 'approved'
                                ? 'bg-cyan-500/10 text-cyan-500'
                                : po.status === 'received'
                                ? 'bg-blue-500/10 text-blue-500'
                                : 'bg-amber-500/10 text-amber-500'
                            }`}
                          >
                            {po.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected PO Details Card */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {selectedPO.orderNumber}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Issued: {selectedPO.issueDate}
                </p>
              </div>
              <span className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                {selectedPO.status}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Vendor</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {selectedPO.supplierName}
                </span>
                <p className="text-[11px] text-slate-500 mt-1">Payment terms: Net 30 Days · Delivery: {selectedPO.deliveryDate}</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Total Purchase Commitment</span>
                <span className="text-lg font-black font-mono text-cyan-600 dark:text-cyan-400">
                  ${selectedPO.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                3-Way Match Verification State
              </span>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-950 text-slate-300">
                  <span>1. Purchase Order Generated</span>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-950 text-slate-300">
                  <span>2. Warehouse Receiving Slip</span>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-950 text-slate-300">
                  <span>3. Supplier Tax Invoice</span>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Approved Suppliers Table */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Approved Supplier Directory
            </h3>
            <span className="text-xs text-slate-500">{filteredSuppliers.length} active vendors</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 border-b border-slate-200 dark:border-slate-800 font-semibold">
                <tr>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Supplier Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-3">Rating</th>
                  <th className="py-3 px-3">Payment Terms</th>
                  <th className="py-3 px-4 text-right">Balance Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredSuppliers.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-mono font-bold text-cyan-600 dark:text-cyan-400">
                      {s.code}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">
                      {s.name}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {s.category}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {s.contactPerson} ({s.phone})
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-amber-500">
                      ★ {s.rating}
                    </td>
                    <td className="py-3 px-3 text-slate-500">
                      {s.paymentTerms}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 dark:text-slate-100">
                      ${s.balanceDue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
