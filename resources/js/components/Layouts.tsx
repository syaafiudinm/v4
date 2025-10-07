import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { url } = usePage();

    const isActive = (path: string) => {
        if (path === '/') {
            return url === '/';
        }
        return url.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Header */}
            <header className="fixed top-4 right-0 left-0 z-50 px-6">
                <div className="flex justify-end md:justify-center">
                    <div className="relative">
                        <nav className="inline-flex w-auto rounded-full border-2 border-gray-200 bg-white/80 px-8 py-4 backdrop-blur-md">
                            {/* Desktop Menu */}
                            <div className="hidden items-center space-x-12 md:flex">
                                <Link
                                    href="/"
                                    className={`nav-link text-sm font-light transition hover:text-gray-600 ${
                                        isActive('/') ? 'active' : ''
                                    }`}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/about"
                                    className={`nav-link text-sm font-light transition hover:text-gray-600 ${
                                        isActive('/about') ? 'active' : ''
                                    }`}
                                >
                                    About
                                </Link>
                                <Link
                                    href="/posts"
                                    className={`nav-link text-sm font-light transition hover:text-gray-600 ${
                                        isActive('/posts') || isActive('/post')
                                            ? 'active'
                                            : ''
                                    }`}
                                >
                                    Blog
                                </Link>
                                <Link
                                    href="/projects"
                                    className={`nav-link text-sm font-light transition hover:text-gray-600 ${
                                        isActive('/projects') ? 'active' : ''
                                    }`}
                                >
                                    Projects
                                </Link>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="flex items-center space-x-2 text-sm font-light transition md:hidden"
                            >
                                <span>Menu</span>
                                {mobileMenuOpen ? (
                                    <X className="h-4 w-4" />
                                ) : (
                                    <Menu className="h-4 w-4" />
                                )}
                            </button>
                        </nav>

                        {/* Mobile Dropdown Menu */}
                        <div
                            className={`absolute top-full right-0 mt-4 w-72 origin-top-right rounded-2xl border border-gray-200 bg-white p-6 shadow-xl transition-all duration-300 ease-in-out md:hidden ${
                                mobileMenuOpen
                                    ? 'translate-y-0 scale-100 opacity-100'
                                    : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
                            }`}
                        >
                            <div className="mb-4 text-sm font-medium text-gray-500">
                                Navigation
                            </div>
                            <div className="space-y-4">
                                <Link
                                    href="/"
                                    className={`block font-light transition hover:text-gray-600 ${
                                        isActive('/')
                                            ? 'inline-block border-b-2 border-gray-900 pb-1 text-gray-900'
                                            : 'text-gray-900'
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/about"
                                    className={`block font-light transition hover:text-gray-600 ${
                                        isActive('/about')
                                            ? 'inline-block border-b-2 border-gray-900 pb-1 text-gray-900'
                                            : 'text-gray-900'
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    About
                                </Link>
                                <Link
                                    href="/posts"
                                    className={`block font-light transition hover:text-gray-600 ${
                                        isActive('/posts') || isActive('/post')
                                            ? 'inline-block border-b-2 border-gray-900 pb-1 text-gray-900'
                                            : 'text-gray-900'
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Blog
                                </Link>
                                <Link
                                    href="/projects"
                                    className={`block font-light transition hover:text-gray-600 ${
                                        isActive('/projects')
                                            ? 'inline-block border-b-2 border-gray-900 pb-1 text-gray-900'
                                            : 'text-gray-900'
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Projects
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Page Transition Wrapper */}
            <div className="animate-page-enter">
                <main className="mx-auto max-w-6xl px-6 pt-24 pb-12">
                    {children}
                </main>
            </div>

            {/* Footer */}
            <footer className="mt-20 border-t border-gray-200">
                <div className="mx-auto max-w-6xl px-6 py-8">
                    <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                        <p className="text-sm font-light text-gray-500">
                            © 2025 Syaafiudinm. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 transition hover:text-gray-900"
                            >
                                <span className="text-sm font-light">
                                    GitHub
                                </span>
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 transition hover:text-gray-900"
                            >
                                <span className="text-sm font-light">
                                    LinkedIn
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
