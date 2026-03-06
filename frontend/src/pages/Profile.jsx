import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FileWarning, AlertCircle, Clock, CheckCircle2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export default function Profile() {
    const { user } = useAuth();
    const token = user?.token || localStorage.getItem('token');
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedId, setExpandedId] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(prev => prev === id ? null : id);
    };

    useEffect(() => {
        const fetchUserComplaints = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                // Fetch profile and complaints concurrently
                const [myRes, compRes] = await Promise.all([
                    axios.get('http://localhost:8000/api/auth/me', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('http://localhost:8000/api/complaints/my', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                setUserProfile(myRes.data);

                // Sort by newest first
                const sortedComplaints = compRes.data.sort((a, b) => b.id - a.id);
                setComplaints(sortedComplaints);
            } catch (err) {
                console.error("Failed to fetch user complaints:", err);
                setError('Failed to load your recent activity.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserComplaints();
    }, [token]);

    const handleDelete = async (complaintId) => {
        if (!confirm('Are you sure you want to delete this report?')) return;
        try {
            await axios.delete(`http://localhost:8000/api/complaints/${complaintId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setComplaints(complaints.filter(c => c.id !== complaintId));
        } catch (err) {
            console.error("Failed to delete complaint:", err);
            alert("Failed to delete report.");
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'resolved': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 ring-emerald-600/20';
            case 'in progress': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 ring-amber-600/20';
            default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 ring-slate-600/20'; // open/pending
        }
    };

    const getStatusConfig = (status) => {
        const s = status?.toLowerCase();
        if (s === 'resolved') {
            return { color: "text-emerald-500", label: "Resolved" };
        }
        if (s === 'in progress') {
            return { color: "text-amber-500", label: "In Progress" };
        }
        return { color: "text-red-500", label: "Open" };
    };

    const resolvedCount = complaints.filter(c => c.status?.toLowerCase() === 'resolved').length;
    const resolutionRate = complaints.length > 0 ? Math.round((resolvedCount / complaints.length) * 100) : 0;

    return (
        <div className="flex flex-1 justify-center py-8 px-4 sm:px-8 w-full bg-slate-50 dark:bg-slate-900 min-h-[calc(100vh-4rem)]">
            <div className="flex flex-col max-w-[1024px] w-full flex-1 gap-8">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">My Profile</h1>
                    <p className="text-slate-600 dark:text-slate-400 text-base font-medium leading-normal">Manage your account settings, preferences, and civic contributions.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-8 shadow-sm">
                            <div className="relative">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-32 h-32 ring-4 ring-slate-100 dark:ring-slate-700 mx-auto bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                                    <span className="text-4xl text-slate-400 font-bold uppercase">
                                        {user?.email ? user.email.charAt(0) : 'U'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center text-center w-full">
                                <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-tight truncate w-full px-2">
                                    {user?.email ? user.email.split('@')[0] : 'Citizen User'}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium truncate w-full px-2">{user?.email || 'user@example.com'}</p>
                                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
                                    <span className="material-symbols-outlined text-[16px]">verified</span>
                                    Verified Citizen
                                </div>
                            </div>
                            <div className="w-full border-t border-slate-100 dark:border-slate-700 pt-6 mt-2 grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <p className="text-3xl font-black text-slate-900 dark:text-white">{complaints.length}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold mt-1">Reports</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-amber-500">{userProfile?.reward_points || 0}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold mt-1 flex items-center justify-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">stars</span>
                                        Points
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Stats Overview */}
                        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-6 shadow-sm">
                            <h2 className="text-slate-900 dark:text-white text-lg font-bold mb-5 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">insights</span>
                                Impact Overview
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 flex flex-col gap-2">
                                    <span className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">Issues Reported</span>
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-4xl font-black text-slate-900 dark:text-white">{complaints.length}</span>
                                        {complaints.length > 0 && <span className="text-xs text-primary font-bold bg-primary/10 px-2 py-1 rounded-md">Total</span>}
                                    </div>
                                </div>
                                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 flex flex-col gap-2">
                                    <span className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">Resolved</span>
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-4xl font-black text-emerald-500">{resolvedCount}</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">{resolutionRate}% rate</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm flex flex-col overflow-hidden">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                                <h2 className="text-slate-900 dark:text-white text-lg font-bold flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary" />
                                    Your Reports
                                </h2>
                            </div>

                            <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-700/50">
                                {loading ? (
                                    <div className="p-8 text-center text-slate-500 dark:text-slate-400 font-medium">Loading your reports...</div>
                                ) : error ? (
                                    <div className="p-8 text-center text-red-500 font-medium bg-red-50 dark:bg-red-900/10">{error}</div>
                                ) : complaints.length === 0 ? (
                                    <div className="p-12 text-center flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                            <FileWarning className="w-8 h-8 text-slate-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Reports Yet</h3>
                                        <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">You haven't submitted any hazard reports. Your contributions help keep the community safe.</p>
                                    </div>
                                ) : (
                                    complaints.map((complaint) => {
                                        const config = getStatusConfig(complaint.status);
                                        const isExpanded = expandedId === complaint.id;
                                        return (
                                            <div key={complaint.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors flex flex-col items-start border-b border-slate-100 dark:border-slate-700/50 last:border-0 relative">
                                                {/* Always visible header */}
                                                <div
                                                    className="w-full p-6 flex items-center justify-between cursor-pointer gap-4 group"
                                                    onClick={() => toggleExpand(complaint.id)}
                                                >
                                                    <h4 className="font-bold text-slate-900 dark:text-white text-lg leading-tight group-hover:text-primary transition-colors flex-1">
                                                        {complaint.title || "Untitled Report"}
                                                    </h4>
                                                    <div className="flex items-center gap-3">
                                                        <span className={`inline-flex items-center shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset ${getStatusColor(complaint.status)}`}>
                                                            {complaint.status || 'Open'}
                                                        </span>
                                                        <button className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors focus:outline-none">
                                                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Expanded Content */}
                                                {isExpanded && (
                                                    <div className="w-full px-6 pb-6 pt-0 flex flex-col sm:flex-row gap-5 items-start animate-in fade-in slide-in-from-top-2 duration-200 cursor-default">
                                                        <div className="w-full sm:w-32 h-24 rounded-xl bg-slate-200 dark:bg-slate-700 shrink-0 overflow-hidden relative">
                                                            {complaint.image_url ? (
                                                                <img src={complaint.image_url.startsWith('http') ? complaint.image_url : `http://localhost:8000${complaint.image_url}`} alt="Report" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                                                                    <FileWarning className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-col flex-1 w-full gap-2">
                                                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed whitespace-pre-line">
                                                                {complaint.description}
                                                            </p>

                                                            <div className="flex items-center gap-4 mt-3">
                                                                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                                                                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                                                                    <span className="truncate max-w-[200px]">{complaint.location || "Location not provided"}</span>
                                                                </div>
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); handleDelete(complaint.id); }}
                                                                    className="ml-auto flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-colors focus:outline-none"
                                                                    title="Delete Report"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
