import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getClusters } from '../api';
import { LocateFixed, Loader2 } from 'lucide-react';
import NotificationDropdown from '../components/NotificationDropdown';

// Helper component to recenter map if needed
function MapUpdater({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, 13);
        }
    }, [center, map]);
    return null;
}

export default function Map() {
    const [clusters, setClusters] = useState([]);
    const [activeCluster, setActiveCluster] = useState(null);
    const [mapCenter, setMapCenter] = useState([18.5204, 73.8567]); // Default Pune
    const [isLocating, setIsLocating] = useState(false);

    const handleGetLocation = () => {
        setIsLocating(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setMapCenter([pos.coords.latitude, pos.coords.longitude]);
                    setIsLocating(false);
                },
                (err) => {
                    console.error("Error getting location: ", err);
                    alert("Could not get your location.");
                    setIsLocating(false);
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        } else {
            alert("Geolocation is not supported by your browser");
            setIsLocating(false);
        }
    };

    useEffect(() => {
        const fetchClusters = async () => {
            try {
                const data = await getClusters();
                setClusters(data);
                if (data.length > 0) {
                    // Center map on highest risk cluster
                    const highestRisk = [...data].sort((a, b) => b.risk_score - a.risk_score)[0];
                    if (highestRisk.center_lat && highestRisk.center_lon) {
                        setMapCenter([highestRisk.center_lat, highestRisk.center_lon]);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch clusters:", error);
            }
        };
        fetchClusters();
    }, []);

    // Helper to get circle color based on category and risk
    const getCategoryRiskColor = (category, score) => {
        const intensity = score >= 80 ? 'high' : score >= 50 ? 'med' : 'low';

        switch (category) {
            case 'Health':
                // Red hues
                return intensity === 'high' ? '#991b1b' : intensity === 'med' ? '#ef4444' : '#fca5a5';
            case 'Utilities':
                // Blue hues
                return intensity === 'high' ? '#1e40af' : intensity === 'med' ? '#3b82f6' : '#93c5fd';
            case 'Environment':
                // Green hues
                return intensity === 'high' ? '#166534' : intensity === 'med' ? '#22c55e' : '#86efac';
            case 'Public Safety':
                // Purple hues
                return intensity === 'high' ? '#6b21a8' : intensity === 'med' ? '#a855f7' : '#d8b4fe';
            default:
                // Fallback (Gray)
                return intensity === 'high' ? '#374151' : intensity === 'med' ? '#6b7280' : '#d1d5db';
        }
    };

    // Helper for active cluster tailwind classes
    const getCategoryStyles = (category, score) => {
        const intensity = score >= 80 ? 'high' : score >= 50 ? 'med' : 'low';

        if (category === 'Health') {
            return {
                bg: intensity === 'high' ? 'bg-red-100 dark:bg-red-900/40' : intensity === 'med' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-red-50/50 dark:bg-red-900/10',
                border: intensity === 'high' ? 'border-red-200 dark:border-red-800' : intensity === 'med' ? 'border-red-100 dark:border-red-900/30' : 'border-red-50 dark:border-red-900/20',
                text: intensity === 'high' ? 'text-red-800 dark:text-red-300' : intensity === 'med' ? 'text-red-600 dark:text-red-400' : 'text-red-500 dark:text-red-500',
                dotGlow: intensity === 'high' ? 'bg-red-400' : intensity === 'med' ? 'bg-red-400/70' : 'bg-red-300',
                dotSolid: intensity === 'high' ? 'bg-red-600' : intensity === 'med' ? 'bg-red-500' : 'bg-red-400'
            };
        } else if (category === 'Utilities') {
            return {
                bg: intensity === 'high' ? 'bg-blue-100 dark:bg-blue-900/40' : intensity === 'med' ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-blue-50/50 dark:bg-blue-900/10',
                border: intensity === 'high' ? 'border-blue-200 dark:border-blue-800' : intensity === 'med' ? 'border-blue-100 dark:border-blue-900/30' : 'border-blue-50 dark:border-blue-900/20',
                text: intensity === 'high' ? 'text-blue-800 dark:text-blue-300' : intensity === 'med' ? 'text-blue-600 dark:text-blue-400' : 'text-blue-500 dark:text-blue-500',
                dotGlow: intensity === 'high' ? 'bg-blue-400' : intensity === 'med' ? 'bg-blue-400/70' : 'bg-blue-300',
                dotSolid: intensity === 'high' ? 'bg-blue-600' : intensity === 'med' ? 'bg-blue-500' : 'bg-blue-400'
            };
        } else if (category === 'Environment') {
            return {
                bg: intensity === 'high' ? 'bg-green-100 dark:bg-green-900/40' : intensity === 'med' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-green-50/50 dark:bg-green-900/10',
                border: intensity === 'high' ? 'border-green-200 dark:border-green-800' : intensity === 'med' ? 'border-green-100 dark:border-green-900/30' : 'border-green-50 dark:border-green-900/20',
                text: intensity === 'high' ? 'text-green-800 dark:text-green-300' : intensity === 'med' ? 'text-green-600 dark:text-green-400' : 'text-green-500 dark:text-green-500',
                dotGlow: intensity === 'high' ? 'bg-green-400' : intensity === 'med' ? 'bg-green-400/70' : 'bg-green-300',
                dotSolid: intensity === 'high' ? 'bg-green-600' : intensity === 'med' ? 'bg-green-500' : 'bg-green-400'
            };
        } else if (category === 'Public Safety') {
            return {
                bg: intensity === 'high' ? 'bg-purple-100 dark:bg-purple-900/40' : intensity === 'med' ? 'bg-purple-50 dark:bg-purple-900/20' : 'bg-purple-50/50 dark:bg-purple-900/10',
                border: intensity === 'high' ? 'border-purple-200 dark:border-purple-800' : intensity === 'med' ? 'border-purple-100 dark:border-purple-900/30' : 'border-purple-50 dark:border-purple-900/20',
                text: intensity === 'high' ? 'text-purple-800 dark:text-purple-300' : intensity === 'med' ? 'text-purple-600 dark:text-purple-400' : 'text-purple-500 dark:text-purple-500',
                dotGlow: intensity === 'high' ? 'bg-purple-400' : intensity === 'med' ? 'bg-purple-400/70' : 'bg-purple-300',
                dotSolid: intensity === 'high' ? 'bg-purple-600' : intensity === 'med' ? 'bg-purple-500' : 'bg-purple-400'
            };
        } else {
            // Fallback
            return {
                bg: intensity === 'high' ? 'bg-gray-100 dark:bg-gray-900/40' : intensity === 'med' ? 'bg-gray-50 dark:bg-gray-900/20' : 'bg-gray-50/50 dark:bg-gray-900/10',
                border: intensity === 'high' ? 'border-gray-200 dark:border-gray-800' : intensity === 'med' ? 'border-gray-100 dark:border-gray-900/30' : 'border-gray-50 dark:border-gray-900/20',
                text: intensity === 'high' ? 'text-gray-800 dark:text-gray-300' : intensity === 'med' ? 'text-gray-600 dark:text-gray-400' : 'text-gray-500 dark:text-gray-500',
                dotGlow: intensity === 'high' ? 'bg-gray-400' : intensity === 'med' ? 'bg-gray-400/70' : 'bg-gray-300',
                dotSolid: intensity === 'high' ? 'bg-gray-600' : intensity === 'med' ? 'bg-gray-500' : 'bg-gray-400'
            };
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-slate-100 antialiased overflow-hidden h-screen w-full flex flex-col">
            {/* Top Navigation for Map (Custom for full screen map feel) */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark px-6 py-3 shrink-0 z-20 shadow-sm relative">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-3 text-primary dark:text-white">
                        <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined text-2xl">shield</span>
                        </div>
                        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">LocalHelp AI</h2>
                    </Link>
                    <label className="hidden md:flex flex-col min-w-40 !h-10 w-96">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-100 dark:bg-slate-800 group focus-within:ring-2 ring-primary/20">
                            <div className="text-slate-400 dark:text-slate-500 flex border-none items-center justify-center pl-4 rounded-l-lg border-r-0">
                                <span className="material-symbols-outlined text-xl">search</span>
                            </div>
                            <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-transparent focus:border-none h-full placeholder:text-slate-400 dark:placeholder:text-slate-500 px-3 rounded-l-none border-l-0 text-sm font-normal leading-normal" placeholder="Search location, sector, or cluster..." />
                        </div>
                    </label>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden lg:flex items-center gap-6">
                        <Link to="/authority" className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white text-sm font-medium leading-normal transition-colors">Dashboard</Link>
                        <Link to="/map" className="text-primary dark:text-white text-sm font-bold leading-normal border-b-2 border-primary">Live Map</Link>
                        <Link to="/profile" className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white text-sm font-medium leading-normal transition-colors">Profile</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/report" className="hidden sm:flex h-9 px-4 items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-sm transition-colors">
                            <span className="material-symbols-outlined text-[18px]">add_alert</span>
                            <span>Report Issue</span>
                        </Link>
                        <NotificationDropdown />
                    </div>
                </div>
            </header>

            {/* Main Map Area */}
            <main className="flex-1 relative flex flex-col overflow-hidden z-10">
                <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                    {/* Dark/Light mode tile layer depending on app theme */}
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                    <MapUpdater center={mapCenter} />

                    {/* Render Clusters */}
                    {clusters.map((cluster) => (
                        <Circle
                            key={cluster.id}
                            center={[cluster.center_lat, cluster.center_lon]}
                            pathOptions={{
                                color: getCategoryRiskColor(cluster.category, cluster.risk_score),
                                fillColor: getCategoryRiskColor(cluster.category, cluster.risk_score),
                                fillOpacity: 0.4,
                                weight: 2
                            }}
                            radius={500} // ~500m radius
                            eventHandlers={{
                                click: () => setActiveCluster(cluster),
                            }}
                        >
                            <Popup>
                                <div className="font-sans">
                                    <h4 className="font-bold text-sm mb-1">{cluster.category} Cluster</h4>
                                    <p className="text-xs mb-1">Risk Score: <span className="font-semibold">{cluster.risk_score.toFixed(1)}/100</span></p>
                                    <p className="text-xs text-gray-600">Reports inside: {cluster.report_count}</p>
                                </div>
                            </Popup>
                        </Circle>
                    ))}
                </MapContainer>

                {/* Filters UI Overlay */}
                <div className="absolute top-4 left-0 right-0 z-[1000] px-4 flex justify-between pointer-events-none max-w-7xl mx-auto">
                    {/* Left overlay buttons */}
                    <div className="bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md shadow-lg rounded-full px-2 py-2 flex items-center gap-2 pointer-events-auto border border-white/20 dark:border-slate-700">
                        <button className="flex h-8 items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 pl-2 transition-colors">
                            <div className="size-6 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-sm text-slate-700 dark:text-slate-300">
                                <span className="material-symbols-outlined text-[16px]">category</span>
                            </div>
                            <span className="text-slate-700 dark:text-slate-200 text-sm font-medium">Category</span>
                        </button>
                        <div className="text-xs text-slate-500 font-medium px-2">Showing {clusters.length} Active Zones</div>
                    </div>

                    {/* GPS Button */}
                    <button
                        className="bg-primary hover:bg-[#0b3d4a] text-white shadow-xl rounded-full px-4 py-2 flex items-center gap-2 pointer-events-auto font-bold text-sm transition-all"
                        onClick={handleGetLocation}
                        disabled={isLocating}
                    >
                        {isLocating ? <Loader2 className="w-5 h-5 animate-spin" /> : <LocateFixed className="w-5 h-5" />}
                        <span className="hidden sm:inline">Use My GPS</span>
                    </button>
                </div>

                {/* Active Cluster Details Card Overlay */}
                {activeCluster && (
                    <div className="absolute bottom-6 left-6 right-6 z-[1000] flex items-end justify-between pointer-events-none">
                        <div className="pointer-events-auto max-w-md w-full ml-auto bg-surface-light dark:bg-surface-dark rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col animate-in slide-in-from-bottom-4 duration-300 relative">
                            <button
                                onClick={() => setActiveCluster(null)}
                                className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 z-10"
                            >
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                            {(() => {
                                const styles = getCategoryStyles(activeCluster.category, activeCluster.risk_score);
                                return (
                                    <div className={`${styles.bg} ${styles.border} px-5 py-3 border-b flex justify-between items-center transition-colors duration-300`}>
                                        <div className={`flex items-center gap-2 ${styles.text}`}>
                                            <span className="relative flex h-3 w-3">
                                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${styles.dotGlow}`}></span>
                                                <span className={`relative inline-flex rounded-full h-3 w-3 ${styles.dotSolid}`}></span>
                                            </span>
                                            <span className="text-xs font-bold uppercase tracking-wider">{activeCluster.risk_score >= 80 ? 'High Risk Zone' : activeCluster.risk_score >= 50 ? 'Elevated Risk' : 'Low Risk Zone'}</span>
                                        </div>
                                    </div>
                                );
                            })()}
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">Zone {activeCluster.id} - {activeCluster.category}</h3>
                                <p className="text-sm text-slate-500 mt-1">Trend: <span className="capitalize">{activeCluster.trend}</span></p>

                                <div className="grid grid-cols-2 gap-3 mb-2 mt-4">
                                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 text-center border border-slate-100 dark:border-slate-700">
                                        <div className="text-primary dark:text-white font-bold text-lg">{activeCluster.report_count}</div>
                                        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Reports inside</div>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 text-center border border-slate-100 dark:border-slate-700">
                                        <div className={`${getCategoryStyles(activeCluster.category, activeCluster.risk_score).text} font-bold text-lg`}>{activeCluster.risk_score.toFixed(0)}</div>
                                        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Risk Score (/100)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Global style override for leaflet popups in dark mode */}
            <style>{`
                .dark .leaflet-popup-content-wrapper, .dark .leaflet-popup-tip {
                    background-color: #1e293b;
                    color: #fff;
                }
                .dark .leaflet-popup-content-wrapper p, .dark .leaflet-popup-content-wrapper h4 {
                    color: #f1f5f9;
                }
                .leaflet-container {
                    z-index: 10;
                }
            `}</style>
        </div>
    );
}
