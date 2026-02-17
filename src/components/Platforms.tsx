import { motion } from 'framer-motion';

export default function Platforms() {
    return (
        <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#f4f6fb]">
            <div className="max-w-6xl mx-auto text-center">
                {/* Badge */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-blue-600 uppercase mb-6"
                >
                    ● Target Architectures ●
                </motion.p>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 uppercase leading-tight tracking-tight"
                >
                    Built For{' '}
                    <span className="text-gray-400 text-3xl sm:text-5xl md:text-6xl">→</span>{' '}
                    <span className="text-blue-600 italic">Clients</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-6 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto"
                >
                    RAW reflects how I build: scalable, reliable, and intuitive. Whether you’re developing SaaS, fintech, or marketplace solutions, the infrastructure is designed so creators like me can ship confidently
                </motion.p>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-8 font-mono text-[10px] sm:text-xs tracking-[0.2em] text-gray-500 uppercase"
                >
                    Built for clients who don’t just dream — they build businesses that scale.
                </motion.p>

                {/* Tags */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="flex flex-wrap justify-center gap-3 mt-4"
                >
                    {['Built to Grow', 'Trust by Design'].map((tag) => (
                        <span
                            key={tag}
                            className="px-4 py-1.5 border border-gray-300 rounded-md font-mono text-[10px] sm:text-xs tracking-wider text-gray-600 uppercase"
                        >
                            {tag}
                        </span>
                    ))}
                </motion.div>

                {/* Cards */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 text-left flex flex-col justify-between min-h-70 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
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
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 text-left flex flex-col justify-between min-h-70 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
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
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 text-left flex flex-col justify-between min-h-70 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
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
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
