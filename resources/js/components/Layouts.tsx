import { useTheme } from '@/Contexts/ThemeContext';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { url } = usePage();
    const { isDark, toggleTheme } = useTheme();

    const isActive = (path: string) => {
        if (path === '/') {
            return url === '/';
        }
        return url.startsWith(path);
    };

    return (
        <div className="flex min-h-screen flex-col bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
            {/* Header */}
            <header className="fixed top-4 right-0 left-0 z-50 px-6">
                <div className="flex items-center justify-end gap-4 md:justify-center">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="rounded-full border-2 border-gray-200 bg-white/80 p-3 backdrop-blur-md transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800/80 dark:hover:bg-gray-800"
                        aria-label="Toggle theme"
                    >
                        {isDark ? (
                            <Moon className="h-5 w-5 text-gray-700" />
                        ) : (
                            <Sun className="h-5 w-5 text-yellow-500" />
                        )}
                    </button>
                    <div className="relative">
                        <nav className="inline-flex w-auto rounded-full border-2 border-gray-200 bg-white/80 px-8 py-4 backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/80">
                            {/* Desktop Menu */}
                            <div className="hidden items-center space-x-12 md:flex">
                                <Link
                                    href="/"
                                    className={`nav-link text-sm font-light transition hover:text-gray-600 dark:hover:text-gray-300 ${
                                        isActive('/') ? 'active' : ''
                                    }`}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/about"
                                    className={`nav-link text-sm font-light transition hover:text-gray-600 dark:hover:text-gray-300 ${
                                        isActive('/about') ? 'active' : ''
                                    }`}
                                >
                                    About
                                </Link>
                                <Link
                                    href="/posts"
                                    className={`nav-link text-sm font-light transition hover:text-gray-600 dark:hover:text-gray-300 ${
                                        isActive('/posts') || isActive('/post')
                                            ? 'active'
                                            : ''
                                    }`}
                                >
                                    Blog
                                </Link>
                                <Link
                                    href="/projects"
                                    className={`nav-link text-sm font-light transition hover:text-gray-600 dark:hover:text-gray-300 ${
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
                            className={`absolute top-full right-0 mt-4 w-72 origin-top-right rounded-2xl border border-gray-200 bg-white p-6 shadow-xl transition-all duration-300 ease-in-out md:hidden dark:border-gray-700 dark:bg-gray-800 ${
                                mobileMenuOpen
                                    ? 'translate-y-0 scale-100 opacity-100'
                                    : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
                            }`}
                        >
                            <div className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                                Navigation
                            </div>
                            <div className="space-y-4">
                                <Link
                                    href="/"
                                    className={`block font-light transition hover:text-gray-600 dark:hover:text-gray-300 ${
                                        isActive('/')
                                            ? 'inline-block border-b-2 border-gray-900 pb-1 dark:border-gray-100'
                                            : ''
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/about"
                                    className={`block font-light transition hover:text-gray-600 dark:hover:text-gray-300 ${
                                        isActive('/about')
                                            ? 'inline-block border-b-2 border-gray-900 pb-1 dark:border-gray-100'
                                            : ''
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    About
                                </Link>
                                <Link
                                    href="/posts"
                                    className={`block font-light transition hover:text-gray-600 dark:hover:text-gray-300 ${
                                        isActive('/posts') || isActive('/post')
                                            ? 'inline-block border-b-2 border-gray-900 pb-1 dark:border-gray-100'
                                            : ''
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Blog
                                </Link>
                                <Link
                                    href="/projects"
                                    className={`block font-light transition hover:text-gray-600 dark:hover:text-gray-300 ${
                                        isActive('/projects')
                                            ? 'inline-block border-b-2 border-gray-900 pb-1 dark:border-gray-100'
                                            : ''
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
            <div className="animate-page-enter flex-1">
                <main className="mx-auto max-w-6xl px-6 pt-24 pb-12">
                    {children}
                </main>
            </div>

            {/* Footer */}
            <footer className="mt-auto border-t border-gray-200 dark:border-gray-700">
                <div className="mx-auto max-w-6xl px-6 py-8">
                    <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            ©{new Date().getFullYear()} Syaafiudinm. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a
                                href="https://github.com/syaafiudinm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            >
                                <span className="text-sm font-light">
                                    GitHub
                                </span>
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
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
