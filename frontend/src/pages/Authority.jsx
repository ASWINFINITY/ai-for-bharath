import { useState, useEffect } from 'react';
import { getDashboardMetrics, getInsights } from '../api';

export default function Authority() {
    const [metrics, setMetrics] = useState(null);
    const [insightsData, setInsightsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [metricsRes, insightsRes] = await Promise.all([
                    getDashboardMetrics(),
                    getInsights()
                ]);
                setMetrics(metricsRes);
                setInsightsData(insightsRes);
            } catch (err) {
                console.error("Failed to fetch dashboard data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="p-8 flex justify-center w-full">Loading Dashboard Data...</div>;

    const { metrics: dashMetrics, top_zones, distribution } = metrics || {};
    const { insights, recommendations } = insightsData || {};

    return (
        <div className="flex-1 bg-background-light p-6 dark:bg-background-dark w-full">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">City Authority Dashboard</h1>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">Real-time civic intelligence and response tracking</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:focus-visible:outline-offset-2 hover:bg-primary-light">
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            New Alert
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="rounded-xl border border-[#dce3e5] bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-[#1a2629]">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Active Reports</p>
                            <span className="flex size-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                <span className="material-symbols-outlined text-[20px]">assignment_late</span>
                            </span>
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{dashMetrics?.total_active || 0}</h3>
                        </div>
                    </div>
                    <div className="rounded-xl border border-[#dce3e5] bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-[#1a2629]">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Reports Today</p>
                            <span className="flex size-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                                <span className="material-symbols-outlined text-[20px]">trending_up</span>
                            </span>
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{dashMetrics?.reports_today || 0}</h3>
                        </div>
                    </div>
                    <div className="rounded-xl border border-[#dce3e5] bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-[#1a2629]">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Critical Zones</p>
                            <span className="flex size-8 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                <span className="material-symbols-outlined text-[20px]">warning</span>
                            </span>
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{dashMetrics?.high_risk_zones || 0}</h3>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* Table */}
                        <div className="rounded-xl border border-[#dce3e5] bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-[#1a2629]">
                            <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Top Critical Zones</h3>
                            <div className="overflow-hidden rounded-lg border border-[#dce3e5] dark:border-slate-700 overflow-x-auto">
                                <table className="min-w-full divide-y divide-[#dce3e5] dark:divide-slate-700">
                                    <thead className="bg-background-light dark:bg-slate-800">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Zone Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Issue Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Severity</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#dce3e5] bg-white dark:divide-slate-700 dark:bg-[#1a2629]">
                                        {top_zones?.map((zone) => (
                                            <tr key={zone.id}>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{zone.name}</td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{zone.category}</td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                                                            <div className={`h-full ${zone.risk_score > 75 ? 'bg-red-500' : 'bg-orange-500'}`} style={{ width: `${zone.risk_score}%` }}></div>
                                                        </div>
                                                        <span className="ml-2 text-xs font-medium text-slate-500">{Math.round(zone.risk_score)}</span>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${zone.status === 'Open' ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'}`}>
                                                        {zone.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="flex flex-col gap-6">
                        <div className="rounded-xl border border-[#dce3e5] bg-gradient-to-br from-primary to-[#093642] p-6 text-white shadow-md">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-yellow-300">lightbulb</span>
                                <h3 className="text-lg font-bold">Signal Fusion Insights</h3>
                            </div>
                            <div className="space-y-4">
                                {insights?.length > 0 ? insights.map((insight, idx) => (
                                    <div key={idx} className="rounded-lg bg-white/10 p-4 backdrop-blur-sm border border-white/10">
                                        <p className="text-sm font-medium mb-1">Overlapping Signals Detected</p>
                                        <p className="text-xs text-slate-200 mb-3">{insight.message}</p>
                                    </div>
                                )) : (
                                    <div className="text-sm opacity-80">No fusion insights detected at this time.</div>
                                )}

                                {recommendations?.map((rec, idx) => (
                                    <div key={`rec-${idx}`} className="rounded-lg bg-white/10 p-4 backdrop-blur-sm border border-white/10">
                                        <p className="text-xs text-slate-200">{rec}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chart Preview (Simple) */}
                        <div className="rounded-xl border border-[#dce3e5] bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-[#1a2629]">
                            <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Issue Distribution</h3>
                            <div className="flex flex-col gap-3">
                                {Object.entries(distribution || {}).map(([cat, count]) => (
                                    <div key={cat} className="flex justify-between items-center w-full">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">{cat}</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
