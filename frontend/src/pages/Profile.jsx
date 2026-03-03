export default function Profile() {
    return (
        <div className="flex flex-1 justify-center py-8 px-4 sm:px-8 w-full">
            <div className="flex flex-col max-w-[1024px] w-full flex-1 gap-8">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-text-main dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">My Profile</h1>
                    <p className="text-text-sub dark:text-gray-400 text-base font-normal leading-normal">Manage your account settings, preferences, and civic contributions.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
                            <div className="relative">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-32 h-32 ring-4 ring-gray-100 dark:ring-gray-800" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB3tXVxEr7dxnZvGBJbt7rnxNQitjDVx7ko7QBd-zwP9rmj4w7nkZLmCL16v1B7SEPP9KkNZGszYtxsVcRO1_TYm2cviwM5pVYF3MOkgTenm8sy9xnJIWf3VnzsTAQSyWqNGQurYSn-Vurd7a-rS1658qAyzU8XpfcGjWiUrFqFsAaz5ehDXykuqLcwP8tv41x2hqFjoJfuMak431vq42owyfAjWppKBFKzWR5GuCSO7gLEQXv9TM-kbJ3NUjwu_S1IxmhQwJdAk5E")' }}></div>
                                <button className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-2 hover:bg-[#0b3a45] shadow-sm transition-colors" title="Edit Photo">
                                    <span className="material-symbols-outlined text-[18px] block">edit</span>
                                </button>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <h3 className="text-text-main dark:text-white text-xl font-bold leading-tight">Rahul Sharma</h3>
                                <p className="text-text-sub dark:text-gray-400 text-sm mt-1">Indiranagar, Bangalore</p>
                                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                    <span className="material-symbols-outlined text-[14px]">verified</span>
                                    Verified Citizen
                                </div>
                            </div>
                            <div className="w-full border-t border-gray-100 dark:border-gray-800 pt-4 mt-2 grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <p className="text-2xl font-bold text-text-main dark:text-white">12</p>
                                    <p className="text-xs text-text-sub dark:text-gray-400 uppercase tracking-wide font-medium">Reports</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-text-main dark:text-white">85%</p>
                                    <p className="text-xs text-text-sub dark:text-gray-400 uppercase tracking-wide font-medium">Impact Score</p>
                                </div>
                            </div>
                        </div>

                        {/* Settings */}
                        <div className="flex flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark overflow-hidden shadow-sm">
                            <a href="#" className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-text-sub dark:text-gray-400 group-hover:text-primary">person</span>
                                    <span className="text-text-main dark:text-white font-medium">Personal Information</span>
                                </div>
                                <span className="material-symbols-outlined text-gray-300 dark:text-gray-600">chevron_right</span>
                            </a>
                            <a href="#" className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-text-sub dark:text-gray-400 group-hover:text-primary">lock</span>
                                    <span className="text-text-main dark:text-white font-medium">Login &amp; Security</span>
                                </div>
                                <span className="material-symbols-outlined text-gray-300 dark:text-gray-600">chevron_right</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Stats */}
                        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
                            <h2 className="text-text-main dark:text-white text-lg font-bold mb-5 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">insights</span>
                                Impact Overview
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex flex-col gap-2">
                                    <span className="text-text-sub dark:text-gray-400 text-sm font-medium">Issues Reported</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold text-primary">24</span>
                                        <span className="text-xs text-green-600 font-medium">+2 this week</span>
                                    </div>
                                </div>
                                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex flex-col gap-2">
                                    <span className="text-text-sub dark:text-gray-400 text-sm font-medium">Resolved</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold text-primary">18</span>
                                        <span className="text-xs text-text-sub font-medium">75% rate</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark shadow-sm flex flex-col">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4">
                                <h2 className="text-text-main dark:text-white text-lg font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">history</span>
                                    Recent Activity
                                </h2>
                            </div>
                            <div className="flex flex-col">
                                <div className="p-6 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex flex-col sm:flex-row gap-4">
                                    <div className="h-20 w-24 sm:w-20 rounded-lg bg-gray-200 bg-cover bg-center shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB7uCkSzWVOG7mv8nI-jRj-MF_aZbkRaG7SnTDm-eusUXD5DtEoVUvVLtbKAPdwjwdOQSfUKVfwsR8cc8pXzv4NND8zjAfWh73KULBRPdeWKukyzMvzSZ0kQMvnOoxcLoHqFotwi14lwO5U_54dUdZpDZ_569Tk6HdVdRi1sMKpTST9v6ufyNCnDxf3tR4FeVvL1MiPM9fsu9PJZ3beWUcnspLnbl4YaN1cShJSNCOKGGbY9ofEEk7cARu_Eo0kNIgUUZOOnUGed7Q")' }}></div>
                                    <div className="flex flex-col flex-1 gap-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-bold text-text-main dark:text-white text-base">Damaged Road Surface</h4>
                                            <span className="inline-flex items-center rounded-full bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 text-xs font-medium text-yellow-800 dark:text-yellow-400 ring-1 ring-inset ring-yellow-600/20">In Progress</span>
                                        </div>
                                        <p className="text-sm text-text-sub dark:text-gray-400 line-clamp-1">Reported deep potholes near the main junction causing traffic slowdown.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
