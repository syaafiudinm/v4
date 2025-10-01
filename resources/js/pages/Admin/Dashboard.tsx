import AdminLayout from '@/components/AdminLayout';
import { Comment, Post } from '@/types/models';
import { Link } from '@inertiajs/react';
import { FileText, FolderKanban, MessageCircle } from 'lucide-react';

interface Props {
    stats: {
        total_posts: number;
        published_posts: number;
        total_projects: number;
        total_comments: number;
        total_likes: number;
    };
    recentPosts: Post[];
    recentComments: (Comment & { post: Post })[];
}

export default function Dashboard({
    stats,
    recentPosts,
    recentComments,
}: Props) {
    return (
        <AdminLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-light text-gray-900">
                        Dashboard
                    </h1>
                    <p className="mt-2 font-light text-gray-600">
                        Welcome to your admin panel
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Total Posts */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-light uppercase tracking-wide text-gray-500">
                                    Total Posts
                                </p>
                                <p className="mt-2 text-4xl font-light text-gray-900">
                                    {stats.total_posts}
                                </p>
                            </div>
                            <div className="rounded-lg bg-gray-100 p-3">
                                <FileText className="h-6 w-6 text-gray-600" />
                            </div>
                        </div>
                    </div>

                    {/* Published Posts */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-light uppercase tracking-wide text-gray-500">
                                    Published
                                </p>
                                <p className="mt-2 text-4xl font-light text-gray-900">
                                    {stats.published_posts}
                                </p>
                            </div>
                            <div className="rounded-lg bg-green-100 p-3">
                                <FileText className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    {/* Total Projects */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-light uppercase tracking-wide text-gray-500">
                                    Projects
                                </p>
                                <p className="mt-2 text-4xl font-light text-gray-900">
                                    {stats.total_projects}
                                </p>
                            </div>
                            <div className="rounded-lg bg-blue-100 p-3">
                                <FolderKanban className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    {/* Total Comments */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-light uppercase tracking-wide text-gray-500">
                                    Comments
                                </p>
                                <p className="mt-2 text-4xl font-light text-gray-900">
                                    {stats.total_comments}
                                </p>
                            </div>
                            <div className="rounded-lg bg-purple-100 p-3">
                                <MessageCircle className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Recent Posts */}
                    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h2 className="text-xl font-light text-gray-900">
                                Recent Posts
                            </h2>
                        </div>
                        <div className="p-6">
                            {recentPosts && recentPosts.length > 0 ? (
                                <div className="space-y-4">
                                    {recentPosts.map((post) => (
                                        <div
                                            key={post.id}
                                            className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                                        >
                                            <Link
                                                href={`/admin/posts/${post.id}/edit`}
                                                className="block font-light text-gray-900 transition hover:text-gray-600"
                                            >
                                                {post.title}
                                            </Link>
                                            <p className="mt-1 text-xs font-light text-gray-500">
                                                {new Date(
                                                    post.created_at,
                                                ).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm font-light text-gray-500">
                                    No posts yet
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Recent Comments */}
                    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h2 className="text-xl font-light text-gray-900">
                                Recent Comments
                            </h2>
                        </div>
                        <div className="p-6">
                            {recentComments && recentComments.length > 0 ? (
                                <div className="space-y-4">
                                    {recentComments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                                        >
                                            <p className="line-clamp-2 text-sm font-light text-gray-900">
                                                {comment.content}
                                            </p>
                                            <div className="mt-2 flex items-center justify-between">
                                                <p className="text-xs font-light text-gray-500">
                                                    by{' '}
                                                    <span className="text-gray-700">
                                                        {comment.name}
                                                    </span>
                                                </p>
                                                <p className="text-xs font-light text-gray-400">
                                                    {new Date(
                                                        comment.created_at,
                                                    ).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                            month: 'short',
                                                            day: 'numeric',
                                                        },
                                                    )}
                                                </p>
                                            </div>
                                            {comment.post && (
                                                <p className="mt-1 text-xs font-light text-gray-400">
                                                    on "{comment.post.title}"
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm font-light text-gray-500">
                                    No comments yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
