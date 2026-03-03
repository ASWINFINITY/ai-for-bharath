import { useState, useEffect } from 'react';
import { createComplaint } from '../api';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, AlertCircle, CheckCircle2, LocateFixed, Loader2 } from 'lucide-react';

// Fix marker icon issue in leaflet + vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

function LocationMarker({ position, setPosition }) {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

    return position === null ? null : <Marker position={position} />;
}

function MapUpdater({ position }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.flyTo([position.lat, position.lng], 15);
        }
    }, [position, map]);
    return null;
}

export default function Report() {
    const [status, setStatus] = useState('');
    const [category, setCategory] = useState('Health');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [severity, setSeverity] = useState('low');
    const [position, setPosition] = useState({ lat: 18.5204, lng: 73.8567 }); // Pune default
    const [isLocating, setIsLocating] = useState(false);

    const handleGetLocation = () => {
        setIsLocating(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                    setIsLocating(false);
                },
                (err) => {
                    console.error("Error getting location: ", err);
                    alert("Could not get your location. Please check browser permissions.");
                    setIsLocating(false);
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        } else {
            alert("Geolocation is not supported by your browser");
            setIsLocating(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createComplaint({
                category,
                title,
                description,
                severity,
                lat: position.lat,
                lon: position.lng
            });
            setStatus('matched');
            setTitle('');
            setDescription('');
            setTimeout(() => setStatus(''), 5000);
        } catch (err) {
            console.error(err);
            alert("Failed to submit report. Ensure backend is running.");
        }
    };

    return (
        <div className="flex-1 w-full bg-background-light dark:bg-background-dark min-h-screen">
            {/* Header Area */}
            <div className="bg-primary pb-32 pt-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent mix-blend-multiply"></div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">Report an Issue</h1>
                    <p className="text-white/80 text-lg max-w-2xl font-medium leading-relaxed">
                        Help us identify and fix problems in your neighborhood. Your reports are analyzed by our AI to prioritize critical zones.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-24 pb-20 relative z-20">
                <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">

                    <div className="grid grid-cols-1 lg:grid-cols-12">
                        {/* Left Column: Form */}
                        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 lg:border-r border-gray-100 dark:border-gray-800 flex flex-col justify-between">
                            <form onSubmit={handleSubmit} className="space-y-8 flex-1">

                                {/* Category & Title */}
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
                                        <AlertCircle className="w-6 h-6 text-primary" />
                                        Issue Details
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="sm:col-span-1">
                                            <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">Category</label>
                                            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full pl-4 pr-10 py-3 text-base border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-xl transition-all shadow-sm">
                                                <option>Health</option>
                                                <option>Utilities</option>
                                                <option>Environment</option>
                                                <option>Public Safety</option>
                                            </select>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">Issue Title</label>
                                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full pl-4 pr-4 py-3 text-base border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-xl transition-all placeholder-gray-400 shadow-sm" placeholder="e.g. Deep Pothole on Main Road" required />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">Description</label>
                                        <textarea value={description} onChange={e => setDescription(e.target.value)} rows="5" className="w-full pl-4 pr-4 py-3 text-base border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-xl transition-all placeholder-gray-400 resize-none shadow-sm" placeholder="Provide as much detail as possible to help responders assess the situation..." required></textarea>
                                    </div>
                                </div>

                                {/* Severity */}
                                <div className="pt-2">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-3">Severity Level</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['low', 'med', 'high'].map((level) => (
                                            <label key={level} className={`
                                                relative flex flex-col items-center cursor-pointer rounded-xl border p-4 focus:outline-none justify-center transition-all group
                                                ${severity === level
                                                    ? 'bg-primary/5 border-primary ring-1 ring-primary shadow-sm'
                                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/30 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                }
                                            `}>
                                                <input type="radio" name="severity" value={level} className="sr-only" checked={severity === level} onChange={(e) => setSeverity(e.target.value)} />
                                                <span className={`text-sm font-bold capitalize mt-1 ${severity === level ? 'text-primary dark:text-white' : 'text-slate-500 dark:text-gray-400 group-hover:text-slate-700 dark:group-hover:text-gray-300'}`}>
                                                    {level === 'med' ? 'Medium' : level}
                                                </span>
                                                {/* Severity visual dots */}
                                                <span className={`absolute top-3 right-3 flex w-2.5 h-2.5 rounded-full shadow-sm ${level === 'low' ? 'bg-green-500' : level === 'med' ? 'bg-yellow-500' : 'bg-red-500'
                                                    } ${severity !== level ? 'opacity-30 grayscale' : 'animate-pulse'}`}></span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-8 mt-auto">
                                    <button type="submit" className="w-full inline-flex justify-center items-center py-4 px-8 border border-transparent shadow-md text-lg font-bold rounded-xl text-white bg-primary hover:bg-[#0b3d4a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all active:scale-[0.98]">
                                        <CheckCircle2 className="w-6 h-6 mr-2" />
                                        Submit Report
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right Column: Location & Map */}
                        <div className="lg:col-span-5 bg-gray-50/50 dark:bg-gray-800/20 p-6 sm:p-10 lg:p-12 flex flex-col">
                            <div className="flex justify-between items-center mb-4 border-b border-gray-100 dark:border-gray-800 pb-4">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <MapPin className="w-6 h-6 text-primary" />
                                    Location
                                </h3>
                                <button
                                    type="button"
                                    onClick={handleGetLocation}
                                    disabled={isLocating}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {isLocating ? <Loader2 className="w-4 h-4 animate-spin" /> : <LocateFixed className="w-4 h-4" />}
                                    Use My GPS
                                </button>
                            </div>

                            <p className="text-slate-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                                Click anywhere on the map to accurately pin the location of the issue or use your GPS. A precise location helps authorities respond faster.
                            </p>

                            {/* Map Container */}
                            <div className="flex-1 w-full min-h-[400px] bg-slate-200 dark:bg-slate-700 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-inner relative z-0 group">
                                <MapContainer center={[18.5204, 73.8567]} zoom={13} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <LocationMarker position={position} setPosition={setPosition} />
                                    <MapUpdater position={position} />
                                </MapContainer>
                                <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-black/5 text-xs font-semibold text-slate-700 pointer-events-none opacity-100 transition-opacity">
                                    Interactive Map
                                </div>
                            </div>

                            {/* Coordinates Display */}
                            <div className="mt-6 flex gap-4">
                                <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Latitude</p>
                                    <p className="text-primary dark:text-teal-400 font-mono text-[15px] font-semibold bg-primary/5 dark:bg-primary/10 px-3 py-1 rounded-md">{position.lat.toFixed(6)}</p>
                                </div>
                                <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Longitude</p>
                                    <p className="text-primary dark:text-teal-400 font-mono text-[15px] font-semibold bg-primary/5 dark:bg-primary/10 px-3 py-1 rounded-md">{position.lng.toFixed(6)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Toast Notification */}
            {status === 'matched' && (
                <div className="fixed bottom-8 right-8 bg-slate-900 border border-slate-700 text-white p-4 pr-8 rounded-xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-8 duration-300 z-50">
                    <div className="bg-green-500/20 p-2.5 rounded-full flex-shrink-0">
                        <CheckCircle2 className="w-7 h-7 text-green-400" />
                    </div>
                    <div>
                        <p className="font-bold text-base mb-0.5 text-green-50">Report Submitted Successfully!</p>
                        <p className="text-sm text-slate-300">Saved to database and analyzed by AI.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
