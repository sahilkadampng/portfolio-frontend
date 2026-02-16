import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const timeline = [
    { year: '2024', title: 'Started Web Development', desc: 'Began learning JavaScript, HTML & CSS — built first static sites and explored the fundamentals of frontend development.' },
    { year: '2024', title: 'Dove Into Backend', desc: 'Picked up Node.js and Express.js. Built REST APIs, connected MongoDB databases, and started thinking in systems.' },
    { year: '2025', title: 'First Full-Stack Project', desc: 'Shipped ResolvexPro — a complaint management SaaS platform with auth, dashboards, and real-time data pipelines.' },
    { year: '2025', title: 'Building RAW', desc: 'Currently crafting RAW — a developer-first portfolio and infrastructure brand that reflects how I build: clean, scalable, and production-ready.' },
];

const values = [
    { label: 'Simplicity First', desc: 'Clean architecture over clever hacks. Every system should be readable and maintainable.' },
    { label: 'Ship & Iterate', desc: 'Launch early, learn fast. Production feedback beats theoretical perfection.' },
    { label: 'Security by Default', desc: 'Auth, validation, and encryption aren\'t afterthoughts — they\'re built into the foundation.' },
    { label: 'Scale-Ready', desc: 'From day one, code is structured for growth. Microservices, modular design, clean separation.' },
];

export default function About() {
    return (
        <>
            <Navbar />
            <main className="bg-[#f4f6fb] min-h-screen">
                {/* Hero section */}
                <section className="pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto text-center">
                        <p className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-blue-600 uppercase mb-6">
                            ● About :: Overview ●
                        </p>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 uppercase leading-tight tracking-tight">
                            The Developer
                            <br />
                            <span className="text-blue-600 italic">Behind RAW.</span>
                        </h1>
                        <p className="mt-6 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
                            19-year-old backend developer from India — building scalable systems,
                            clean APIs, and production-grade infrastructure from the ground up.
                        </p>

                        {/* Stats */}
                        <div className="mt-12 flex flex-wrap justify-center divide-x divide-gray-200">
                            {[
                                { value: '19', label: 'Years Old' },
                                { value: 'India', label: 'Location' },
                                { value: 'Backend', label: 'Focus' },
                                { value: '2024', label: 'Started' },
                            ].map((stat) => (
                                <div key={stat.label} className="px-6 sm:px-10 py-2 text-center">
                                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                                    <p className="font-mono text-[10px] sm:text-xs tracking-wider text-gray-400 uppercase mt-1">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Bio card */}
                <section className="px-4 sm:px-6 pb-16">
                    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl p-8 sm:p-12">
                        <div className="flex items-center justify-between mb-6">
                            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-gray-400 uppercase">
                                Profile :: Summary
                            </span>
                            <span className="flex items-center gap-2 text-xs font-mono text-gray-400">
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                AVAILABLE FOR WORK
                            </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 uppercase tracking-tight mb-4">
                            Sahil Kadam
                        </h3>
                        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4">
                            I'm a self-taught developer who started from zero and built my way into backend engineering.
                            I think in systems — databases, APIs, auth layers, and deployment pipelines. My goal isn't
                            just to write code, but to build infrastructure that scales and lasts.
                        </p>
                        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                            When I'm not coding, I'm studying system design patterns, exploring new technologies,
                            and working toward becoming a production-grade engineer who ships with confidence.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {['Node.js', 'Express', 'MongoDB', 'React', 'TypeScript', 'Tailwind CSS', 'Git'].map((tag) => (
                                <span key={tag} className="px-3 py-1 border border-gray-200 rounded-md font-mono text-[10px] sm:text-xs tracking-wider text-gray-600 uppercase">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Timeline */}
                <section className="px-4 sm:px-6 pb-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <p className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                                Journey :: Timeline
                            </p>
                            <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 uppercase tracking-tight">
                                The Path <span className="text-blue-600 italic">So Far.</span>
                            </h2>
                        </div>

                        <div className="space-y-6">
                            {timeline.map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 flex gap-6 items-start hover:shadow-md transition-shadow">
                                    <div className="flex flex-col items-center shrink-0">
                                        <span className={`w-3 h-3 rounded-full ${i === timeline.length - 1 ? 'bg-blue-600' : 'bg-gray-300'}`} />
                                        {i < timeline.length - 1 && <span className="w-px h-full bg-gray-200 mt-1" />}
                                    </div>
                                    <div>
                                        <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase">{item.year}</span>
                                        <h3 className="text-lg font-extrabold text-gray-900 tracking-tight mt-1 mb-2">{item.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="px-4 sm:px-6 pb-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <p className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                                Core :: Principles
                            </p>
                            <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 uppercase tracking-tight">
                                How I <span className="text-blue-600 italic">Build.</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {values.map((v, i) => (
                                <div key={v.label} className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="font-mono text-[10px] tracking-wider text-blue-600 uppercase">{v.label}</span>
                                        <span className="font-mono text-xs text-gray-300">{String(i + 1).padStart(2, '0')}</span>
                                    </div>
                                    <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="mt-16 h-px w-full bg-linear-to-r from-transparent via-gray-300 to-transparent" />
                        <p className="mt-8 text-center font-mono text-[10px] sm:text-xs tracking-[0.2em] text-blue-600 uppercase">
                            Built from scratch. Shipping with intent.
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
