import Layout from '@/components/Layouts';
import { Post } from '@/types/models';
import { useForm } from '@inertiajs/react';
import { Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface Props {
    post: Post;
    hasLiked: boolean;
}

export default function BlogShow({ post, hasLiked }: Props) {
    const [liked, setLiked] = useState(hasLiked);
    const {
        data,
        setData,
        post: submit,
        processing,
        errors,
        reset,
    } = useForm({
        name: '',
        email: '',
        content: '',
    });

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleLike = () => {
        if (!liked) {
            submit(`/post/${post.id}/like`, {
                onSuccess: () => setLiked(true),
            });
        }
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit(`/post/${post.id}/comment`, {
            onSuccess: () => reset(),
        });
    };

    return (
        <Layout>
            <article className="mx-auto mt-10 max-w-3xl">
                {/* Header */}
                <div className="mb-12">
                    <p className="mb-4 text-sm font-light text-gray-500">
                        {formatDate(post.published_at)}
                    </p>
                    <h1 className="mb-6 text-4xl leading-tight font-light md:text-5xl">
                        {post.title}
                    </h1>

                    {/* Stats & Actions */}
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={handleLike}
                            disabled={liked}
                            className={`flex items-center space-x-2 transition ${
                                liked
                                    ? 'text-red-500'
                                    : 'text-gray-400 hover:text-red-500'
                            }`}
                        >
                            <Heart
                                className={`h-5 w-5 ${liked ? 'fill-current' : ''}`}
                            />
                            <span className="text-sm font-light">
                                {post.likes?.length || 0}
                            </span>
                        </button>
                        <div className="flex items-center space-x-2 text-gray-400">
                            <MessageCircle className="h-5 w-5" />
                            <span className="text-sm font-light">
                                {post.comments?.length || 0}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                {post.featured_image && (
                    <div className="mb-12">
                        <img
                            src={post.featured_image}
                            alt={post.title}
                            className="aspect-video w-full object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <div
                    className="prose prose-lg mb-16 max-w-none text-justify font-light"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Comments Section */}
                <div className="border-t border-gray-200 pt-12">
                    <h2 className="mb-8 text-2xl font-light">
                        Comments ({post.comments?.length || 0})
                    </h2>

                    {/* Comment Form */}
                    <form onSubmit={handleCommentSubmit} className="mb-12">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className="w-full border border-gray-200 px-4 py-3 font-light transition focus:border-gray-900 focus:outline-none"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        className="w-full border border-gray-200 px-4 py-3 font-light transition focus:border-gray-900 focus:outline-none"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <textarea
                                    placeholder="Your comment"
                                    value={data.content}
                                    onChange={(e) =>
                                        setData('content', e.target.value)
                                    }
                                    rows={parseInt('4')}
                                    className="w-full resize-none border border-gray-200 px-4 py-3 font-light transition focus:border-gray-900 focus:outline-none"
                                />
                                {errors.content && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.content}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-gray-900 px-6 py-3 font-light text-white transition hover:bg-gray-800 disabled:opacity-50"
                            >
                                {processing ? 'Posting...' : 'Post Comment'}
                            </button>
                        </div>
                    </form>

                    {/* Comments List */}
                    <div className="space-y-8">
                        {post.comments?.map((comment) => (
                            <div
                                key={comment.id}
                                className="border-b border-gray-100 pb-8"
                            >
                                <div className="mb-3 flex items-center justify-between">
                                    <p className="font-light">{comment.name}</p>
                                    <p className="text-xs font-light text-gray-500">
                                        {formatDate(comment.created_at)}
                                    </p>
                                </div>
                                <p className="font-light text-gray-700">
                                    {comment.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Social Share */}
                <div className="mt-8 border-t border-gray-200 pt-8">
                    <h3 className="mb-4 text-lg font-light">
                        Share this article
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 rounded-lg border border-gray-200 px-4 py-2 transition hover:bg-gray-50"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                            </svg>
                            <span className="text-sm font-light">Twitter</span>
                        </a>
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 rounded-lg border border-gray-200 px-4 py-2 transition hover:bg-gray-50"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                            </svg>
                            <span className="text-sm font-light">Facebook</span>
                        </a>
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 rounded-lg border border-gray-200 px-4 py-2 transition hover:bg-gray-50"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                            <span className="text-sm font-light">LinkedIn</span>
                        </a>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    window.location.href,
                                );
                                alert('Link copied to clipboard!');
                            }}
                            className="flex items-center space-x-2 rounded-lg border border-gray-200 px-4 py-2 transition hover:bg-gray-50"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>
                            <span className="text-sm font-light">
                                Copy Link
                            </span>
                        </button>
                    </div>
                </div>
            </article>
        </Layout>
    );
}
