import { Link } from 'react-router-dom';
import { ShieldAlert, Map as MapIcon, AlertTriangle, CheckCircle2, TrendingUp, Activity, ArrowRight, Shield, Zap, Stethoscope, Droplet, ArrowUpRight } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] w-full">
            {/* Hero Section */}
            <div className="relative w-full overflow-hidden bg-slate-900 border-b border-white/10">
                {/* Background Video / Image container for that premium feel */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity scale-105"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1496284427489-f59461d15600?q=80&w=2670&auto=format&fit=crop")' }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/30"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent"></div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-40 lg:pt-48 lg:pb-56">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-semibold tracking-wider text-emerald-300 uppercase">Live Map Active</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-8 leading-[1.1]">
                            AI-Powered Civic <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Intelligence</span> for a Safer Bharat
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-medium">
                            Report local issues instantly. Visualize risk zones in real-time. Join thousands of citizens making their neighborhoods better today using our AI-driven insights platform.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                            <Link to="/report" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-teal-700 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3">
                                <ShieldAlert className="w-5 h-5" />
                                Report an Issue
                            </Link>
                            <Link to="/map" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3">
                                <MapIcon className="w-5 h-5" />
                                View Live Map
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 -mt-24 relative z-10 w-full">
                {/* Stats Section with Glassmorphism */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 shadow-xl border border-white/50 dark:border-white/10 hover:-translate-y-1 transition-transform group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Activity className="w-24 h-24 text-primary" />
                        </div>
                        <dt>
                            <div className="inline-flex rounded-xl bg-primary/10 p-3 mb-6">
                                <Activity className="w-6 h-6 text-primary" />
                            </div>
                            <p className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase">Active Issues</p>
                        </dt>
                        <dd className="flex items-baseline mt-2">
                            <p className="text-4xl font-black text-slate-900 dark:text-white">1,245</p>
                        </dd>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 shadow-xl border border-white/50 dark:border-white/10 hover:-translate-y-1 transition-transform group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <AlertTriangle className="w-24 h-24 text-red-500" />
                        </div>
                        <dt>
                            <div className="inline-flex rounded-xl bg-red-50 dark:bg-red-500/10 p-3 mb-6">
                                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                            </div>
                            <p className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase">High-Risk Zones</p>
                        </dt>
                        <dd className="flex items-baseline mt-2">
                            <p className="text-4xl font-black text-slate-900 dark:text-white">18</p>
                        </dd>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 shadow-xl border border-white/50 dark:border-white/10 hover:-translate-y-1 transition-transform group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <TrendingUp className="w-24 h-24 text-emerald-500" />
                        </div>
                        <dt>
                            <div className="inline-flex rounded-xl bg-emerald-50 dark:bg-emerald-500/10 p-3 mb-6">
                                <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <p className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase">Resolved Today</p>
                        </dt>
                        <dd className="flex items-baseline mt-2">
                            <p className="text-4xl font-black text-slate-900 dark:text-white">342</p>
                        </dd>
                    </div>
                </div>

                {/* Browse Categories */}
                <div className="mt-32">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-4">Select Category</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">Identify and report issues across key civic sectors to help your community thrive and alert local authorities directly.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Health */}
                        <Link to="/report?category=Health" className="group relative flex flex-col rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-primary/30 transition-all cursor-pointer overflow-hidden p-8">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-400/5 rounded-bl-full -z-0 group-hover:bg-blue-500/10 transition-colors"></div>
                            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                <Stethoscope className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Health</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-1">Report sanitation issues, disease outbreaks, and hospital accessibility problems.</p>
                            <span className="text-sm font-bold text-primary flex items-center transition-all group-hover:gap-2">
                                Browse Health <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                            </span>
                        </Link>

                        {/* Utilities */}
                        <Link to="/report?category=Utilities" className="group relative flex flex-col rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-primary/30 transition-all cursor-pointer overflow-hidden p-8">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 dark:bg-amber-400/5 rounded-bl-full -z-0 group-hover:bg-amber-500/10 transition-colors"></div>
                            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-sm">
                                <Zap className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Utilities</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-1">Track power outages, water supply disruptions, and street lighting failures.</p>
                            <span className="text-sm font-bold text-primary flex items-center transition-all group-hover:gap-2">
                                Browse Utilities <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                            </span>
                        </Link>

                        {/* Environment */}
                        <Link to="/report?category=Environment" className="group relative flex flex-col rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-primary/30 transition-all cursor-pointer overflow-hidden p-8">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-bl-full -z-0 group-hover:bg-emerald-500/10 transition-colors"></div>
                            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                                <Droplet className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Environment</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-1">Monitor pollution levels, waste management gaps, and environmental hazards.</p>
                            <span className="text-sm font-bold text-primary flex items-center transition-all group-hover:gap-2">
                                Browse Env <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                            </span>
                        </Link>

                        {/* Public Safety */}
                        <Link to="/report?category=Public Safety" className="group relative flex flex-col rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-primary/30 transition-all cursor-pointer overflow-hidden p-8">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 dark:bg-indigo-400/5 rounded-bl-full -z-0 group-hover:bg-indigo-500/10 transition-colors"></div>
                            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                                <Shield className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Public Safety</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-1">Alert authorities about crime hotspots, traffic hazards, and emergency risks.</p>
                            <span className="text-sm font-bold text-primary flex items-center transition-all group-hover:gap-2">
                                Browse Safety <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity Feed */}
                <div className="mt-32 mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Recent Reports Near You</h2>
                        <button className="text-primary font-bold text-sm hover:text-teal-700 flex items-center gap-1 group">
                            View All <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Feed Item 1 */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex gap-6 hover:shadow-md transition-shadow group">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 rounded-xl overflow-hidden relative shadow-sm">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    <img alt="Pothole" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=600&auto=format&fit=crop" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">Severe Pothole on MG Road</h3>
                                    <span className="inline-flex items-center rounded-full bg-amber-50 dark:bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">Pending</span>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">Large pothole causing traffic slowdown near the junction. Needs immediate attention.</p>
                                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-500">
                                    <span className="flex items-center gap-1.5"><Activity className="w-4 h-4" /> 2 hours ago</span>
                                    <span className="flex items-center gap-1.5"><MapIcon className="w-4 h-4" /> Indiranagar</span>
                                </div>
                            </div>
                        </div>

                        {/* Feed Item 2 */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex gap-6 hover:shadow-md transition-shadow group">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 rounded-xl overflow-hidden relative shadow-sm">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    <img alt="Garbage" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=600&auto=format&fit=crop" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">Uncollected Waste Sector 4</h3>
                                    <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-500/10 px-2.5 py-0.5 text-xs font-bold text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">In Progress</span>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">Garbage hasn't been collected for 3 days. Smell is becoming unbearable for residents.</p>
                                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-500">
                                    <span className="flex items-center gap-1.5"><Activity className="w-4 h-4" /> 5 hours ago</span>
                                    <span className="flex items-center gap-1.5"><MapIcon className="w-4 h-4" /> Koramangala</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
