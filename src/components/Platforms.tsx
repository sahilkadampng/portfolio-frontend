export default function Platforms() {
    return (
        <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#f4f6fb]">
            <div className="max-w-6xl mx-auto text-center">
                {/* Badge */}
                <p className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-blue-600 uppercase mb-6">
                    ● Target Architectures ●
                </p>

                {/* Heading */}
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 uppercase leading-tight tracking-tight">
                    Built For{' '}
                    <span className="text-gray-400 text-3xl sm:text-5xl md:text-6xl">→</span>{' '}
                    <span className="text-blue-600 italic">Clients</span>
                </h2>

                {/* Description */}
                <p className="mt-6 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
                    RAW reflects how I build: scalable, reliable, and intuitive. Whether you’re developing SaaS, fintech, or marketplace solutions, the infrastructure is designed so creators like me can ship confidently
                </p>

                {/* Subtitle */}
                <p className="mt-8 font-mono text-[10px] sm:text-xs tracking-[0.2em] text-gray-500 uppercase">
                    Built for clients who don’t just dream — they build businesses that scale.
                </p>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                    {['Built to Grow', 'Trust by Design'].map((tag) => (
                        <span
                            key={tag}
                            className="px-4 py-1.5 border border-gray-300 rounded-md font-mono text-[10px] sm:text-xs tracking-wider text-gray-600 uppercase"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Cards */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 text-left flex flex-col justify-between min-h-70">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <span className="font-mono text-[10px] sm:text-xs tracking-wider text-gray-500 uppercase">
                                    SaaS Platforms
                                </span>
                                <span className="font-mono text-xs text-gray-300">01</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 uppercase tracking-tight mb-3">
                                ResolvexPro
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                A secure platform I built to manage public complaints effortlessly.
                            </p>
                        </div>
                        <a href="https://resolvexpro.vercel.app/" className="mt-6 inline-flex items-center gap-2 font-mono text-xs tracking-wider text-blue-600 uppercase hover:text-blue-700 transition-colors">
                            View site <span>→</span>
                        </a>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 text-left flex flex-col justify-between min-h-70">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <span className="font-mono text-[10px] sm:text-xs tracking-wider text-gray-500 uppercase">
                                    N/A
                                </span>
                                <span className="font-mono text-xs text-gray-300">02</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 uppercase tracking-tight mb-3">
                                N/A
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                N/A.
                            </p>
                        </div>
                        <a href="#" className="mt-6 inline-flex items-center gap-2 font-mono text-xs tracking-wider text-blue-600 uppercase hover:text-blue-700 transition-colors">
                            N/A <span>→</span>
                        </a>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 text-left flex flex-col justify-between min-h-70">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <span className="font-mono text-[10px] sm:text-xs tracking-wider text-gray-500 uppercase">
                                    N/A
                                </span>
                                <span className="font-mono text-xs text-gray-300">03</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 uppercase tracking-tight mb-3">
                                N/A
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                N/A
                            </p>
                        </div>
                        <a href="#" className="mt-6 inline-flex items-center gap-2 font-mono text-xs tracking-wider text-blue-600 uppercase hover:text-blue-700 transition-colors">
                            N/A <span>→</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
