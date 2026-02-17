import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ─── Reusable scroll-reveal wrapper ───────────────────
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ─── Terminal code block component ────────────────────
function CodeBlock({ title, code, lang = 'bash' }: { title: string; code: string; lang?: string }) {
    return (
        <div className="rounded-xl overflow-hidden border border-gray-700/50 shadow-2xl bg-[#0d1117]">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-700/50">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                    <span className="ml-3 font-mono text-[11px] text-gray-500 tracking-wide">{title}</span>
                </div>
                <span className="font-mono text-[10px] text-gray-600 uppercase tracking-wider">{lang}</span>
            </div>
            {/* Code with line numbers */}
            <div className="p-3 sm:p-5 overflow-x-auto">
                <div className="flex">
                    <div className="select-none pr-3 sm:pr-4 border-r border-gray-700/30 mr-3 sm:mr-4 hidden sm:block">
                        {code.split('\n').map((_, i) => (
                            <div key={i} className="text-right font-mono text-[10px] sm:text-[11px] leading-5 sm:leading-6 text-gray-600 min-w-6">
                                {i + 1}
                            </div>
                        ))}
                    </div>
                    <pre className="flex-1 min-w-0">
                        <code className="text-[11px] sm:text-[13px] font-mono leading-5 sm:leading-6 text-gray-300 whitespace-pre">
                            {code.split('\n').map((line, i) => {
                                // Comments
                                if (/^\s*(\/\/|#)/.test(line)) {
                                    return <div key={i} className="text-green-400/70 italic truncate">{line}</div>;
                                }
                                // Highlight multiple keywords and functions per line
                                const keywords = ['import', 'export', 'const', 'let', 'async', 'await', 'function', 'return', 'from', 'if', 'try', 'catch'];
                                const functions = ['app.', 'res', 'next', 'jwt', 'Admin', 'express'];
                                const error = ['error'];
                                const key = ['use', 'json'];
                                let highlightedLine = line;
                                // Replace keywords with span
                                keywords.forEach(k => {
                                    const regex = new RegExp(`\\b${k}\\b`, 'g');
                                    highlightedLine = highlightedLine.replace(regex, `<span class="text-purple-500">${k}</span>`);
                                });
                                // Replace functions with span
                                functions.forEach(f => {
                                    const regex = new RegExp(`\\b${f}\\b`, 'g');
                                    highlightedLine = highlightedLine.replace(regex, `<span class="text-pink-500">${f}</span>`);
                                });
                                error.forEach(e => {
                                    const regex = new RegExp(`\\b${e}\\b`, 'g');
                                    highlightedLine = highlightedLine.replace(regex, `<span class="text-red-500">${e}</span>`);
                                });
                                key.forEach(t => {
                                    const regex = new RegExp(`\\b${t}\\b`, 'g');
                                    highlightedLine = highlightedLine.replace(regex, `<span class="text-blue-400">${t}</span>`);
                                });
                                return <div key={i} dangerouslySetInnerHTML={{ __html: highlightedLine }} />;
                            })}
                        </code>
                    </pre>
                </div>
            </div>
            {/* Status bar */}
            <div className="px-3 sm:px-4 py-1.5 bg-white border-t border-gray-700/50 flex items-center justify-between">
                <span className="font-mono text-[9px] sm:text-[10px] text-gray-600">{lang}</span>
                <div className="flex items-center gap-2 sm:gap-3">
                    <span className="font-mono text-[9px] sm:text-[10px] text-gray-600">{code.split('\n').length} lines</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                </div>
            </div>
        </div>
    );
}

// ─── Data ────────────────────────────────────────────
const stackLayers = [
    {
        tag: 'Layer 01',
        tagColor: 'text-blue-600',
        title: 'API Gateway',
        desc: 'Express.js REST API with versioned routes, JSON schema validation, and structured error handling. Every request is authenticated, rate-limited, and logged.',
        features: ['Express.js v5', 'JWT Auth', 'Rate Limiting', 'CORS'],
        code: `// Express API Gateway — index.js
        
import express from 'express';
import cors from 'cors';
import { checkBlocked, publicLimiter, authLimiter } from './middleware/rateLimiter.js';

const app = express();

// Trust proxy for real IP behind reverse proxy
app.set('trust proxy', true);

// CORS — allow frontend origins
app.use(cors({
    origin: ['https:/abc.app', 'http://localhost:-0000'],
    credentials: true
}));

app.use(express.json());
app.use(checkBlocked);

// Route-specific rate limiters
app.use('/api/v1/auth', auth);
app.use('/api/v1/emails', public);
app.use('/api/v1/visitors', publicLimiter);`,
        codeTitle: 'gateway.js',
        codeLang: 'javascript',
    },
    {
        tag: 'Layer 02',
        tagColor: 'text-gray-500',
        title: 'Authentication',
        desc: 'JWT-based auth with bcrypt password hashing, token refresh, and role-based access control. Auto-blocks brute-force attempts.',
        features: ['JWT Tokens', 'bcrypt', 'RBAC', 'Auto-Block'],
        code: `// Auth middleware — protect.js
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
    return res.status(401).json({
        status: 'error',
        message: 'Not authorized. Token missing.'
    });
    }

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id);
    next();
    } catch {
    return res.status(401).json({
        status: 'error',
        message: 'Token expired or invalid.'
    });
    }
};`,
        codeTitle: 'auth.middleware.js',
        codeLang: 'javascript',
    },
    {
        tag: 'Layer 03',
        tagColor: 'text-blue-600',
        title: 'Data Layer',
        desc: 'MongoDB with Mongoose ODM — schema-first design with strategic indexing, validation, and aggregation pipelines for complex queries.',
        features: ['MongoDB', 'Mongoose ODM', 'Indexes', 'Aggregation'],
        code: `// Visitor Schema — models/Visitor.js
import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
    ip:       { type: String, required: true },
    device:   { type: String, default: 'Unknown' },
    browser:  { type: String, default: 'Unknown' },
    os:       { type: String, default: 'Unknown' },
    page:     { type: String, default: '/' },
    country:  { type: String, default: 'Unknown' },
    city:     { type: String, default: 'Unknown' },
    region:   { type: String, default: 'Unknown' },
}, { timestamps: true });

// Compound indexes for fast lookups
visitorSchema.index({ ip: 1 });
visitorSchema.index({ createdAt: -1 });

const Visitor = mongoose.model('Visitor', visitorSchema);`,
        codeTitle: 'Visitor.model.js',
        codeLang: 'javascript',
    },
    {
        tag: 'Layer 04',
        tagColor: 'text-gray-500',
        title: 'Rate Limiting',
        desc: 'Tiered rate limiting per endpoint type using express-rate-limit. Auth abuse auto-blocks IPs. Returns structured 429 responses.',
        features: ['Public: 100/min', 'Auth: 10/min', 'Admin: 20/min', 'Auto-Block'],
        code: `// Rate limiter config — rateLimiter.js
import rateLimit from 'express-rate-limit';

// Public endpoints — 100 req/min
export const publicLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  message: {
    status: 'error',
    message: 'Too many requests, please try again later.'
  }
});

// Auth endpoints — 10 req/min (strict)
export const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  message: {
    status: 'error',
    message: 'Too many requests, please try again later.'
  }
});

// Admin endpoints — 20 req/min
export const adminLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  message: {
    status: 'error',
    message: 'Too many requests, please try again later.'
  }
});`,
        codeTitle: 'rateLimiter.js',
        codeLang: 'javascript',
    },
    {
        tag: 'Layer 05',
        tagColor: 'text-blue-600',
        title: 'Frontend Client',
        desc: 'React 19 with TypeScript, Tailwind CSS, Framer Motion animations, and a visitor tracking hook. Deployed on Vercel with edge caching.',
        features: ['React 19', 'TypeScript', 'Tailwind v4', 'Framer Motion'],
        code: `// Visitor tracker hook — useVisitorTracker.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../config/api';

export function useVisitorTracker() {
  const location = useLocation();

  useEffect(() => {
    const track = async () => {
      const { device, browser, os } = getDeviceInfo();
      const clientIP = await getPublicIP();

      await fetch(\`\${API_URL}/visitors/track\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: location.pathname,
          referrer: document.referrer || 'direct',
          device, browser, os, clientIP
        })
      });
    };

    track();
  }, [location.pathname]);
}`,
        codeTitle: 'useVisitorTracker.ts',
        codeLang: 'typescript',
    },
    {
        tag: 'Layer 06',
        tagColor: 'text-gray-500',
        title: 'Deployment Pipeline',
        desc: 'Backend on Render with auto-deploy from GitHub. Frontend on Vercel with edge functions. MongoDB Atlas for managed database.',
        features: ['Render', 'Vercel', 'MongoDB Atlas', 'GitHub CI'],
        code: `# Deployment configuration
# ── Backend (Render) ──────────────
# Build Command:
npm install

# Start Command:
node index.js

# Environment Variables:
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<secure-random-key>
FRONTEND_URL=https://abc.com

# ── Frontend (Vercel) ─────────────
# Framework: Vite
# Build: npm run build
# Output: dist/

# vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}`,
        codeTitle: 'deploy.config',
        codeLang: 'shell',
    },
];

const metrics = [
    { value: '<200ms', label: 'API Response', desc: 'Average latency' },
    { value: '99.9%', label: 'Uptime SLA', desc: 'Monthly target' },
    { value: '6', label: 'Stack Layers', desc: 'End to end' },
    { value: '3-Tier', label: 'Rate Limiting', desc: 'Per endpoint' },
];

const techStack = [
    { name: 'Node.js', category: 'Runtime' },
    { name: 'Express.js', category: 'Framework' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'Mongoose', category: 'ODM' },
    { name: 'React 19', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Tailwind v4', category: 'Styling' },
    { name: 'Framer Motion', category: 'Animation' },
    { name: 'JWT', category: 'Auth' },
    { name: 'bcrypt', category: 'Security' },
    { name: 'Vercel', category: 'Hosting' },
    { name: 'Render', category: 'Backend' },
];

export default function Infrastructure() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

    return (
        <>
            <Navbar />
            <main className="bg-[#f4f6fb] min-h-screen overflow-hidden">

                {/* ════════════ HERO — Parallax + Scale ════════════ */}
                <section ref={heroRef} className="relative pt-32 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden">
                    {/* Floating grid background */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }} />

                    <motion.div
                        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
                        className="max-w-6xl mx-auto text-center relative z-10"
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-blue-600 uppercase mb-6"
                        >
                            ● Infrastructure :: Overview ●
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-gray-900 uppercase leading-[0.95] tracking-tight"
                        >
                            The Stack
                            <br />
                            <span className="text-blue-600 italic">Under The Hood.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-6 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto"
                        >
                            A deep dive into every layer of the system — from API gateway to deployment
                            pipeline. Real code. Real architecture. Production-grade.
                        </motion.p>

                        {/* Animated tags */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.55 }}
                            className="flex flex-wrap justify-center gap-3 mt-8"
                        >
                            {['Express.js', 'MongoDB', 'React', 'TypeScript', 'JWT', 'Vercel'].map((tag, i) => (
                                <motion.span
                                    key={tag}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                                    className="px-4 py-1.5 border border-gray-300 rounded-md font-mono text-[10px] sm:text-xs tracking-wider text-gray-600 uppercase hover:border-blue-400 hover:text-blue-600 transition-colors cursor-default"
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-5 h-8 border-2 border-gray-300 rounded-full flex items-start justify-center p-1"
                        >
                            <motion.span className="w-1 h-2 bg-gray-400 rounded-full" />
                        </motion.div>
                    </motion.div>
                </section>

                {/* ════════════ METRICS — Count-up style ════════════ */}
                <section className="px-4 sm:px-6 pb-10 sm:pb-16">
                    <div className="max-w-6xl mx-auto">
                        <Reveal>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                                {metrics.map((m, i) => (
                                    <motion.div
                                        key={m.label}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">{m.value}</p>
                                        <p className="font-mono text-[10px] tracking-wider text-blue-600 uppercase mt-1">{m.label}</p>
                                        <p className="text-[10px] text-gray-400 mt-0.5">{m.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ════════════ STACK LAYERS — Alternating layout ════════════ */}
                <section className="px-4 sm:px-6 pb-14 sm:pb-24">
                    <div className="max-w-6xl mx-auto">
                        <Reveal>
                            <div className="text-center mb-10 sm:mb-16">
                                <p className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                                    System :: Layers
                                </p>
                                <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 uppercase tracking-tight">
                                    Every <span className="text-blue-600 italic">Layer.</span>
                                </h2>
                                <p className="mt-4 text-gray-500 max-w-xl mx-auto">
                                    From HTTP request to database write — every layer is documented with real, production code.
                                </p>
                            </div>
                        </Reveal>

                        <div className="space-y-12 sm:space-y-20">
                            {stackLayers.map((layer, i) => {
                                const isEven = i % 2 === 0;
                                return (
                                    <Reveal key={layer.title} delay={0.1}>
                                        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-start`}>
                                            {/* Info card */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6, delay: 0.15 }}
                                                className="w-full lg:w-5/12"
                                            >
                                                <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <span className={`font-mono text-[10px] tracking-wider uppercase ${layer.tagColor}`}>
                                                            {layer.tag}
                                                        </span>
                                                        <span className="font-mono text-xs text-gray-300">{String(i + 1).padStart(2, '0')}</span>
                                                    </div>
                                                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 uppercase tracking-tight mb-3">
                                                        {layer.title}
                                                    </h3>
                                                    <p className="text-gray-500 text-sm leading-relaxed mb-5">
                                                        {layer.desc}
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {layer.features.map((f) => (
                                                            <span key={f} className="px-2.5 py-1 border border-gray-100 rounded-md font-mono text-[10px] tracking-wider text-gray-500 uppercase bg-gray-50/50">
                                                                {f}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                            {/* Code block */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6, delay: 0.25 }}
                                                className="w-full lg:w-7/12 flex justify-start items-start"
                                            >
                                                <div className="w-full text-left">
                                                    <CodeBlock
                                                        title={layer.codeTitle}
                                                        code={layer.code}
                                                        lang={layer.codeLang}
                                                    />
                                                </div>
                                            </motion.div>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ════════════ TECH STACK GRID — Staggered reveal ════════════ */}
                <section className="px-4 sm:px-6 pb-14 sm:pb-24 bg-white border-t border-b border-gray-200">
                    <div className="max-w-6xl mx-auto py-12 sm:py-20">
                        <Reveal>
                            <div className="text-center mb-8 sm:mb-14">
                                <p className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                                    Technologies :: Stack
                                </p>
                                <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 uppercase tracking-tight">
                                    Built <span className="text-blue-600 italic">With.</span>
                                </h2>
                            </div>
                        </Reveal>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {techStack.map((tech, i) => (
                                <motion.div
                                    key={tech.name}
                                    initial={{ opacity: 0, scale: 0.85, y: 20 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    whileHover={{ scale: 1.05, y: -4 }}
                                    className="bg-[#f4f6fb] border border-gray-200 rounded-xl p-4 text-center hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-default"
                                >
                                    <p className="text-sm font-bold text-gray-900">{tech.name}</p>
                                    <p className="font-mono text-[9px] tracking-wider text-gray-400 uppercase mt-1">{tech.category}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ════════════ ARCHITECTURE DIAGRAM — Animated flow ════════════ */}
                <section className="px-4 sm:px-6 py-14 sm:py-24">
                    <div className="max-w-4xl mx-auto">
                        <Reveal>
                            <div className="text-center mb-14">
                                <p className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                                    System :: Flow
                                </p>
                                <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 uppercase tracking-tight">
                                    Request <span className="text-blue-600 italic">Lifecycle.</span>
                                </h2>
                            </div>
                        </Reveal>

                        <div className="space-y-0">
                            {[
                                { step: '01', label: 'Client Request', detail: 'React app sends HTTP request with JWT token', color: 'border-blue-200 bg-blue-50' },
                                // { step: '02', label: 'IP Block Check', detail: 'Middleware checks if IP is in the blocked list', color: 'border-red-200 bg-red-50' },
                                { step: '02', label: 'Rate Limiter', detail: 'express-rate-limit enforces per-endpoint limits', color: 'border-yellow-200 bg-yellow-50' },
                                { step: '03', label: 'Auth Middleware', detail: 'JWT verification and role-based access control', color: 'border-purple-200 bg-purple-50' },
                                { step: '04', label: 'Route Handler', detail: 'Business logic execution with input validation', color: 'border-gray-200 bg-gray-50' },
                                { step: '05', label: 'Database Query', detail: 'Mongoose ODM with indexed queries to MongoDB Atlas', color: 'border-green-200 bg-green-50' },
                                { step: '06', label: 'JSON Response', detail: 'Structured response with status, data, and metadata', color: 'border-blue-200 bg-blue-50' },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    className="relative"
                                >
                                    <div className={`flex items-center gap-4 p-4 sm:p-5 rounded-xl border ${item.color} hover:shadow-md transition-all duration-200`}>
                                        <span className="w-10 h-10 shrink-0 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-mono text-xs font-bold text-gray-500">
                                            {item.step}
                                        </span>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm uppercase tracking-tight">{item.label}</p>
                                            <p className="text-gray-500 text-xs mt-0.5">{item.detail}</p>
                                        </div>
                                    </div>
                                    {i < 6 && (
                                        <div className="flex justify-center py-1">
                                            <motion.div
                                                initial={{ scaleY: 0 }}
                                                whileInView={{ scaleY: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.3, delay: i * 0.08 + 0.3 }}
                                                className="w-px h-6 bg-gray-300 origin-top"
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ════════════ FOOTER CTA ════════════ */}
                <section className="px-4 sm:px-6 pb-20">
                    <div className="max-w-4xl mx-auto">
                        <Reveal>
                            <div className="bg-[#0d1117] rounded-2xl p-8 sm:p-12 text-center border border-gray-700/30">
                                <p className="font-mono text-[10px] tracking-[0.3em] text-green-400 uppercase mb-4">
                                    ● System :: Status ●
                                </p>
                                <h3 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mb-3">
                                    All Systems <span className="text-green-400">Operational.</span>
                                </h3>
                                <p className="text-gray-400 text-sm max-w-lg mx-auto mb-6">
                                    This infrastructure runs 24/7 on Render and Vercel. Every request is authenticated,
                                    rate-limited, and monitored. Built to scale.
                                </p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-900/30 border border-green-700/30 font-mono text-[10px] text-green-400 uppercase tracking-wider">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        API Online
                                    </span>
                                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-900/30 border border-green-700/30 font-mono text-[10px] text-green-400 uppercase tracking-wider">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        DB Connected
                                    </span>
                                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-900/30 border border-green-700/30 font-mono text-[10px] text-green-400 uppercase tracking-wider">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        CDN Active
                                    </span>
                                </div>
                            </div>
                        </Reveal>

                        {/* Divider */}
                        <div className="mt-16 h-px w-full bg-linear-to-r from-transparent via-gray-300 to-transparent" />
                        <p className="mt-8 text-center font-mono text-[10px] sm:text-xs tracking-[0.2em] text-blue-600 uppercase">
                            Every layer. Production grade. Open source.
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
