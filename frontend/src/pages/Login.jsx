import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Shield, ArrowRight, Lock, Mail } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const formData = new URLSearchParams();
            formData.append('username', email);
            formData.append('password', password);

            const response = await axios.post('http://localhost:8000/api/auth/login', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            const token = response.data.access_token;
            const payload = JSON.parse(atob(token.split('.')[1]));

            login({ token, role: payload.role || 'citizen', email: payload.sub });

            if (payload.role === 'authority') {
                navigate('/authority');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] w-full">
            {/* Left Side - Image/Branding */}
            <div className="hidden flex-1 lg:flex relative bg-[#111827] overflow-hidden items-center justify-center">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity scale-105"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=2000&auto=format&fit=crop")' }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d9488]/40 to-transparent"></div>

                <div className="relative z-10 p-12 max-w-lg text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8">
                        <Shield className="w-4 h-4 text-[#34d399]" />
                        <span className="text-sm font-semibold tracking-wider text-[#6ee7b7] uppercase">Secure Access</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tight text-white mb-6 leading-tight">
                        Welcome back to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2dd4bf] to-[#22d3ee]">LocalHelp AI</span>
                    </h1>
                    <p className="text-xl text-[#cbd5e1] mb-8 leading-relaxed font-medium">
                        Log in to continue tracking your reports, monitoring local hazards, and making a difference in your community.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-[#111827] relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d9488]/5 pointer-events-none lg:hidden"></div>

                <div className="mx-auto w-full max-w-sm relative z-10">
                    <div className="text-center lg:text-left mb-10">
                        <h2 className="text-3xl font-black text-white mb-2">Sign in</h2>
                        <p className="text-sm text-[#94a3b8] font-medium">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-bold text-[#0d9488] hover:text-[#0f766e] transition-colors">
                                Register as a Citizen
                            </Link>
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-4 mb-6 flex items-start gap-3">
                            <Lock className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-red-300 font-medium leading-relaxed">{error}</p>
                        </div>
                    )}

                    <div className="mt-8">
                        <div className="bg-[#1e293b] py-8 px-6 shadow-xl border border-[#334155] rounded-2xl sm:px-10">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-[#cbd5e1] mb-2">
                                        Email address
                                    </label>
                                    <div className="relative rounded-xl shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-[#94a3b8]" />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full pl-11 pr-4 py-3.5 bg-[#0f172a] border border-[#334155] rounded-xl focus:ring-2 focus:ring-[#0d9488] focus:border-transparent sm:text-sm text-white transition-all outline-none"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-bold text-[#cbd5e1] mb-2">
                                        Password
                                    </label>
                                    <div className="relative rounded-xl shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-[#94a3b8]" />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full pl-11 pr-4 py-3.5 bg-[#0f172a] border border-[#334155] rounded-xl focus:ring-2 focus:ring-[#0d9488] focus:border-transparent sm:text-sm text-white transition-all outline-none"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <div className="text-sm"></div>
                                    <div className="text-sm">
                                        <Link to="/register-authority" className="font-bold text-[#94a3b8] hover:text-[#0d9488] transition-colors">
                                            Authority Sign In?
                                        </Link>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#0d9488] hover:bg-[#0f766e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0d9488] disabled:opacity-50 hover:shadow-lg hover:shadow-[#0d9488]/30 transition-all active:scale-[0.98]"
                                    >
                                        {loading ? 'Signing in...' : 'Sign in to dashboard'}
                                        {!loading && <ArrowRight className="w-4 h-4" />}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
