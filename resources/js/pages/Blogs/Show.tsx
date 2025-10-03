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
            </article>
        </Layout>
    );
}
