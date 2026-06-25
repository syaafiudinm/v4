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

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [url]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false);
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [mobileMenuOpen]);

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

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    useEffect(() => {
        const handleScroll = () => setShowBackToTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div className="flex min-h-screen flex-col bg-[#FAFAF8] text-[#1A1A1A] dark:bg-[#1A1A1A] dark:text-[#FAFAF8]">
            {/* Skip link */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded focus:border-2 focus:border-[#1A1A1A] focus:bg-[#FFEE00] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#1A1A1A] focus:outline-none"
            >
                Skip to content
            </a>

            {/* ── Header ── */}
            <header
                className="fixed top-4 right-0 left-0 z-50 px-6"
                role="banner"
            >
                <div className="flex items-center justify-end gap-3 md:justify-center">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="nb-btn nb-btn-ghost p-2.5"
                        aria-label={
                            isDark
                                ? 'Switch to light mode'
                                : 'Switch to dark mode'
                        }
                        type="button"
                    >
                        {isDark ? (
                            <Sun className="h-4 w-4 text-[#FFEE00]" />
                        ) : (
                            <Moon className="h-4 w-4" />
                        )}
                    </button>

                    {/* Desktop Nav */}
                    <div className="relative" ref={mobileMenuRef}>
                        <nav
                            className="inline-flex w-auto border-2 border-[#1A1A1A] bg-[#FAFAF8] px-6 py-3 shadow-[4px_4px_0px_#1A1A1A] dark:border-[#E5E7EB] dark:bg-[#222222] dark:shadow-[4px_4px_0px_#E5E7EB]"
                            role="navigation"
                            aria-label="Main navigation"
                        >
                            {/* Desktop links */}
                            <div className="hidden items-center gap-10 md:flex">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`nav-link text-sm transition-colors hover:text-[#1A1A1A] dark:hover:text-[#FFEE00] ${
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

                            {/* Mobile burger */}
                            <button
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="flex items-center gap-2 text-sm font-medium transition md:hidden"
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

                        {/* Mobile dropdown */}
                        <div
                            id="mobile-menu"
                            className={`absolute top-full right-0 mt-2 w-56 origin-top-right border-2 border-[#1A1A1A] bg-[#FAFAF8] p-4 shadow-[4px_4px_0px_#1A1A1A] transition-all duration-200 ease-out md:hidden dark:border-[#E5E7EB] dark:bg-[#222222] dark:shadow-[4px_4px_0px_#E5E7EB] ${
                                mobileMenuOpen
                                    ? 'translate-y-0 scale-100 opacity-100'
                                    : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
                            }`}
                            role="menu"
                            aria-hidden={!mobileMenuOpen}
                        >
                            <div className="mb-3 text-[10px] font-bold tracking-widest text-[#888] uppercase dark:text-[#666]">
                                Navigation
                            </div>
                            <div className="space-y-0.5">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`block px-3 py-2 text-sm font-medium transition hover:bg-[#FFEE00] hover:text-[#1A1A1A] dark:hover:bg-[#FFEE00] dark:hover:text-[#1A1A1A] ${
                                            isActive(item.href)
                                                ? 'bg-[#FFEE00] text-[#1A1A1A]'
                                                : 'text-[#1A1A1A] dark:text-[#E5E7EB]'
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

            {/* ── Main ── */}
            <div className="animate-page-enter flex-1">
                <main
                    id="main-content"
                    className="mx-auto max-w-6xl px-6 pt-24 pb-12"
                    role="main"
                >
                    {children}
                </main>
            </div>

            {/* ── Back to Top ── */}
            <button
                onClick={scrollToTop}
                className={`nb-btn nb-btn-yellow fixed right-6 bottom-6 z-40 p-2.5 transition-all duration-300 ${
                    showBackToTop
                        ? 'translate-y-0 opacity-100'
                        : 'pointer-events-none translate-y-4 opacity-0'
                }`}
                aria-label="Back to top"
                type="button"
            >
                <ArrowUp className="h-4 w-4" />
            </button>

            {/* ── Footer ── */}
            <footer
                className="mt-auto border-t-2 border-[#1A1A1A] dark:border-[#E5E7EB]"
                role="contentinfo"
            >
                <div className="mx-auto max-w-6xl px-6 py-12">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {/* Brand */}
                        <div>
                            <p className="mb-1 text-xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#FAFAF8]">
                                syaafiudinm
                            </p>
                            <div className="mb-3 h-1 w-12 border border-[#1A1A1A] bg-[#FFEE00]" />
                            <p className="mb-4 text-xs leading-relaxed text-[#555] dark:text-[#999]">
                                Building beautiful and functional web
                                experiences.
                            </p>
                            <a
                                href="mailto:altafpasallo12@gmail.com"
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1A1A1A] underline underline-offset-2 transition-colors hover:text-[#FF4F4F] dark:text-[#E5E7EB] dark:hover:text-[#FFEE00]"
                            >
                                <Mail className="h-3 w-3" />
                                <span>altafpasallo12@gmail.com</span>
                            </a>
                        </div>

                        {/* Quick Nav */}
                        <div>
                            <p className="mb-3 text-[10px] font-bold tracking-widest text-[#888] uppercase dark:text-[#666]">
                                Pages
                            </p>
                            <div className="flex flex-col gap-2">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="text-sm font-medium text-[#1A1A1A] transition-colors hover:text-[#FF4F4F] dark:text-[#E5E7EB] dark:hover:text-[#FFEE00]"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Connect */}
                        <div>
                            <p className="mb-3 text-[10px] font-bold tracking-widest text-[#888] uppercase dark:text-[#666]">
                                Connect
                            </p>
                            <div className="flex flex-col gap-2">
                                {[
                                    {
                                        href: 'https://github.com/syaafiudinm',
                                        label: 'GitHub',
                                    },
                                    {
                                        href: 'https://www.linkedin.com/in/andi-syafiudin-musafir-a3b85a287/',
                                        label: 'LinkedIn',
                                    },
                                    {
                                        href: 'https://instagram.com/syaafiudinm',
                                        label: 'Instagram',
                                    },
                                ].map(({ href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-[#1A1A1A] transition-colors hover:text-[#FF4F4F] dark:text-[#E5E7EB] dark:hover:text-[#FFEE00]"
                                        aria-label={`${label} profile`}
                                    >
                                        {label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-10 flex items-center justify-center border-t-2 border-[#1A1A1A] pt-6 dark:border-[#E5E7EB]">
                        <p className="text-xs font-medium text-[#888] dark:text-[#666]">
                            &copy; {new Date().getFullYear()} Syaafiudinm. All
                            rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
