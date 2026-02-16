import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (data.status === 'success') {
                localStorage.setItem('raw_token', data.token);
                navigate('/admin');
            } else {
                setError(data.message || 'Invalid credentials. Access denied.');
            }
        } catch {
            setError('Connection failed. Is the server running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <main className="bg-[#f4f6fb] min-h-screen flex items-center justify-center px-4 sm:px-6">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <p className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-blue-600 uppercase mb-4">
                            ● Admin :: Access ●
                        </p>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 uppercase leading-tight tracking-tight">
                            Secure <span className="text-blue-600 italic">Login.</span>
                        </h1>
                        <p className="mt-3 text-gray-500 text-sm font-arimo">
                            Authorized personnel only. All access is logged and monitored.
                        </p>
                    </div>

                    {/* Login card */}
                    <div className="bg-white border border-gray-200 rounded-xl p-8 sm:p-10 shadow-sm">
                        {/* Status bar */}
                        <div className="flex items-center justify-between mb-8">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase">
                                    Auth Service Active
                                </span>
                            </span>
                            <span className="font-mono text-[10px] tracking-wider text-gray-300 uppercase">
                                v2.4
                            </span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block font-mono text-[10px] tracking-[0.15em] text-gray-500 uppercase mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@raw.dev"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#f4f6fb] text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition font-arimo"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block font-mono text-[10px] tracking-[0.15em] text-gray-500 uppercase mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••••"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#f4f6fb] text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition font-arimo pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] tracking-wider text-gray-400 uppercase hover:text-gray-600 transition cursor-pointer"
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="font-mono text-xs text-red-600">{error}</p>
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 bg-[#3b5bdb] hover:bg-[#364fc7] disabled:bg-gray-300 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer font-arimo flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Authenticating...
                                    </>
                                ) : (
                                    'Access Dashboard'
                                )}
                            </button>
                        </form>

                        {/* Footer info */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase">
                                    AES-256 Encrypted
                                </span>
                                <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase">
                                    JWT Auth
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom text */}
                    <p className="mt-6 text-center font-mono text-[10px] tracking-[0.2em] text-gray-400 uppercase">
                        Protected by RAW
                    </p>
                </div>
            </main>
        </>
    );
}
