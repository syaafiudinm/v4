import AdminLayout from '@/components/AdminLayout';
import { Post } from '@/types/models';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Props {
    post?: Post;
}

export default function PostForm({ post }: Props) {
    const {
        data,
        setData,
        post: submit,
        put,
        processing,
        errors,
    } = useForm({
        title: post?.title || '',
        slug: post?.slug || '',
        excerpt: post?.excerpt || '',
        content: post?.content || '',
        featured_image: post?.featured_image || '',
        published_at: post?.published_at ? post.published_at.slice(0, 16) : '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (post) {
            put(`/admin/posts/${post.id}`);
        } else {
            submit('/admin/posts');
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl space-y-6">
                <div className="flex items-center space-x-4">
                    <Link
                        href="/admin/posts"
                        className="rounded-lg p-2 transition hover:bg-gray-100"
                    >
                        <ArrowLeft className="h-5 w-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-light text-gray-900">
                            {post ? 'Edit Post' : 'Create New Post'}
                        </h1>
                        <p className="mt-1 font-light text-gray-600">
                            {post
                                ? 'Update your blog post'
                                : 'Write a new blog post'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        {/* Title */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => {
                                    setData('title', e.target.value);
                                    if (!post)
                                        setData(
                                            'slug',
                                            generateSlug(e.target.value),
                                        );
                                }}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
                                placeholder="Enter post title"
                            />
                            {errors.title && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Slug <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={(e) =>
                                    setData('slug', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm text-gray-900 transition focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
                                placeholder="post-url-slug"
                            />
                            {errors.slug && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.slug}
                                </p>
                            )}
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Excerpt <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={data.excerpt}
                                onChange={(e) =>
                                    setData('excerpt', e.target.value)
                                }
                                rows={3}
                                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
                                placeholder="Brief description of your post"
                            />
                            {errors.excerpt && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.excerpt}
                                </p>
                            )}
                        </div>

                        {/* Content */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Content <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={data.content}
                                onChange={(e) =>
                                    setData('content', e.target.value)
                                }
                                rows={16}
                                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm text-gray-900 transition focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
                                placeholder="Write your post content here (supports HTML)"
                            />
                            {errors.content && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.content}
                                </p>
                            )}
                        </div>

                        {/* Featured Image */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Featured Image URL
                            </label>
                            <input
                                type="text"
                                value={data.featured_image}
                                onChange={(e) =>
                                    setData('featured_image', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
                                placeholder="https://example.com/image.jpg"
                            />
                            {errors.featured_image && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.featured_image}
                                </p>
                            )}
                            {data.featured_image && (
                                <div className="mt-3">
                                    <img
                                        src={data.featured_image}
                                        alt="Preview"
                                        className="h-48 w-full rounded-lg border border-gray-200 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle"%3EImage not found%3C/text%3E%3C/svg%3E';
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Publish Date */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Publish Date
                            </label>
                            <input
                                type="datetime-local"
                                value={data.published_at}
                                onChange={(e) =>
                                    setData('published_at', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Leave empty to save as draft
                            </p>
                            {errors.published_at && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.published_at}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <Link
                            href="/admin/posts"
                            className="rounded-lg px-4 py-2 font-light text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-gray-900 px-6 py-2 font-light text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing
                                ? 'Saving...'
                                : post
                                  ? 'Update Post'
                                  : 'Create Post'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
