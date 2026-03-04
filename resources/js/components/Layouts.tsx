import { useTheme } from '@/Contexts/ThemeContext';
import { Link, usePage } from '@inertiajs/react';
import { ArrowUp, Mail, Menu, Moon, Sun, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const NAV_ITEMS = [
    { href: '/', label: 'Home', match: (url: string) => url === '/' },
    {
        href: '/about',
        label: 'About',
        match: (url: string) => url.startsWith('/about'),
    },
    {
        href: '/posts',
        label: 'Blog',
        match: (url: string) =>
            url.startsWith('/posts') || url.startsWith('/post'),
    },
    {
        href: '/projects',
        label: 'Projects',
        match: (url: string) => url.startsWith('/projects'),
    },
] as const;

export default function Layout({ children }: { children: React.ReactNode }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const { url } = usePage();
    const { isDark, toggleTheme } = useTheme();
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    const isActive = useCallback(
        (path: string) => {
            const item = NAV_ITEMS.find((n) => n.href === path);
            return item ? item.match(url) : false;
        },
        [url],
    );

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [url]);

    // Close mobile menu on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [mobileMenuOpen]);

    // Close mobile menu on outside click
    useEffect(() => {
        if (!mobileMenuOpen) return;

        const handleClick = (e: MouseEvent) => {
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(e.target as Node)
            ) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [mobileMenuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    // Show back to top button on scroll
    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="flex min-h-screen flex-col bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
            {/* Skip to content link for accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-gray-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:outline-none dark:focus:bg-gray-100 dark:focus:text-gray-900"
            >
                Skip to content
            </a>

            {/* Header */}
            <header
                className="fixed top-4 right-0 left-0 z-50 px-6"
                role="banner"
            >
                <div className="flex items-center justify-end gap-3 md:justify-center">
                    {/* Theme Toggle — icon shows what you switch TO */}
                    <button
                        onClick={toggleTheme}
                        className="rounded-full border border-gray-200 bg-white/80 p-2.5 backdrop-blur-md transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800/80 dark:hover:bg-gray-700"
                        aria-label={
                            isDark
                                ? 'Switch to light mode'
                                : 'Switch to dark mode'
                        }
                        type="button"
                    >
                        {isDark ? (
                            <Sun className="h-4 w-4 text-yellow-400" />
                        ) : (
                            <Moon className="h-4 w-4 text-gray-500" />
                        )}
                    </button>

                    {/* Navigation */}
                    <div className="relative" ref={mobileMenuRef}>
                        <nav
                            className="inline-flex w-auto rounded-full border border-gray-200 bg-white/80 px-6 py-3 backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/80"
                            role="navigation"
                            aria-label="Main navigation"
                        >
                            {/* Desktop Menu */}
                            <div className="hidden items-center gap-10 md:flex">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`nav-link text-sm font-light transition hover:text-gray-600 dark:hover:text-gray-300 ${
                                            isActive(item.href) ? 'active' : ''
                                        }`}
                                        aria-current={
                                            isActive(item.href)
                                                ? 'page'
                                                : undefined
                                        }
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="flex items-center gap-2 text-sm font-light transition md:hidden"
                                aria-expanded={mobileMenuOpen}
                                aria-controls="mobile-menu"
                                aria-label={
                                    mobileMenuOpen ? 'Close menu' : 'Open menu'
                                }
                                type="button"
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
                            id="mobile-menu"
                            className={`absolute top-full right-0 mt-3 w-64 origin-top-right rounded-2xl border border-gray-200 bg-white p-5 shadow-xl transition-all duration-200 ease-out md:hidden dark:border-gray-700 dark:bg-gray-800 ${
                                mobileMenuOpen
                                    ? 'translate-y-0 scale-100 opacity-100'
                                    : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
                            }`}
                            role="menu"
                            aria-hidden={!mobileMenuOpen}
                        >
                            <div className="mb-3 text-xs font-medium tracking-wider text-gray-400 uppercase dark:text-gray-500">
                                Navigation
                            </div>
                            <div className="space-y-1">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`block rounded-lg px-3 py-2 text-sm font-light transition hover:bg-gray-50 dark:hover:bg-gray-700 ${
                                            isActive(item.href)
                                                ? 'bg-gray-50 font-normal text-gray-900 dark:bg-gray-700 dark:text-gray-100'
                                                : 'text-gray-600 dark:text-gray-300'
                                        }`}
                                        onClick={() => setMobileMenuOpen(false)}
                                        role="menuitem"
                                        aria-current={
                                            isActive(item.href)
                                                ? 'page'
                                                : undefined
                                        }
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="animate-page-enter flex-1">
                <main
                    id="main-content"
                    className="mx-auto max-w-6xl px-6 pt-24 pb-12"
                    role="main"
                >
                    {children}
                </main>
            </div>

            {/* Back to Top */}
            <button
                onClick={scrollToTop}
                className={`fixed right-6 bottom-6 z-40 rounded-full border border-gray-200 bg-white/80 p-2.5 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800/80 dark:hover:bg-gray-700 ${
                    showBackToTop
                        ? 'translate-y-0 opacity-100'
                        : 'pointer-events-none translate-y-4 opacity-0'
                }`}
                aria-label="Back to top"
                type="button"
            >
                <ArrowUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>

            {/* Footer */}
            <footer
                className="mt-auto border-t border-gray-100 dark:border-gray-800"
                role="contentinfo"
            >
                <div className="mx-auto max-w-6xl px-6 py-12">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {/* Brand */}
                        <div>
                            <p className="mb-2 text-sm font-normal text-gray-900 dark:text-gray-100">
                                Syaafiudinm
                            </p>
                            <p className="mb-4 text-xs leading-relaxed font-light text-gray-400 dark:text-gray-500">
                                Building beautiful and functional web
                                experiences with Laravel & React.
                            </p>
                            <a
                                href="mailto:altafpasallo12@gmail.com"
                                className="inline-flex items-center gap-1.5 text-xs font-light text-gray-400 transition hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-100"
                            >
                                <Mail className="h-3 w-3" />
                                <span>altafpasallo12@gmail.com</span>
                            </a>
                        </div>

                        {/* Quick Nav */}
                        <div>
                            <p className="mb-3 text-xs font-medium tracking-wider text-gray-400 uppercase dark:text-gray-500">
                                Pages
                            </p>
                            <div className="flex flex-col gap-2">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="text-xs font-light text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Socials */}
                        <div>
                            <p className="mb-3 text-xs font-medium tracking-wider text-gray-400 uppercase dark:text-gray-500">
                                Connect
                            </p>
                            <div className="flex flex-col gap-2">
                                <a
                                    href="https://github.com/syaafiudinm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-light text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                                    aria-label="GitHub profile"
                                >
                                    GitHub
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/andi-syafiudin-musafir-a3b85a287/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-light text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                                    aria-label="LinkedIn profile"
                                >
                                    LinkedIn
                                </a>
                                <a
                                    href="https://instagram.com/syaafiudinm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-light text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                                    aria-label="Instagram profile"
                                >
                                    Instagram
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-6 md:flex-row dark:border-gray-800">
                        <p className="text-xs font-light text-gray-400 dark:text-gray-500">
                            &copy; {new Date().getFullYear()} Syaafiudinm. All
                            rights reserved.
                        </p>
                        <p className="text-xs font-light text-gray-300 dark:text-gray-600">
                            Built with Laravel, React & Tailwind CSS
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
