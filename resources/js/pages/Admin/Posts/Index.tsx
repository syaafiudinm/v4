import AdminLayout from '@/components/AdminLayout';
import { PaginatedData, Post } from '@/types/models';
import { Link, router } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';

interface Props {
    posts: PaginatedData<Post>;
}

export default function PostsIndex({ posts }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(`/admin/posts/${id}`);
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-light text-gray-900">
                            Blog Posts
                        </h1>
                        <p className="mt-1 font-light text-gray-600">
                            Manage your blog content
                        </p>
                    </div>
                    <Link
                        href="/admin/posts/create"
                        className="flex items-center space-x-2 rounded-lg bg-gray-900 px-4 py-2 font-light text-white transition hover:bg-gray-800"
                    >
                        <Plus className="h-4 w-4" />
                        <span>New Post</span>
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Published
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Engagement
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {posts.data && posts.data.length > 0 ? (
                                    posts.data.map((post) => (
                                        <tr
                                            key={post.id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-light text-gray-900">
                                                    {post.title}
                                                </div>
                                                <div className="text-xs font-light text-gray-500">
                                                    {post.slug}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-1 text-xs font-light ${
                                                        post.published_at
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}
                                                >
                                                    {post.published_at
                                                        ? 'Published'
                                                        : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-light text-gray-500">
                                                {post.published_at
                                                    ? formatDate(
                                                          post.published_at,
                                                      )
                                                    : '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-4 text-xs font-light text-gray-500">
                                                    <span>
                                                        ❤️{' '}
                                                        {post.likes?.length ||
                                                            0}
                                                    </span>
                                                    <span>
                                                        💬{' '}
                                                        {post.comments
                                                            ?.length || 0}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Link
                                                        href={`/admin/posts/${post.id}/edit`}
                                                        className="rounded p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                post.id,
                                                            )
                                                        }
                                                        className="rounded p-2 text-red-600 transition hover:bg-red-50 hover:text-red-900"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-12 text-center font-light text-gray-500"
                                        >
                                            No posts yet. Create your first post
                                            to get started!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {posts.links && posts.links.length > 3 && (
                    <div className="flex items-center justify-center space-x-2">
                        {posts.links.map((link, index) =>
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`rounded border px-4 py-2 text-sm font-light transition ${
                                        link.active
                                            ? 'border-gray-900 bg-gray-900 text-white'
                                            : 'border-gray-200 bg-white hover:border-gray-900'
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ) : (
                                <span
                                    key={index}
                                    className="px-4 py-2 text-sm font-light text-gray-400"
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ),
                        )}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
