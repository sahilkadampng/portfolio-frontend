import { Link } from 'react-router-dom';
import { FaXTwitter, FaGithub, FaLinkedinIn } from 'react-icons/fa6';

const socialLinks = [
    { icon: FaXTwitter, label: 'Twitter / X', href: '#' },
    { icon: FaGithub, label: 'GitHub', href: 'https://github.com/sahilkadampng' },
    { icon: FaLinkedinIn, label: 'LinkedIn', href: '#' },
];

const platformLinks = [
    { label: 'Infrastructure', to: '/infrastructure' },
    { label: 'Solutions', to: '/solutions' },
    { label: 'Docs', to: '/docs' },
    { label: 'Login', to: '/login' },
];

export default function Footer() {
    return (
        <footer className="w-full bg-[#000000]">
            {/* Main footer content */}
            <div className="w-full mx-auto px-0 sm:px-10 md:px-16 pt-12 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4">
                    {/* Left — Connect */}
                    <div className='mt-3'>
                        <ul className="space-y-3">
                            {socialLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="flex items-center gap-2.5 text-sm text-gray-700 hover:text-gray-400 transition font-arimo"
                                    >
                                        <link.icon className="w-4 h-4 text-gray-500" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Center — Status */}
                    <div className="flex flex-col items-start md:items-center">
                        <div className="flex items-center gap-2 mb-2">
                            <a className="text-2xl font-extrabold tracking-[0.15em] text-gray-800 hover:text-[#685AFF] uppercase mt-10" href='#'>
                                RAW
                            </a>
                        </div>
                        <p className="text-xs font-mono text-gray-400 tracking-wide md:text-center">
                            
                        </p>
                    </div>

                    {/* Right — Platform */}
                    <div className="md:text-right">
                        <h4 className="text-xs font-mono tracking-[0.2em] text-gray-400 uppercase mb-5">
                            Platform
                        </h4>
                        <ul className="space-y-2">
                            {platformLinks.map((link, i) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.to}
                                        className={`text-sm transition font-arimo ${i === 0
                                                ? 'text-[#685AFF] hover:text-[#364fc7]'
                                                : 'text-[#685AFF] hover:text-[#364fc7]'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-900">
                <div className="w-full mx-auto px-6 sm:px-10 md:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs font-mono tracking-[0.15em] text-gray-600 uppercase">
                        © 2026 RAW
                    </p>
                    {/* <div className="flex items-center gap-6">
                        <a
                            href="#"
                            className="text-xs font-mono tracking-[0.15em] text-gray-600 uppercase hover:text-gray-700 transition"
                        >
                            Privacy
                        </a>
                        <a
                            href="#"
                            className="text-xs font-mono tracking-[0.15em] text-gray-600 uppercase hover:text-gray-700 transition"
                        >
                            Terms
                        </a>
                    </div> */}
                </div>
            </div>
        </footer>
    );
}
