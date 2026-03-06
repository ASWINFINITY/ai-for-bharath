import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Shield, ArrowRight, Lock, Mail, Users, Key } from 'lucide-react';

const RegisterAuthority = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // In a real app we might ask for department, employee ID, invite code, etc.
    const [inviteCode, setInviteCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Very basic simulation of an invite code for authorities
            if (inviteCode !== 'AUTH2024') {
                setError('Invalid Authority Invite Code.');
                setLoading(false);
                return;
            }

            await axios.post('http://localhost:8000/api/auth/register/authority', {
                name,
                email,
                password,
                role: "authority" // Even if they send it, backend forces it, but we send it for schema
            });

            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.detail || 'Registration failed. Please try again.');
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
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2000&auto=format&fit=crop")' }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4f46e5]/40 to-transparent"></div>

                <div className="relative z-10 p-12 max-w-lg text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8">
                        <Shield className="w-4 h-4 text-[#818cf8]" />
                        <span className="text-sm font-semibold tracking-wider text-[#a5b4fc] uppercase">Official Access</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tight text-white mb-6 leading-tight">
                        Command Center <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818cf8] to-[#c084fc]">Registration</span>
                    </h1>
                    <p className="text-xl text-[#cbd5e1] mb-8 leading-relaxed font-medium">
                        Secure access for civic officials to monitor reports, dispatch resources, and update the community on hazard resolutions.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-[#111827] relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#4f46e5]/5 pointer-events-none lg:hidden"></div>

                <div className="mx-auto w-full max-w-sm relative z-10">
                    <div className="text-center lg:text-left mb-10">
                        <h2 className="text-3xl font-black text-white mb-2">Authority Registration</h2>
                        <p className="text-sm text-[#94a3b8] font-medium">
                            Already have access?{' '}
                            <Link to="/login" className="font-bold text-[#4f46e5] hover:text-[#6366f1] transition-colors">
                                Sign in here
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
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-[#cbd5e1] mb-1.5">
                                        Full Name / Department
                                    </label>
                                    <div className="relative rounded-xl shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Users className="h-5 w-5 text-[#94a3b8]" />
                                        </div>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="block w-full pl-11 pr-4 py-3 bg-[#0f172a] border border-[#334155] rounded-xl focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent sm:text-sm text-white transition-all outline-none"
                                            placeholder="Department of Public Works"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-[#cbd5e1] mb-1.5">
                                        Official Email
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
                                            className="block w-full pl-11 pr-4 py-3 bg-[#0f172a] border border-[#334155] rounded-xl focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent sm:text-sm text-white transition-all outline-none"
                                            placeholder="official@city.gov"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-bold text-[#cbd5e1] mb-1.5">
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
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full pl-11 pr-4 py-3 bg-[#0f172a] border border-[#334155] rounded-xl focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent sm:text-sm text-white transition-all outline-none"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="inviteCode" className="block text-sm font-bold text-[#cbd5e1] mb-1.5">
                                        Invite Code <span className="text-[#94a3b8] font-normal text-xs">(Use AUTH2024 for demo)</span>
                                    </label>
                                    <div className="relative rounded-xl shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Key className="h-5 w-5 text-[#94a3b8]" />
                                        </div>
                                        <input
                                            id="inviteCode"
                                            name="inviteCode"
                                            type="text"
                                            required
                                            value={inviteCode}
                                            onChange={(e) => setInviteCode(e.target.value)}
                                            className="block w-full pl-11 pr-4 py-3 bg-[#0f172a] border border-[#334155] rounded-xl focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent sm:text-sm text-white transition-all outline-none"
                                            placeholder="AUTH2024"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#4f46e5] hover:bg-[#4338ca] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4f46e5] disabled:opacity-50 hover:shadow-lg hover:shadow-[#4f46e5]/30 transition-all active:scale-[0.98]"
                                    >
                                        {loading ? 'Registering...' : 'Complete Authority Setup'}
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

export default RegisterAuthority;
