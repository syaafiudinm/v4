import { Link } from '@inertiajs/react';
import { FileText, FolderKanban, LayoutDashboard, LogOut } from 'lucide-react';
import { PropsWithChildren } from 'react';

export default function AdminLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex h-screen">
                {/* Sidebar */}
                <aside className="flex w-64 flex-col border-r border-gray-200 bg-white">
                    {/* Logo/Brand */}
                    <div className="border-b border-gray-200 p-6">
                        <Link
                            href="/admin/dashboard"
                            className="text-xl font-light text-gray-900"
                        >
                            Admin Panel
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
                        <Link
                            href="/admin/dashboard"
                            className="flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-light text-gray-700 transition hover:bg-gray-100"
                        >
                            <LayoutDashboard className="h-5 w-5" />
                            <span>Dashboard</span>
                        </Link>
                        <Link
                            href="/admin/posts"
                            className="flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-light text-gray-700 transition hover:bg-gray-100"
                        >
                            <FileText className="h-5 w-5" />
                            <span>Blog Posts</span>
                        </Link>
                        <Link
                            href="/admin/projects"
                            className="flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-light text-gray-700 transition hover:bg-gray-100"
                        >
                            <FolderKanban className="h-5 w-5" />
                            <span>Projects</span>
                        </Link>
                    </nav>

                    {/* Bottom Section */}
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
                <main className="flex-1 overflow-y-auto">
                    <div className="p-8">{children}</div>
                </main>
            </div>
        </div>
    );
}
