import { Link } from '@inertiajs/react';
import {
    FileText,
    FolderKanban,
    LayoutDashboard,
    LogOut,
    Menu,
    X,
} from 'lucide-react';
import { PropsWithChildren, useState } from 'react';

export default function AdminLayout({ children }: PropsWithChildren) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile menu button */}
            <div className="fixed top-0 right-0 left-0 z-20 border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="rounded-lg p-2 text-gray-900 hover:bg-gray-100"
                >
                    {sidebarOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>

            <div className="flex min-h-screen">
                {/* Overlay */}
                {sidebarOpen && (
                    <div
                        className="bg-opacity-50 fixed inset-0 z-30 bg-black/50 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`fixed inset-y-0 left-0 z-40 flex w-64 transform flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="mt-14 border-b border-gray-200 p-6 lg:mt-0">
                        <Link
                            href="/admin/dashboard"
                            className="text-xl font-light text-gray-900"
                        >
                            Admin Panel
                        </Link>
                    </div>

                    <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
                        <Link
                            href="/admin/dashboard"
                            className="flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-light text-gray-700 transition hover:bg-gray-100"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <LayoutDashboard className="h-5 w-5" />
                            <span>Dashboard</span>
                        </Link>
                        <Link
                            href="/admin/posts"
                            className="flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-light text-gray-700 transition hover:bg-gray-100"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <FileText className="h-5 w-5" />
                            <span>Blog Posts</span>
                        </Link>
                        <Link
                            href="/admin/projects"
                            className="flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-light text-gray-700 transition hover:bg-gray-100"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <FolderKanban className="h-5 w-5" />
                            <span>Projects</span>
                        </Link>
                    </nav>

                    <div className="border-t border-gray-200 p-4">
                        <Link
                            href="/"
                            className="mb-2 flex items-center justify-center rounded-lg px-4 py-3 text-sm font-light text-gray-700 transition hover:bg-gray-100"
                        >
                            View Site
                        </Link>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex w-full items-center justify-center space-x-2 rounded-lg px-4 py-3 text-sm font-light text-red-600 transition hover:bg-red-50"
                        >
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                        </Link>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="w-full min-w-0 flex-1 pt-14 lg:pt-0">
                    <div className="p-4 sm:p-6 lg:p-8">{children}</div>
                </main>
            </div>
        </div>
    );
}
