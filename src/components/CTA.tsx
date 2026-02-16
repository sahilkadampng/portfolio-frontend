import { useState } from 'react';

export default function CTA() {
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

    const handleSubmit = async () => {
        if (!email) return;
        setSubmitting(true);
        setMessage('');
        try {
            const res = await fetch('http://localhost:5000/api/emails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'cta' }),
            });
            const data = await res.json();
            setMessage(data.message);
            setMessageType(data.status === 'success' ? 'success' : 'error');
            if (data.status === 'success') setEmail('');
        } catch {
            setMessage('Connection failed. Try again later.');
            setMessageType('error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="w-full bg-[#f4f6fb] py-16 md:py-24 px-4 flex items-center justify-center -mt-36">
            <div className="w-full max-w-3xl bg-[#eceef4]/40 rounded-3xl border border-gray-200/60 shadow-sm px-6 sm:px-12 md:px-16 py-14 md:py-20 flex flex-col items-center text-center">
                {/* Heading */}
                <h2 className="font-extrabold text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight text-gray-900 uppercase">
                    build empire
                </h2>
                <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight text-[#3b5bdb] uppercase">
                    With Confidence.
                </h2>

                {/* Subtitle */}
                <p className="mt-5 text-gray-500 text-base sm:text-lg font-arimo max-w-md">
                    Step into your power and build your empire with unwavering confidence.
                </p>

                {/* Feature badges */}
                {/* <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-mono text-gray-700 tracking-wide">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                        Think
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                        Act
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                        Grow
                    </span>
                </div> */}

                {/* Email input + button */}
                <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg">
                    <input
                        type="email"
                        placeholder="Enter work email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 w-full sm:w-auto px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition font-arimo"
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={submitting || !email}
                        className="w-full sm:w-auto px-8 py-3.5 bg-[#3b5bdb] hover:bg-[#364fc7] disabled:bg-gray-300 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer font-arimo whitespace-nowrap flex items-center justify-center gap-2"
                    >
                        {submitting ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Sending...
                            </>
                        ) : (
                            'Get in Touch'
                        )}
                    </button>
                </div>

                {/* Status message */}
                {message && (
                    <p className={`mt-3 text-sm font-arimo ${messageType === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                        {message}
                    </p>
                )}

                {/* Explore link */}
                <a
                    href="#"
                    className="mt-5 text-[#3b5bdb] text-sm font-medium font-arimo hover:underline flex items-center gap-1 transition"
                >
                    Explore Documentation
                    <span className="text-xs">→</span>
                </a>

                {/* Progress stepper */}
                {/* <div className="mt-10 flex items-center justify-center gap-0 w-full max-w-sm">
                    {steps.map((step, i) => (
                        <div key={step.key} className="flex items-center">
                            <div className="flex flex-col items-center">
                                <span
                                    className={`w-2.5 h-2.5 rounded-full ${i <= activeStep ? 'bg-[#3b5bdb]' : 'bg-gray-300'
                                        }`}
                                />
                                <span
                                    className={`mt-2 text-[10px] sm:text-xs font-mono tracking-wider whitespace-nowrap ${i <= activeStep ? 'text-gray-800' : 'text-gray-400'
                                        }`}
                                >
                                    {step.label}
                                </span>
                            </div>
                            {i < steps.length - 1 && (
                                <div
                                    className={`w-12 sm:w-16 h-px mx-1 -mt-4.5 ${i < activeStep ? 'bg-[#3b5bdb]' : 'bg-gray-300'
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div> */}

                {/* Bottom text */}
                {/* <p className="mt-8 text-gray-500 text-sm font-arimo">
                    Start shipping production-grade endpoints today.
                </p> */}
            </div>
        </section>
    );
}
