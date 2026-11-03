/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Building2,
  Users,
  ShieldAlert,
  Activity,
  Plus,
  Search,
  Filter,
  Wrench,
  AlertTriangle,
  Clock,
  Trash2,
  CheckCircle,
  Ban,
  FileSpreadsheet,
  X,
  ExternalLink,
} from 'lucide-react';
import { MOCK_ESTABLISHMENTS, MOCK_MAINTENANCE_SESSIONS } from '../../data/mockData.ts';
import { Establishment, EstablishmentStatus } from '../../types/index.ts';
import { useAuth } from '../../context/AuthContext.tsx';

export const SuperAdminDashboard: React.FC = () => {
  const { startSupportSession, setActiveView } = useAuth();

  const [establishments, setEstablishments] = useState<Establishment[]>(MOCK_ESTABLISHMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Support Session Modal
  const [supportModalEst, setSupportModalEst] = useState<Establishment | null>(null);
  const [supportDuration, setSupportDuration] = useState<number>(30);
  const [supportReason, setSupportReason] = useState<string>(
    'Assisting tenant with recipe cost center allocation & POS tax mapping.'
  );

  // Delete Confirmation Modal
  const [deleteModalEst, setDeleteModalEst] = useState<Establishment | null>(null);
  const [deleteConfirmationInput, setDeleteConfirmationInput] = useState('');

  // Logs Modal
  const [logsModalEst, setLogsModalEst] = useState<Establishment | null>(null);

  // Filter establishments
  const filteredEsts = establishments.filter((est) => {
    const matchesSearch =
      est.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      est.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      est.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      est.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || est.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, newStatus: EstablishmentStatus) => {
    setEstablishments((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
  };

  const handleConfirmDelete = () => {
    if (!deleteModalEst) return;
    if (deleteConfirmationInput === deleteModalEst.code) {
      setEstablishments((prev) => prev.filter((e) => e.id !== deleteModalEst.id));
      setDeleteModalEst(null);
      setDeleteConfirmationInput('');
    }
  };

  const handleLaunchSupport = () => {
    if (!supportModalEst) return;
    startSupportSession(supportModalEst, supportDuration, supportReason);
    setSupportModalEst(null);
  };

  return (
    <div className="space-y-6">
      {/* Platform Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Super Admin Control Center
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Tygos Ecosystem Master
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Global management of multi-tenant hospitality partitions, security isolation, and system health.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('dashboard')}
            className="px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-2"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Sample Tenant</span>
          </button>
        </div>
      </div>

      {/* Global Platform KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Establishments</span>
            <Building2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black mt-2 text-slate-900 dark:text-white font-mono">
            42
          </div>
          <span className="text-[11px] text-emerald-500 font-medium">+3 this month</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Active</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black mt-2 text-emerald-600 dark:text-emerald-400 font-mono">
            38
          </div>
          <span className="text-[11px] text-slate-400">90.5% healthy</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Trial / Suspended</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black mt-2 text-amber-500 font-mono">
            4
          </div>
          <span className="text-[11px] text-slate-400">2 trial · 2 suspended</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Branches</span>
            <Building2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black mt-2 text-slate-900 dark:text-white font-mono">
            98
          </div>
          <span className="text-[11px] text-slate-400">Across 6 countries</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Active Sessions</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black mt-2 text-purple-500 dark:text-purple-400 font-mono">
            312
          </div>
          <span className="text-[11px] text-slate-400">Staff & POS online</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">System Health</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black mt-2 text-emerald-500 font-mono">
            99.98%
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">Optimal</span>
        </div>
      </div>

      {/* Establishments Table Management */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search code, name, owner, country..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="suspended">Suspended</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>

        {/* High Density Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold">
              <tr>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Business Name</th>
                <th className="py-3 px-4">Owner</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-3 text-right">Branches</th>
                <th className="py-3 px-3 text-right">Users</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredEsts.map((est) => (
                <tr
                  key={est.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3 px-4 font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    {est.code}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">
                    {est.name}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    {est.ownerName}
                  </td>
                  <td className="py-3 px-4 capitalize text-slate-500">
                    {est.businessType.replace('_', ' ')}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    {est.country}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700 dark:text-slate-300">
                    {est.branchesCount}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700 dark:text-slate-300">
                    {est.usersCount}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        est.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : est.status === 'trial'
                          ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                          : est.status === 'suspended'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {est.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-[11px]">
                    {est.lastActivity}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* Temporary Support Session Action */}
                      <button
                        onClick={() => setSupportModalEst(est)}
                        title="Enter Temporary Support Session (Audit Monitored)"
                        className="p-1.5 rounded text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 transition-colors"
                      >
                        <Wrench className="w-3.5 h-3.5" />
                      </button>

                      {/* View Logs Action */}
                      <button
                        onClick={() => setLogsModalEst(est)}
                        title="View System Audit Trail"
                        className="p-1.5 rounded text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                      </button>

                      {/* Status Toggle Actions */}
                      {est.status === 'active' ? (
                        <button
                          onClick={() => handleStatusChange(est.id, 'suspended')}
                          title="Suspend Establishment"
                          className="p-1.5 rounded text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
                        >
                          <Ban className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(est.id, 'active')}
                          title="Activate Establishment"
                          className="p-1.5 rounded text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Delete with Strong Confirmation */}
                      <button
                        onClick={() => {
                          setDeleteModalEst(est);
                          setDeleteConfirmationInput('');
                        }}
                        title="Delete Establishment (Requires Code Confirmation)"
                        className="p-1.5 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>Showing {filteredEsts.length} establishments across 6 countries</span>
          <span>Tenant Data Isolation: Strict In-Memory Mock (Phase 1)</span>
        </div>
      </div>

      {/* Temporary Support Session Modal */}
      {supportModalEst && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Temporary Support Session
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Zero-Password Technical Assistance Tunnel
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSupportModalEst(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 my-4 text-xs">
              <div className="p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
                <p className="text-slate-700 dark:text-slate-300">
                  Target Tenant:{' '}
                  <span className="font-bold text-slate-900 dark:text-white">
                    {supportModalEst.name}
                  </span>{' '}
                  (<span className="font-mono text-cyan-400">{supportModalEst.code}</span>)
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  You are generating a time-bounded administrative maintenance session. No tenant credentials are exposed or requested.
                </p>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                  Session Duration
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[15, 30, 60, 120].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setSupportDuration(mins)}
                      className={`py-2 text-center rounded-lg border font-medium transition-colors ${
                        supportDuration === mins
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      {mins} mins
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                  Mandatory Support Reason (Logged to Audit Trail) *
                </label>
                <textarea
                  rows={2}
                  value={supportReason}
                  onChange={(e) => setSupportReason(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-start gap-2 text-[11px] text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  All actions taken during this temporary support session are cryptographically signed and logged for the establishment owner’s audit compliance.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSupportModalEst(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleLaunchSupport}
                className="px-4 py-2 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Launch {supportDuration}m Support Session</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalEst && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-rose-500/30 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 text-rose-500 mb-3">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-sm font-bold">Strong Deletion Confirmation</h3>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
              You are about to irreversibly delete{' '}
              <span className="font-bold text-slate-900 dark:text-white">
                {deleteModalEst.name}
              </span>
              . This will purge all associated POS records, recipe blueprints, and employee logs.
            </p>

            <div className="p-3 bg-rose-500/5 border border-rose-500/20 rounded-lg text-xs mb-4">
              <p className="text-slate-500 dark:text-slate-400 mb-1">
                Type the establishment code to confirm deletion:
              </p>
              <p className="font-mono font-bold text-rose-400 text-sm">
                {deleteModalEst.code}
              </p>
              <input
                type="text"
                placeholder={`Type ${deleteModalEst.code}`}
                value={deleteConfirmationInput}
                onChange={(e) => setDeleteConfirmationInput(e.target.value)}
                className="w-full mt-2 px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setDeleteModalEst(null)}
                className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                disabled={deleteConfirmationInput !== deleteModalEst.code}
                onClick={handleConfirmDelete}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  deleteConfirmationInput === deleteModalEst.code
                    ? 'bg-rose-600 text-white hover:bg-rose-500 cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                }`}
              >
                Confirm Deletion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logs Modal */}
      {logsModalEst && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Audit Trail · {logsModalEst.name} ({logsModalEst.code})
              </h3>
              <button
                onClick={() => setLogsModalEst(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-2 text-xs max-h-60 overflow-y-auto">
              {MOCK_MAINTENANCE_SESSIONS.map((s) => (
                <div
                  key={s.id}
                  className="p-2.5 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200 dark:border-slate-800/80"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-cyan-500">
                      Support Session #{s.id}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {s.startedAt}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mt-1">
                    {s.reason}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Operator: {s.adminUsername} · Status: {s.status}
                  </p>
                </div>
              ))}
              <div className="p-2.5 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200 dark:border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-emerald-500">
                    POS Settlement Batch #ST-441
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Yesterday 23:58
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mt-1">
                  Cash drawer closed and balanced with $0 variance.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setLogsModalEst(null)}
                className="px-4 py-1.5 text-xs font-semibold bg-slate-200 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300"
              >
                Close Logs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
