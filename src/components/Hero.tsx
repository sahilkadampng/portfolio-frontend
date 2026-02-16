import { useState } from 'react'

const image = '/download.png'

export default function Hero() {
    const [activeTab, setActiveTab] = useState<'input' | 'output'>('input')
    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden bg-[#f4f6fb] px-4 sm:px-6">
            {/* Image background — behind everything */}
            <img
                src={image}
                alt="Dashboard preview"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-xl max-w-none opacity-80 pointer-events-none z-0 -mt-48"
            />

            {/* Globe background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 width-[650px] height-[650px] rounded-full from-blue-400/60 via-blue-500/40 to-blue-300/20 blur-sm opacity-80 pointer-events-none z-0">
                {/* Globe grid lines */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                    {/* Horizontal lines */}
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={`h-${i}`}
                            className="absolute w-full border-t border-blue-300/30"
                            style={{ top: `${(i + 1) * 11}%` }}
                        />
                    ))}
                    {/* Vertical curved lines */}
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={`v-${i}`}
                            className="absolute h-full border-l border-blue-300/30 rounded-full"
                            style={{ left: `${(i + 1) * 14}%` }}
                        />
                    ))}
                    {/* Globe highlight */}
                    <div className="absolute top-[10%] left-[15%] w-[40%] h-[40%] rounded-full bg-white/20 blur-2xl" />
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-2 sm:px-6 relative z-10 w-full">
                {/* Top badge */}
                <p className="mt-20 text-[10px] tracking-[0.3em] text-gray-500 mb-6 uppercase">
                    ● API Infrastructure for Modern SaaS ●
                </p>

                {/* Main heading */}
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold leading-tight text-gray-900 uppercase tracking-tight">
                    The Infrastructure
                    <br />
                    <span className="text-blue-600">For Modern APIs.</span>
                </h1>

                <div className="mt-6 relative z-10 flex justify-center">
                </div>


                {/* Subtext */}
                <div className="h-32">
                    <p className="font-vend text-[19px] text-black max-w-3xl mx-auto bg-white/20 backdrop-blur-3xl">
                        Design, secure, and deploy scalable API endpoints — without exposing
                        your core logic.
                    </p>
                </div>

                {/* Glass card */}
                <div className="relative max-w-2xl mx-auto p-4 sm:p-8
backdrop-blur-sm
border border-white/10
rounded-sm">
                    <p className="text-gray-800">
                        Buildr is the control layer behind modern SaaS platforms. It
                        validates requests, enforces policies, and governs deployment —
                        turning fragile endpoints into production-grade infrastructure.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8">
                    <button className="px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-lg cursor-pointer">
                        Request Access
                    </button>
                    <button className="px-8 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 hover:bg-gray-100 transition cursor-pointer">
                        View Documentation
                    </button>
                </div>
            </div>

            {/* Terminal preview box */}
            <div className="relative z-10 w-full max-w-4xl mx-auto mt-10 sm:mt-16 px-2 sm:px-6">
                <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                    {/* Top bar */}
                    <div className="px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            {/* Window dots */}
                            <div className="flex gap-1.5">
                                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
                                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400" />
                                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
                            </div>
                            <span className="font-mono text-xs sm:text-sm text-gray-600 ml-2">
                                DEVELOPER_PROFILE::/api/V1
                            </span>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <button
                                onClick={() => setActiveTab('input')}
                                className={`px-4 py-1.5 text-sm font-medium border border-gray-300 rounded-md transition cursor-pointer ${activeTab === 'input' ? 'bg-gray-900 text-white border-gray-900' : 'hover:bg-gray-50'}`}
                            >
                                REQUEST
                            </button>
                            <button
                                onClick={() => setActiveTab('output')}
                                className={`px-4 py-1.5 text-sm font-medium border border-gray-300 rounded-md transition cursor-pointer ${activeTab === 'output' ? 'bg-gray-900 text-white border-gray-900' : 'hover:bg-gray-50'}`}
                            >
                                RESPONSE
                            </button>
                        </div>
                    </div>

                    {/* Code content */}
                    <div className="px-4 sm:px-8 py-6 sm:py-8 text-left font-mono text-xs sm:text-sm leading-relaxed text-gray-800 mb-10 sm:mb-20 overflow-x-auto">
                        {activeTab === 'input' ? (
                            <>
                                <p><span className="text-purple-500">const</span> developer = {'{'}</p>
                                <div className="ml-8 mt-2 space-y-1">
                                    <p>name : <span className="text-green-600">"SAHIL KADAM"</span>,</p>
                                    <p>age : <span className="text-green-600">19</span>,</p>
                                    <p>role : <span className="text-green-600">"Backend Developer"</span>,</p>
                                    <p>location : <span className="text-green-600">"India"</span>,</p>
                                    <p>skills : [</p>
                                    <div className="ml-8 space-y-1">
                                        <p><span className="text-green-600">"React"</span>,</p>
                                        <p><span className="text-green-600">"TypeScript"</span>,</p>
                                        <p><span className="text-green-600">"Node.js"</span>,</p>
                                        <p><span className="text-green-600">"Express"</span>,</p>
                                        <p><span className="text-green-600">"MongoDB"</span></p>
                                    </div>
                                    <p>] ,</p>
                                    <p>contact : <span className="text-green-600">"sahilkadam@gmial.com"</span></p>
                                </div>
                                <p>{'}'};</p>
                            </>
                        ) : (
                            <>
                                <p><span className="text-gray-500">// Response<span className="text-green-600"><span className="ml-4 inline-block px-3 py-1 text-gray-600 border border-green-500 bg-green-300 rounded-md text-sm font-medium">200 OK</span>
                                </span></span></p>
                                <p className="mt-2">{'{'}</p>
                                <div className="ml-8 mt-1 space-y-1">
                                    <p><span className="text-purple-600">"status"</span> : <span className="text-blue-600 font-semibold">200</span>,</p>
                                    <p><span className="text-purple-600">"message"</span> : <span className="text-green-600">"Developer profile loaded successfully"</span>,</p>
                                    <p><span className="text-purple-600">"data"</span> : {'{'}</p>
                                    <div className="ml-8 space-y-1">
                                        <p><span className="text-purple-600">"available"</span> : <span className="text-blue-600 font-semibold">true</span>,</p>
                                        <p><span className="text-purple-600">"experience"</span> : <span className="text-green-600">"0 years"</span>,</p>
                                        <p><span className="text-purple-600">"open_to_work"</span> : <span className="text-blue-600 font-semibold">true</span>,</p>
                                        <p><span className="text-purple-600">"projects_completed"</span> : <span className="text-blue-600 font-semibold">15</span>,</p>
                                        <p><span className="text-purple-600">"github"</span> : <a className="text-green-600" href="https://github.com/sahilkadampng">https://github.com/sahilkadampng</a>,</p>
                                    </div>
                                    <p>{'}'}</p>
                                </div>
                                <p>{'}'}</p>
                            </>
                        )}
                    </div>

                    {/* Bottom status */}
                    <div className="px-4 sm:px-6 py-3 flex justify-end">
                        <span className="text-xs tracking-[0.2em] text-gray-500 uppercase flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
                            {activeTab === 'input' ? 'Ready to Deploy' : 'Profile Active'}
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-12 my-12 h-px w-full bg-linear-to-r from-transparent via-gray-400 to-transparent" />
        </section>
    );
}
