import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import NotificationDropdown from './NotificationDropdown';
import { useAuth } from '../context/AuthContext';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#e5e9eb] bg-surface-light/95 backdrop-blur supports-[backdrop-filter]:bg-surface-light/60 dark:bg-surface-dark/95 dark:border-gray-800">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-3 text-primary dark:text-white">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 text-primary">
                            <span className="material-symbols-outlined text-[20px]">shield</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-text-main dark:text-white">LocalHelp AI</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/" className={`text-sm font-medium transition-colors hover:text-primary dark:hover:text-white ${location.pathname === '/' ? 'text-primary dark:text-white font-bold border-b-2 border-primary' : 'text-text-main dark:text-gray-300'}`}>
                            Home
                        </Link>
                        <Link to="/map" className={`text-sm font-medium transition-colors hover:text-primary dark:hover:text-white ${location.pathname === '/map' ? 'text-primary dark:text-white font-bold border-b-2 border-primary' : 'text-text-main dark:text-gray-300'}`}>
                            Live Map
                        </Link>
                        {user?.role === 'authority' && (
                            <Link to="/authority" className={`text-sm font-medium transition-colors hover:text-primary dark:hover:text-white ${location.pathname === '/authority' ? 'text-primary dark:text-white font-bold border-b-2 border-primary' : 'text-text-main dark:text-gray-300'}`}>
                                Authority
                            </Link>
                        )}
                        {isAuthenticated && (
                            <Link to="/profile" className={`text-sm font-medium transition-colors hover:text-primary dark:hover:text-white ${location.pathname === '/profile' ? 'text-primary dark:text-white font-bold border-b-2 border-primary' : 'text-text-main dark:text-gray-300'}`}>
                                Profile
                            </Link>
                        )}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/report" className="hidden sm:flex h-9 items-center justify-center gap-1 rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition-colors hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">add_alert</span>
                        Report Issue
                    </Link>

                    <ThemeToggle />

                    {isAuthenticated && (
                        <>
                            <NotificationDropdown />
                            <div className="hidden sm:block bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 ring-2 ring-white dark:ring-slate-700 shadow-sm cursor-pointer"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCykd24-SX3T_epnXgZ7P8ogoLIcRwdPHY9xScwpOERDXNL2oaYXJRnjuLPAJSsb4GFKJMOP83LVH04YwHfe2RaXzRcIJpDNflt2fT0BiKU0V-CBOcvnHuG-f5h7u8Ax4LRa2KRzdvCletB4VD0p3NXQMuMVhSarkqBHT3KlCKNs6raKczPPgdwgefPQ_mL3k1hq8OdlnA3DA3-XhDOibD5KeMiRkKBCoBvXZHJK7Wc2Xi6bumX_zKctxYAc9LzokL5eWAqBcu3LNo")' }}>
                            </div>
                            <button onClick={handleLogout} className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                                Logout
                            </button>
                        </>
                    )}

                    {!isAuthenticated && (
                        <Link to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                            Log In
                        </Link>
                    )}

                    {/* Mobile Menu Button Display */}
                    <button className="md:hidden p-2 text-text-main dark:text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
