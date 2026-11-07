import { useTheme } from '@/Contexts/ThemeContext';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6';

const NAV_ITEMS = [
    { href: '/', label: 'Home', match: (url: string) => url === '/' },
    {
        href: '/about',
        label: 'About',
        match: (url: string) => url.startsWith('/about'),
    },
    {
        href: '/projects',
        label: 'Projects',
        match: (url: string) => url.startsWith('/projects'),
    },
    {
        href: '/posts',
        label: 'Blog',
        match: (url: string) =>
            url.startsWith('/posts') || url.startsWith('/post/'),
    },
    {
        href: '/contact',
        label: 'Contact',
        match: (url: string) => url.startsWith('/contact'),
    },
] as const;

const SOCIALS = [
    {
        href: 'https://github.com/syaafiudinm',
        label: 'GitHub',
        icon: FaGithub,
    },
    {
        href: 'https://www.linkedin.com/in/andi-syafiudin-musafir-a3b85a287/',
        label: 'LinkedIn',
        icon: FaLinkedin,
    },
    {
        href: 'https://instagram.com/syaafiudinm',
        label: 'Instagram',
        icon: FaInstagram,
    },
    {
        href: 'mailto:altafpasallo12@gmail.com',
        label: 'Email',
        icon: FaEnvelope,
    },
] as const;

export default function Layout({ children }: { children: React.ReactNode }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const { url } = usePage();
    const { isDark, toggleTheme } = useTheme();
    const path = url.split('?')[0];
    // The site name is the page heading on the home page only.
    const NameTag = path === '/' ? 'h1' : 'p';

    useEffect(() => {
        setMenuOpen(false);
    }, [url]);

    useEffect(() => {
        if (!menuOpen) return;
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMenuOpen(false);
        };
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    return (
        <div className="min-h-screen bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[400] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-blue-700 focus:shadow"
            >
                Skip to content
            </a>

            {/* ── Menu button ── */}
            <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="fixed top-3 right-3 z-[100] flex cursor-pointer items-center gap-2 border-2 border-gray-900 bg-white px-4 py-2 text-base font-semibold shadow-[3px_3px_0_var(--color-gray-900)] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_var(--color-gray-900)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none md:top-4 md:right-4 dark:border-gray-100 dark:bg-gray-950 dark:shadow-[3px_3px_0_var(--color-gray-100)] dark:hover:shadow-[1px_1px_0_var(--color-gray-100)]"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="site-drawer"
            >
                <Menu className="h-5 w-5" />
                <span>Menu</span>
            </button>

            {/* ── Drawer ── */}
            <div
                className={`fixed inset-0 z-[200] bg-black/50 transition-all duration-300 ${
                    menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
                }`}
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
            />
            <aside
                id="site-drawer"
                className={`fixed top-0 right-0 bottom-0 z-[300] flex w-[280px] flex-col border-l-2 border-gray-900 bg-white p-6 transition-transform duration-300 ease-out dark:border-gray-100 dark:bg-gray-950 ${
                    menuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                aria-label="Site menu"
                inert={!menuOpen || undefined}
            >
                <div className="mb-8 flex justify-end">
                    <button
                        type="button"
                        onClick={() => setMenuOpen(false)}
                        className="flex cursor-pointer items-center gap-2 text-base text-gray-900 hover:text-blue-500 dark:text-gray-100"
                        aria-label="Close menu"
                    >
                        <X className="h-5 w-5" />
                        <span>Close</span>
                    </button>
                </div>

                <nav className="flex flex-col" aria-label="Main navigation">
                    {NAV_ITEMS.map((item) => {
                        const active = item.match(path);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`py-2 text-2xl transition-colors hover:text-blue-500 ${
                                    active
                                        ? 'text-blue-500'
                                        : 'text-gray-900 dark:text-gray-100'
                                }`}
                                aria-current={active ? 'page' : undefined}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <button
                    type="button"
                    onClick={toggleTheme}
                    className="mt-auto flex cursor-pointer items-center gap-2 text-base text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                    {isDark ? (
                        <Sun className="h-4 w-4" />
                    ) : (
                        <Moon className="h-4 w-4" />
                    )}
                    <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
                </button>
            </aside>

            <div className="mx-auto max-w-2xl px-4 py-10 md:py-16">
                <div className="flex flex-col space-y-8">
                    {/* ── Header ── */}
                    <header className="flex flex-col items-start gap-4">
                        <Link
                            href="/"
                            className="flex flex-row items-center gap-4"
                        >
                            <span className="h-20 min-h-20 w-20 min-w-20 shrink-0 overflow-hidden rounded-full md:h-24 md:min-h-24 md:w-24 md:min-w-24">
                                <img
                                    src="/profil.png"
                                    alt="Andi Syafiudin Musafir profile picture"
                                    className="h-full w-full object-cover"
                                />
                            </span>
                            <NameTag className="text-2xl leading-tight font-bold">
                                Andi Syafiudin Musafir
                            </NameTag>
                        </Link>
                        <hr className="w-full border-t border-gray-200 dark:border-gray-800" />
                    </header>

                    <main
                        id="main-content"
                        className="animate-page-enter flex flex-col space-y-8"
                    >
                        {children}
                    </main>

                    <hr className="w-full border-t border-gray-200 dark:border-gray-800" />

                    {/* ── Footer ── */}
                    <footer className="flex flex-col items-center gap-5 pt-8">
                        <div className="grid w-full max-w-xs grid-cols-4 justify-items-center gap-4">
                            {SOCIALS.map(({ href, label, icon: Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={
                                        href.startsWith('http')
                                            ? '_blank'
                                            : undefined
                                    }
                                    rel={
                                        href.startsWith('http')
                                            ? 'noopener noreferrer'
                                            : undefined
                                    }
                                    aria-label={label}
                                    className="text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                                >
                                    <Icon className="h-6 w-6" />
                                </a>
                            ))}
                        </div>
                        <p className="text-center text-base text-gray-500 dark:text-gray-400">
                            &copy; {new Date().getFullYear()} Andi Syafiudin
                            Musafir, All Rights Reserved
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
}
