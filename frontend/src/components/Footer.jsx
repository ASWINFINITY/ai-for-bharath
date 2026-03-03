export default function Footer() {
    return (
        <footer className="bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 mt-auto">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-white">
                                <span className="material-symbols-outlined text-[16px]">shield</span>
                            </div>
                            <span className="text-base font-bold text-text-main dark:text-white">LocalHelp AI</span>
                        </div>
                        <p className="text-sm text-text-sub dark:text-gray-400 leading-relaxed">
                            Empowering citizens with AI to build safer, cleaner, and smarter communities across Bharat.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-text-main dark:text-white tracking-wider uppercase mb-4">Platform</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-text-sub dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Live Map</a></li>
                            <li><a href="#" className="text-sm text-text-sub dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Submit Report</a></li>
                            <li><a href="#" className="text-sm text-text-sub dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Risk Analysis</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-text-main dark:text-white tracking-wider uppercase mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-text-sub dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-sm text-text-sub dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Community Guidelines</a></li>
                            <li><a href="#" className="text-sm text-text-sub dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-text-main dark:text-white tracking-wider uppercase mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary dark:hover:text-white">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
                    <p className="text-sm text-text-sub dark:text-gray-500">© 2026 LocalHelp AI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
