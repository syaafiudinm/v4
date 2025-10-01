import { Link } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';

export default function Layout({ children }: PropsWithChildren) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Header */}
            <header className="border-b border-gray-200">
                <nav className="mx-auto max-w-6xl px-6 py-6">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            className="text-xl font-light tracking-wide transition hover:text-gray-600"
                        >
                            syaafiudinm
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden items-center space-x-8 md:flex">
                            <Link
                                href="/"
                                className="text-sm font-light transition hover:text-gray-600"
                            >
                                Home
                            </Link>
                            <Link
                                href="/posts"
                                className="text-sm font-light transition hover:text-gray-600"
                            >
                                Blog
                            </Link>
                            <Link
                                href="/projects"
                                className="text-sm font-light transition hover:text-gray-600"
                            >
                                Projects
                            </Link>
                            <Link
                                href="/about"
                                className="text-sm font-light transition hover:text-gray-600"
                            >
                                About
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-900 md:hidden"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {mobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="mt-6 space-y-4 pb-4 md:hidden">
                            <Link
                                href="/"
                                className="block text-sm font-light transition hover:text-gray-600"
                            >
                                Home
                            </Link>
                            <Link
                                href="/blog"
                                className="block text-sm font-light transition hover:text-gray-600"
                            >
                                Blog
                            </Link>
                            <Link
                                href="/projects"
                                className="block text-sm font-light transition hover:text-gray-600"
                            >
                                Projects
                            </Link>
                            <Link
                                href="/about"
                                className="block text-sm font-light transition hover:text-gray-600"
                            >
                                About
                            </Link>
                        </div>
                    )}
                </nav>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>

            {/* Footer */}
            <footer className="mt-20 border-t border-gray-200">
                <div className="mx-auto max-w-6xl px-6 py-8">
                    <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                        <p className="text-sm font-light text-gray-500">
                            © 2025 syaafiudinm. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a
                                href="https://github.com/syaafiudinm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 transition hover:text-gray-900"
                            >
                                <span className="text-sm font-light">
                                    GitHub
                                </span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/andi-syafiudin-musafir-a3b85a287/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 transition hover:text-gray-900"
                            >
                                <span className="text-sm font-light">
                                    LinkedIn
                                </span>
                            </a>
                            <a
                                href="https://instagram.com/syaafiudinm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 transition hover:text-gray-900"
                            >
                                <span className="text-sm font-light">
                                    Instagram
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
