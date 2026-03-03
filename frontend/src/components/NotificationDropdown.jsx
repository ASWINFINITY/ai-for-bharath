import { useState, useRef, useEffect } from 'react';
import { Bell, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

export default function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Mock notifications for MVP
    const notifications = [
        {
            id: 1,
            type: 'alert',
            title: 'High Risk Zone Alert',
            message: 'A new high-risk zone has been identified near your reported location.',
            time: '10 min ago',
            read: false,
            icon: <AlertTriangle className="w-5 h-5 text-red-500" />
        },
        {
            id: 2,
            type: 'success',
            title: 'Report Resolved',
            message: 'Your recent report "Pothole on Main St" has been marked as resolved.',
            time: '2 hours ago',
            read: false,
            icon: <CheckCircle2 className="w-5 h-5 text-green-500" />
        },
        {
            id: 3,
            type: 'info',
            title: 'Community Update',
            message: 'Local authorities have scheduled a cleanup drive in Sector 4.',
            time: '1 day ago',
            read: true,
            icon: <Clock className="w-5 h-5 text-blue-500" />
        }
    ];

    const unreadCount = notifications.filter(n => !n.read).length;

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Notification Bell Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative bg-gray-100 dark:bg-slate-800 p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-white dark:border-slate-800"></span>
                    </span>
                )}
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-[100] animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                        <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                        {unreadCount > 0 && (
                            <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                                {unreadCount} new
                            </span>
                        )}
                    </div>

                    <div className="max-h-[400px] overflow-y-auto w-full">
                        {notifications.length > 0 ? (
                            <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                {notifications.map(notif => (
                                    <div
                                        key={notif.id}
                                        className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex gap-4 ${!notif.read ? 'bg-primary/5 dark:bg-primary/5' : ''}`}
                                    >
                                        <div className="mt-0.5 flex-shrink-0">
                                            {notif.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm font-semibold truncate ${!notif.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                                                {notif.title}
                                            </p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 leading-snug">
                                                {notif.message}
                                            </p>
                                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium">
                                                {notif.time}
                                            </p>
                                        </div>
                                        {!notif.read && (
                                            <div className="flex-shrink-0 flex items-center">
                                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center">
                                <Bell className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                                <p className="text-slate-500 dark:text-slate-400 font-medium">No new notifications</p>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-700 p-2 bg-slate-50/50 dark:bg-slate-800/50">
                        <button className="w-full py-2 text-sm font-bold text-primary hover:text-teal-700 dark:hover:text-teal-400 transition-colors text-center rounded-lg hover:bg-primary/5">
                            Mark all as read
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
