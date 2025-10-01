import { Link } from '@inertiajs/react';
import { FileText, FolderKanban, LayoutDashboard, LogOut } from 'lucide-react';
import { PropsWithChildren } from 'react';

export default function AdminLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                {/* Sidebar */}
                <aside className="min-h-screen w-64 border-r border-gray-200 bg-white">
                    <div className="p-6">
                        <Link href="/admin" className="text-xl font-light">
                            Admin Panel
                        </Link>
                    </div>

                    <nav className="space-y-2 px-4">
                        <Link
                            href="/admin/dashboard"
                            className="flex items-center space-x-3 rounded px-4 py-3 text-sm font-light transition hover:bg-gray-100"
                        >
                            <LayoutDashboard className="h-5 w-5" />
                            <span>Dashboard</span>
                        </Link>
                        <Link
                            href="/admin/posts"
                            className="flex items-center space-x-3 rounded px-4 py-3 text-sm font-light transition hover:bg-gray-100"
                        >
                            <FileText className="h-5 w-5" />
                            <span>Blog Posts</span>
                        </Link>
                        <Link
                            href="/admin/projects"
                            className="flex items-center space-x-3 rounded px-4 py-3 text-sm font-light transition hover:bg-gray-100"
                        >
                            <FolderKanban className="h-5 w-5" />
                            <span>Projects</span>
                        </Link>
                    </nav>

                    <div className="absolute bottom-0 w-64 p-4">
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex w-full items-center space-x-3 rounded px-4 py-3 text-left text-sm font-light transition hover:bg-gray-100"
                        >
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                        </Link>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">{children}</main>
            </div>
        </div>
    );
}
