import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { API_URL } from '../config/api';

interface EmailEntry {
    _id: string;
    email: string;
    source: string;
    status: 'new' | 'contacted' | 'archived';
    createdAt: string;
}

interface EmailStats {
    total: number;
    new: number;
    contacted: number;
    archived: number;
}

interface VisitorEntry {
    _id: string;
    ip: string;
    device: string;
    browser: string;
    os: string;
    page: string;
    referrer: string;
    country: string;
    city: string;
    region: string;
    createdAt: string;
}

interface VisitorStats {
    total: number;
    unique: number;
    today: number;
}

interface BlockedEntry {
    _id: string;
    ip: string;
    reason: string;
    requestCount: number;
    active: boolean;
    createdAt: string;
}

type Tab = 'emails' | 'visitors' | 'blocked';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('emails');
    const [adminEmail, setAdminEmail] = useState('');
    const token = localStorage.getItem('raw_token');

    // --- Email state ---
    const [emails, setEmails] = useState<EmailEntry[]>([]);
    const [emailStats, setEmailStats] = useState<EmailStats>({ total: 0, new: 0, contacted: 0, archived: 0 });
    const [emailLoading, setEmailLoading] = useState(true);
    const [emailFilter, setEmailFilter] = useState('all');
    const [emailSearch, setEmailSearch] = useState('');
    const [emailPage, setEmailPage] = useState(1);
    const [emailTotalPages, setEmailTotalPages] = useState(1);

    // --- Visitor state ---
    const [visitors, setVisitors] = useState<VisitorEntry[]>([]);
    const [visitorStats, setVisitorStats] = useState<VisitorStats>({ total: 0, unique: 0, today: 0 });
    const [visitorLoading, setVisitorLoading] = useState(true);
    const [visitorSearch, setVisitorSearch] = useState('');
    const [visitorPage, setVisitorPage] = useState(1);
    const [visitorTotalPages, setVisitorTotalPages] = useState(1);
    const [visitorMenuOpen, setVisitorMenuOpen] = useState<string | null>(null);
    const visitorMenuRef = useRef<HTMLDivElement>(null);

    // --- Blocked state ---
    const [blocked, setBlocked] = useState<BlockedEntry[]>([]);
    const [blockedStats, setBlockedStats] = useState({ total: 0, active: 0 });
    const [blockedLoading, setBlockedLoading] = useState(true);

    // Auth verify
    useEffect(() => {
        if (!token) { navigate('/login'); return; }
        fetch(`${API_URL}/auth/verify`, { headers: { Authorization: `Bearer ${token}` } })
            .then((r) => r.json())
            .then((data) => {
                if (data.status !== 'success') { localStorage.removeItem('raw_token'); navigate('/login'); }
                else setAdminEmail(data.admin.email);
            })
            .catch(() => { localStorage.removeItem('raw_token'); navigate('/login'); });
    }, [token, navigate]);

    // Fetch emails
    const fetchEmails = useCallback(async () => {
        if (!token) return;
        setEmailLoading(true);
        try {
            const params = new URLSearchParams({ page: String(emailPage), limit: '15', status: emailFilter, search: emailSearch });
            const res = await fetch(`${API_URL}/emails?${params}`, { headers: { Authorization: `Bearer ${token}` } });
            const data = await res.json();
            if (data.status === 'success') {
                setEmails(data.data);
                setEmailStats(data.stats);
                setEmailTotalPages(data.meta.pages);
            }
        } catch (err) { console.error('Fetch emails:', err); }
        finally { setEmailLoading(false); }
    }, [token, emailPage, emailFilter, emailSearch]);

    // Fetch visitors
    const fetchVisitors = useCallback(async () => {
        if (!token) return;
        setVisitorLoading(true);
        try {
            const params = new URLSearchParams({ page: String(visitorPage), limit: '20', search: visitorSearch });
            const res = await fetch(`${API_URL}/visitors?${params}`, { headers: { Authorization: `Bearer ${token}` } });
            const data = await res.json();
            if (data.status === 'success') {
                setVisitors(data.data);
                setVisitorStats(data.stats);
                setVisitorTotalPages(data.meta.pages);
            }
        } catch (err) { console.error('Fetch visitors:', err); }
        finally { setVisitorLoading(false); }
    }, [token, visitorPage, visitorSearch]);

    // Fetch blocked
    const fetchBlocked = useCallback(async () => {
        if (!token) return;
        setBlockedLoading(true);
        try {
            const res = await fetch(`${API_URL}/visitors/blocked`, { headers: { Authorization: `Bearer ${token}` } });
            const data = await res.json();
            if (data.status === 'success') {
                setBlocked(data.data);
                setBlockedStats(data.stats);
            }
        } catch (err) { console.error('Fetch blocked:', err); }
        finally { setBlockedLoading(false); }
    }, [token]);

    useEffect(() => { if (activeTab === 'emails') fetchEmails(); }, [activeTab, fetchEmails]);
    useEffect(() => { if (activeTab === 'visitors') fetchVisitors(); }, [activeTab, fetchVisitors]);
    useEffect(() => { if (activeTab === 'blocked') fetchBlocked(); }, [activeTab, fetchBlocked]);

    // Close visitor three-dot menu on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (visitorMenuRef.current && !visitorMenuRef.current.contains(e.target as Node)) {
                setVisitorMenuOpen(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Visitor actions
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setVisitorMenuOpen(null);
    };

    const blockVisitorIP = async (ip: string) => {
        if (!confirm(`Block IP ${ip}?`)) return;
        try {
            await fetch(`${API_URL}/visitors/block-ip`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ ip, reason: 'Manually blocked from admin panel' }),
            });
            fetchVisitors();
            fetchBlocked();
        } catch (err) { console.error('Block IP error:', err); }
        setVisitorMenuOpen(null);
    };

    const deleteVisitor = async (id: string) => {
        if (!confirm('Delete this visitor record?')) return;
        try {
            await fetch(`${API_URL}/visitors/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchVisitors();
        } catch (err) { console.error('Delete visitor error:', err); }
        setVisitorMenuOpen(null);
    };

    // Actions
    const updateEmailStatus = async (id: string, status: string) => {
        await fetch(`${API_URL}/emails/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ status }) });
        fetchEmails();
    };

    const deleteEmail = async (id: string) => {
        if (!confirm('Delete this email permanently?')) return;
        await fetch(`${API_URL}/emails/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
        fetchEmails();
    };

    const toggleBlock = async (id: string) => {
        await fetch(`${API_URL}/visitors/blocked/${id}`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } });
        fetchBlocked();
    };

    const deleteBlock = async (id: string) => {
        if (!confirm('Remove this block entry?')) return;
        await fetch(`${API_URL}/visitors/blocked/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
        fetchBlocked();
    };

    const logout = () => { localStorage.removeItem('raw_token'); navigate('/login'); };

    const statusColor: Record<string, string> = {
        new: 'text-green-600 bg-green-50 border-green-200',
        contacted: 'text-blue-600 bg-blue-50 border-blue-200',
        archived: 'text-gray-500 bg-gray-50 border-gray-200',
    };

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    const tabs: { key: Tab; label: string }[] = [
        { key: 'emails', label: 'Emails' },
        { key: 'visitors', label: 'Visitors' },
        { key: 'blocked', label: 'Blocked IPs' },
    ];

    return (
        <main className="bg-[#f4f6fb] min-h-screen">
            {/* Top bar */}
            <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a href="/" className="font-arimo text-xl font-bold text-black">RAW</a>
                        <span className="hidden sm:block h-5 w-px bg-gray-200" />
                        <span className="hidden sm:block font-mono text-[10px] tracking-wider text-gray-400 uppercase">Admin Dashboard</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="hidden sm:flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase">{adminEmail}</span>
                        </span>
                        <button onClick={logout} className="px-4 py-2 text-sm font-arimo text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:border-gray-300 transition cursor-pointer">Logout</button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* Header */}
                <div className="mb-6">
                    <p className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-blue-600 uppercase mb-3">● Control :: Panel ●</p>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 uppercase tracking-tight">
                        Admin <span className="text-blue-600 italic">Panel.</span>
                    </h1>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 border-b border-gray-200 pb-0">
                    {tabs.map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setActiveTab(t.key)}
                            className={`px-4 py-2.5 font-mono text-xs tracking-wider uppercase transition cursor-pointer border-b-2 -mb-px ${
                                activeTab === t.key
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* ============ EMAILS TAB ============ */}
                {activeTab === 'emails' && (
                    <>
                        {/* Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                            {[
                                { value: emailStats.total, label: 'Total', color: 'text-gray-900' },
                                { value: emailStats.new, label: 'New', color: 'text-green-600' },
                                { value: emailStats.contacted, label: 'Contacted', color: 'text-blue-600' },
                                { value: emailStats.archived, label: 'Archived', color: 'text-gray-500' },
                            ].map((s) => (
                                <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-sm transition">
                                    <p className={`text-2xl sm:text-3xl font-bold ${s.color}`}>{s.value}</p>
                                    <p className="font-mono text-[10px] tracking-wider text-gray-400 uppercase mt-1">{s.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Filters */}
                        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <input type="text" placeholder="Search emails..." value={emailSearch}
                                onChange={(e) => { setEmailSearch(e.target.value); setEmailPage(1); }}
                                className="flex-1 w-full sm:w-auto px-4 py-2.5 rounded-lg border border-gray-200 bg-[#f4f6fb] text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition font-arimo"
                            />
                            <div className="flex gap-2 flex-wrap">
                                {['all', 'new', 'contacted', 'archived'].map((f) => (
                                    <button key={f} onClick={() => { setEmailFilter(f); setEmailPage(1); }}
                                        className={`px-3 py-2 rounded-lg font-mono text-[10px] tracking-wider uppercase transition cursor-pointer ${
                                            emailFilter === f ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'text-gray-500 border border-gray-100 hover:border-gray-200'
                                        }`}>{f}</button>
                                ))}
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-[#f4f6fb] border-b border-gray-200">
                                <div className="col-span-5 font-mono text-[10px] tracking-wider text-gray-400 uppercase">Email</div>
                                <div className="col-span-2 font-mono text-[10px] tracking-wider text-gray-400 uppercase">Source</div>
                                <div className="col-span-2 font-mono text-[10px] tracking-wider text-gray-400 uppercase">Status</div>
                                <div className="col-span-2 font-mono text-[10px] tracking-wider text-gray-400 uppercase">Date</div>
                                <div className="col-span-1 font-mono text-[10px] tracking-wider text-gray-400 uppercase text-right">Actions</div>
                            </div>
                            {emailLoading && (
                                <div className="px-6 py-12 text-center">
                                    <span className="inline-block w-6 h-6 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
                                    <p className="mt-3 font-mono text-xs text-gray-400">Loading emails...</p>
                                </div>
                            )}
                            {!emailLoading && emails.length === 0 && (
                                <div className="px-6 py-12 text-center"><p className="font-mono text-sm text-gray-400">No emails found.</p></div>
                            )}
                            {!emailLoading && emails.map((entry) => (
                                <div key={entry._id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50/50 transition items-center">
                                    <div className="sm:col-span-5"><span className="text-sm font-arimo text-gray-800">{entry.email}</span></div>
                                    <div className="sm:col-span-2"><span className="font-mono text-[10px] tracking-wider text-gray-500 uppercase">{entry.source}</span></div>
                                    <div className="sm:col-span-2">
                                        <select value={entry.status} onChange={(e) => updateEmailStatus(entry._id, e.target.value)}
                                            className={`font-mono text-[10px] tracking-wider uppercase px-2 py-1 rounded border cursor-pointer ${statusColor[entry.status]}`}>
                                            <option value="new">New</option>
                                            <option value="contacted">Contacted</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                    </div>
                                    <div className="sm:col-span-2"><span className="font-mono text-[10px] tracking-wider text-gray-400">{formatDate(entry.createdAt)}</span></div>
                                    <div className="sm:col-span-1 text-right">
                                        <button onClick={() => deleteEmail(entry._id)} className="font-mono text-[10px] tracking-wider text-red-400 hover:text-red-600 uppercase transition cursor-pointer">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {emailTotalPages > 1 && (
                            <div className="mt-6 flex items-center justify-between">
                                <button onClick={() => setEmailPage((p) => Math.max(1, p - 1))} disabled={emailPage === 1}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-mono text-xs text-gray-600 hover:border-gray-300 disabled:opacity-40 transition cursor-pointer">← Previous</button>
                                <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase">Page {emailPage} of {emailTotalPages}</span>
                                <button onClick={() => setEmailPage((p) => Math.min(emailTotalPages, p + 1))} disabled={emailPage === emailTotalPages}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-mono text-xs text-gray-600 hover:border-gray-300 disabled:opacity-40 transition cursor-pointer">Next →</button>
                            </div>
                        )}
                    </>
                )}

                {/* ============ VISITORS TAB ============ */}
                {activeTab === 'visitors' && (
                    <>
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {[
                                { value: visitorStats.total, label: 'Total Visits', color: 'text-gray-900' },
                                { value: visitorStats.unique, label: 'Unique IPs', color: 'text-blue-600' },
                                { value: visitorStats.today, label: 'Today', color: 'text-green-600' },
                            ].map((s) => (
                                <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-sm transition">
                                    <p className={`text-2xl sm:text-3xl font-bold ${s.color}`}>{s.value}</p>
                                    <p className="font-mono text-[10px] tracking-wider text-gray-400 uppercase mt-1">{s.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
                            <input type="text" placeholder="Search by IP, device, browser..." value={visitorSearch}
                                onChange={(e) => { setVisitorSearch(e.target.value); setVisitorPage(1); }}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-[#f4f6fb] text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition font-arimo"
                            />
                        </div>

                        {/* Table */}
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                            <div className="hidden sm:grid grid-cols-14 gap-4 px-6 py-3 bg-[#f4f6fb] border-b border-gray-200">
                                <div className="col-span-2 font-mono text-[10px] tracking-wider text-gray-400 uppercase">IP Address</div>
                                <div className="col-span-2 font-mono text-[10px] tracking-wider text-gray-400 uppercase">Location</div>
                                <div className="col-span-2 font-mono text-[10px] tracking-wider text-gray-400 uppercase">Device</div>
                                <div className="col-span-2 font-mono text-[10px] tracking-wider text-gray-400 uppercase">Browser</div>
                                <div className="col-span-1 font-mono text-[10px] tracking-wider text-gray-400 uppercase">OS</div>
                                <div className="col-span-2 font-mono text-[10px] tracking-wider text-gray-400 uppercase">Page</div>
                                <div className="col-span-2 font-mono text-[10px] tracking-wider text-gray-400 uppercase">Date</div>
                                <div className="col-span-1 font-mono text-[10px] tracking-wider text-gray-400 uppercase text-right">Actions</div>
                            </div>
                            {visitorLoading && (
                                <div className="px-6 py-12 text-center">
                                    <span className="inline-block w-6 h-6 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
                                    <p className="mt-3 font-mono text-xs text-gray-400">Loading visitors...</p>
                                </div>
                            )}
                            {!visitorLoading && visitors.length === 0 && (
                                <div className="px-6 py-12 text-center"><p className="font-mono text-sm text-gray-400">No visitors recorded yet.</p></div>
                            )}
                            {!visitorLoading && visitors.map((v) => (
                                <div key={v._id} className="grid grid-cols-1 sm:grid-cols-14 gap-2 sm:gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50/50 transition items-center">
                                    <div className="sm:col-span-2">
                                        <span className="font-mono text-xs text-gray-800">{v.ip}</span>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <span className="font-mono text-[10px] tracking-wider text-gray-600">
                                            {v.city && v.city !== 'Unknown' ? `${v.city}, ` : ''}{v.country || 'Unknown'}
                                        </span>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <span className="font-mono text-[10px] tracking-wider text-gray-500 uppercase">{v.device}</span>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <span className="font-mono text-[10px] tracking-wider text-gray-500 uppercase">{v.browser}</span>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <span className="font-mono text-[10px] tracking-wider text-gray-500 uppercase">{v.os}</span>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <span className="font-mono text-[10px] tracking-wider text-blue-600">{v.page}</span>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <span className="font-mono text-[10px] tracking-wider text-gray-400">{formatDate(v.createdAt)}</span>
                                    </div>
                                    <div className="sm:col-span-1 text-right relative">
                                        <button
                                            onClick={() => setVisitorMenuOpen(visitorMenuOpen === v._id ? null : v._id)}
                                            className="p-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                <circle cx="10" cy="4" r="1.5" />
                                                <circle cx="10" cy="10" r="1.5" />
                                                <circle cx="10" cy="16" r="1.5" />
                                            </svg>
                                        </button>
                                        {visitorMenuOpen === v._id && (
                                            <div ref={visitorMenuRef} className="absolute right-0 top-8 z-50 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1 animate-in fade-in">
                                                <button
                                                    onClick={() => copyToClipboard(v.ip)}
                                                    className="w-full text-left px-4 py-2.5 text-xs font-mono text-gray-700 hover:bg-gray-50 transition flex items-center gap-2 cursor-pointer"
                                                >
                                                    <span className="text-gray-400"></span> Copy IP Address
                                                </button>
                                                <button
                                                    onClick={() => copyToClipboard(`${v.device} | ${v.browser} | ${v.os}`)}
                                                    className="w-full text-left px-4 py-2.5 text-xs font-mono text-gray-700 hover:bg-gray-50 transition flex items-center gap-2 cursor-pointer"
                                                >
                                                    <span className="text-gray-400"></span> Copy Device Info
                                                </button>
                                                <button
                                                    onClick={() => copyToClipboard(`${v.city}, ${v.region}, ${v.country}`)}
                                                    className="w-full text-left px-4 py-2.5 text-xs font-mono text-gray-700 hover:bg-gray-50 transition flex items-center gap-2 cursor-pointer"
                                                >
                                                    <span className="text-gray-400"></span> Copy Location
                                                </button>
                                                <div className="h-px bg-gray-100 my-1" />
                                                <button
                                                    onClick={() => {
                                                        setVisitorSearch(v.ip);
                                                        setVisitorMenuOpen(null);
                                                    }}
                                                    className="w-full text-left px-4 py-2.5 text-xs font-mono text-gray-700 hover:bg-gray-50 transition flex items-center gap-2 cursor-pointer"
                                                >
                                                    <span className="text-gray-400"></span> Filter by this IP
                                                </button>
                                                <button
                                                    onClick={() => blockVisitorIP(v.ip)}
                                                    className="w-full text-left px-4 py-2.5 text-xs font-mono text-red-600 hover:bg-red-50 transition flex items-center gap-2 cursor-pointer"
                                                >
                                                    <span className="text-red-400"></span> Block IP
                                                </button>
                                                <button
                                                    onClick={() => deleteVisitor(v._id)}
                                                    className="w-full text-left px-4 py-2.5 text-xs font-mono text-red-600 hover:bg-red-50 transition flex items-center gap-2 cursor-pointer"
                                                >
                                                    <span className="text-red-400"></span> Delete Record
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {visitorTotalPages > 1 && (
                            <div className="mt-6 flex items-center justify-between">
                                <button onClick={() => setVisitorPage((p) => Math.max(1, p - 1))} disabled={visitorPage === 1}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-mono text-xs text-gray-600 hover:border-gray-300 disabled:opacity-40 transition cursor-pointer">← Previous</button>
                                <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase">Page {visitorPage} of {visitorTotalPages}</span>
                                <button onClick={() => setVisitorPage((p) => Math.min(visitorTotalPages, p + 1))} disabled={visitorPage === visitorTotalPages}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-mono text-xs text-gray-600 hover:border-gray-300 disabled:opacity-40 transition cursor-pointer">Next →</button>
                            </div>
                        )}
                    </>
                )}

                {/* ============ BLOCKED TAB ============ */}
                {activeTab === 'blocked' && (
                    <>
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {[
                                { value: blockedStats.total, label: 'Total Blocked', color: 'text-gray-900' },
                                { value: blockedStats.active, label: 'Active Blocks', color: 'text-red-600' },
                            ].map((s) => (
                                <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-sm transition">
                                    <p className={`text-2xl sm:text-3xl font-bold ${s.color}`}>{s.value}</p>
                                    <p className="font-mono text-[10px] tracking-wider text-gray-400 uppercase mt-1">{s.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Info */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                            <p className="font-mono text-xs text-yellow-700">
                                ⚠ IPs are automatically blocked when they exceed 15 API requests per second. You can unblock or permanently remove entries below.
                            </p>
                        </div>

                        {/* Table */}
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-[#f4f6fb] border-b border-gray-200">
                                <div className="col-span-3 font-mono text-[10px] tracking-wider text-gray-400 uppercase">IP Address</div>
                                <div className="col-span-3 font-mono text-[10px] tracking-wider text-gray-400 uppercase">Reason</div>
                                <div className="col-span-1 font-mono text-[10px] tracking-wider text-gray-400 uppercase">Req/s</div>
                                <div className="col-span-2 font-mono text-[10px] tracking-wider text-gray-400 uppercase">Status</div>
                                <div className="col-span-2 font-mono text-[10px] tracking-wider text-gray-400 uppercase">Blocked At</div>
                                <div className="col-span-1 font-mono text-[10px] tracking-wider text-gray-400 uppercase text-right">Actions</div>
                            </div>
                            {blockedLoading && (
                                <div className="px-6 py-12 text-center">
                                    <span className="inline-block w-6 h-6 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
                                    <p className="mt-3 font-mono text-xs text-gray-400">Loading blocked IPs...</p>
                                </div>
                            )}
                            {!blockedLoading && blocked.length === 0 && (
                                <div className="px-6 py-12 text-center"><p className="font-mono text-sm text-gray-400">No blocked IPs. All clear.</p></div>
                            )}
                            {!blockedLoading && blocked.map((b) => (
                                <div key={b._id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50/50 transition items-center">
                                    <div className="sm:col-span-3">
                                        <span className="font-mono text-xs text-gray-800 font-semibold">{b.ip}</span>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <span className="font-mono text-[10px] tracking-wider text-gray-500">{b.reason}</span>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <span className="font-mono text-xs text-red-600 font-bold">{b.requestCount}</span>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <span className={`font-mono text-[10px] tracking-wider uppercase px-2 py-1 rounded border ${
                                            b.active ? 'text-red-600 bg-red-50 border-red-200' : 'text-green-600 bg-green-50 border-green-200'
                                        }`}>
                                            {b.active ? 'Blocked' : 'Unblocked'}
                                        </span>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <span className="font-mono text-[10px] tracking-wider text-gray-400">{formatDate(b.createdAt)}</span>
                                    </div>
                                    <div className="sm:col-span-1 text-right flex justify-end gap-2">
                                        <button onClick={() => toggleBlock(b._id)}
                                            className={`font-mono text-[10px] tracking-wider uppercase transition cursor-pointer ${
                                                b.active ? 'text-green-500 hover:text-green-700' : 'text-red-400 hover:text-red-600'
                                            }`}>
                                            {b.active ? 'Unblock' : 'Block'}
                                        </button>
                                        <button onClick={() => deleteBlock(b._id)}
                                            className="font-mono text-[10px] tracking-wider text-red-400 hover:text-red-600 uppercase transition cursor-pointer">
                                            ×
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Footer */}
                <div className="mt-12 h-px w-full bg-linear-to-r from-transparent via-gray-300 to-transparent" />
                <p className="mt-6 text-center font-mono text-[10px] tracking-[0.2em] text-gray-400 uppercase">
                    RAW Admin Panel :: v2.4 :: Rate Limited (15 req/s)
                </p>
            </div>
        </main>
    );
}
