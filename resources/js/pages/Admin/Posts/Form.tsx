import AdminLayout from '@/components/AdminLayout';
import { Post } from '@/types/models';
import { useForm } from '@inertiajs/react';
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
        published_at: post?.published_at || '',
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
            <div className="max-w-4xl">
                <h1 className="mb-8 text-3xl font-light">
                    {post ? 'Edit Post' : 'Create Post'}
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-lg bg-white p-8 shadow"
                >
                    <div>
                        <label className="mb-2 block text-sm font-light">
                            Title
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
                            className="w-full border border-gray-200 px-4 py-2 transition focus:border-gray-900 focus:outline-none"
                        />
                        {errors.title && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-light">
                            Slug
                        </label>
                        <input
                            type="text"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            className="w-full border border-gray-200 px-4 py-2 transition focus:border-gray-900 focus:outline-none"
                        />
                        {errors.slug && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.slug}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-light">
                            Excerpt
                        </label>
                        <textarea
                            value={data.excerpt}
                            onChange={(e) => setData('excerpt', e.target.value)}
                            rows={3}
                            className="w-full resize-none border border-gray-200 px-4 py-2 transition focus:border-gray-900 focus:outline-none"
                        />
                        {errors.excerpt && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.excerpt}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-light">
                            Content
                        </label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            rows={12}
                            className="w-full resize-none border border-gray-200 px-4 py-2 transition focus:border-gray-900 focus:outline-none"
                        />
                        {errors.content && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.content}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-light">
                            Featured Image URL
                        </label>
                        <input
                            type="text"
                            value={data.featured_image}
                            onChange={(e) =>
                                setData('featured_image', e.target.value)
                            }
                            className="w-full border border-gray-200 px-4 py-2 transition focus:border-gray-900 focus:outline-none"
                        />
                        {errors.featured_image && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.featured_image}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-light">
                            Publish Date (leave empty for draft)
                        </label>
                        <input
                            type="datetime-local"
                            value={data.published_at}
                            onChange={(e) =>
                                setData('published_at', e.target.value)
                            }
                            className="w-full border border-gray-200 px-4 py-2 transition focus:border-gray-900 focus:outline-none"
                        />
                        {errors.published_at && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.published_at}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-gray-900 px-6 py-2 font-light text-white transition hover:bg-gray-800 disabled:opacity-50"
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
