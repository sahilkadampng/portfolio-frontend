import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-sm bg-black/40 border-b border-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-4 relative flex items-center justify-between">
                {/* LEFT → LOGO */}
                <Link to="/" className="font-arimo text-xl font-bold text-white">
                    RAW
                </Link>

                {/* CENTER → MENU (desktop) */}
                <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8">
                    <li>
                        <Link to="/about" className="text-white hover:text-gray-500 transition-colors">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/solutions" className="text-white hover:text-gray-500 transition-colors">
                            Solutions
                        </Link>
                    </li>
                    <li>
                        <Link to="/docs" className="text-white hover:text-gray-500 transition-colors">
                            Docs
                        </Link>
                    </li>
                    <li>
                        <Link to="/infrastructure" className="text-white hover:text-gray-500 transition-colors">
                            Infrastructure
                        </Link>
                    </li>
                    <li>
                        <Link to="/Donate" className="text-white hover:text-gray-500 transition-colors">
                            Support
                        </Link>
                    </li>
                </ul>

                {/* RIGHT → LOGIN (desktop) */}
                <div className="hidden md:block">
                    <Link
                        to="/login"
                        className="text-white hover:text-gray-600 transition-colors"
                    >
                        Login
                    </Link>
                </div>

                {/* MOBILE → HAMBURGER */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
                </button>
            </div>

            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="md:hidden bg-white/90 backdrop-blur-sm border-t border-gray-300">
                    <ul className="flex flex-col gap-4 px-6 py-4">
                        <li>
                            <Link to="/about" className="text-black hover:text-gray-600 transition-colors" onClick={() => setMenuOpen(false)}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/solutions" className="text-black hover:text-gray-600 transition-colors" onClick={() => setMenuOpen(false)}>
                                Solutions
                            </Link>
                        </li>
                        <li>
                            <Link to="/docs" className="text-black hover:text-gray-600 transition-colors" onClick={() => setMenuOpen(false)}>
                                Docs
                            </Link>
                        </li>
                        <li>
                            <Link to="/infrastructure" className="text-black hover:text-gray-600 transition-colors" onClick={() => setMenuOpen(false)}>
                                Infrastructure
                            </Link>
                        </li>
                        <li>
                            <Link to="/Donate" className="text-black hover:text-gray-600 transition-colors" onClick={() => setMenuOpen(false)}>
                                Support
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="text-black hover:text-gray-600 transition-colors" onClick={() => setMenuOpen(false)}>
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
