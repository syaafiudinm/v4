import BlogCard from '@/components/BlogCard';
import Layout from '@/components/Layouts';
import SeoHead from '@/components/SeoHead';
import { Post } from '@/types/models';
import { Link, useForm, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    Check,
    Copy,
    Eye,
    Facebook,
    Heart,
    Linkedin,
    MessageCircle,
    Twitter,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface Props {
    post: Post;
    hasLiked: boolean;
    relatedPosts?: Post[];
}

export default function BlogShow({ post, hasLiked, relatedPosts }: Props) {
    const [liked, setLiked] = useState(hasLiked);
    const [copied, setCopied] = useState(false);
    const { url: pageUrl } = usePage();
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
                preserveScroll: true,
                onSuccess: () => setLiked(true),
            });
        }
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit(`/post/${post.id}/comment`, {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    // SSR-safe URL
    const currentUrl = useMemo(() => {
        if (typeof window !== 'undefined') {
            return window.location.href;
        }
        return pageUrl;
    }, [pageUrl]);

    const handleCopyLink = () => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(currentUrl);
        }
        setCopied(true);
    };

    // Reset copied state after 2s
    useEffect(() => {
        if (!copied) return;
        const timer = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(timer);
    }, [copied]);

    const stripHtml = (html: string) => {
        if (typeof document !== 'undefined') {
            const tmp = document.createElement('div');
            tmp.innerHTML = html;
            return tmp.textContent || tmp.innerText || '';
        }
        return html.replace(/<[^>]*>/g, '');
    };

    const seoDescription =
        post.excerpt || stripHtml(post.content).slice(0, 160);

    const likesCount = post.likes?.length || 0;
    const commentsCount = post.comments?.length || 0;
    const viewsCount = post.views || 0;

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    };

    return (
        <Layout>
            <SeoHead
                title={post.title}
                description={seoDescription}
                image={post.featured_image}
                url={`/post/${post.slug}`}
                type="article"
                publishedAt={post.published_at}
                updatedAt={post.updated_at}
                keywords={`blog, ${post.title.toLowerCase()}, web development`}
            />

            <article className="mx-auto mt-6 max-w-3xl">
                {/* Back link */}
                <Link
                    href="/posts"
                    className="group mb-8 inline-flex items-center gap-2 text-sm font-light text-gray-400 transition-colors hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-100"
                >
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                    <span>Back to blog</span>
                </Link>

                {/* Header */}
                <header className="mb-10">
                    <time
                        dateTime={post.published_at}
                        className="mb-4 block text-sm font-light text-gray-400 dark:text-gray-500"
                    >
                        {formatDate(post.published_at)}
                    </time>
                    <h1 className="mb-6 text-3xl leading-tight font-light tracking-tight md:text-5xl dark:text-gray-100">
                        {post.title}
                    </h1>

                    {/* Stats & Actions */}
                    <div className="flex items-center gap-5">
                        <button
                            onClick={handleLike}
                            disabled={liked}
                            className={`flex items-center gap-1.5 transition ${
                                liked
                                    ? 'text-red-500'
                                    : 'text-gray-400 hover:text-red-500 dark:text-gray-500'
                            }`}
                            aria-label={
                                liked ? 'Already liked' : 'Like this post'
                            }
                            type="button"
                        >
                            <Heart
                                className={`h-4.5 w-4.5 ${liked ? 'fill-current' : ''}`}
                            />
                            <span className="text-sm font-light">
                                {likesCount}
                            </span>
                        </button>
                        <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
                            <MessageCircle className="h-4.5 w-4.5" />
                            <span className="text-sm font-light">
                                {commentsCount}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
                            <Eye className="h-4.5 w-4.5" />
                            <span className="text-sm font-light">
                                {viewsCount} views
                            </span>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                {post.featured_image && (
                    <div className="mb-12 overflow-hidden rounded-2xl">
                        <img
                            src={post.featured_image}
                            alt={post.title}
                            className="aspect-video w-full object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <div
                    className="prose prose-lg mb-16 max-w-none text-justify font-light dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Social Share */}
                <div className="mb-12 border-t border-gray-100 pt-8 dark:border-gray-800">
                    <h3 className="mb-4 text-base font-light text-gray-900 dark:text-gray-100">
                        Share this article
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        <a
                            href={shareLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-light text-gray-600 transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-100"
                            aria-label="Share on Twitter"
                        >
                            <Twitter className="h-3.5 w-3.5" />
                            <span>Twitter</span>
                        </a>
                        <a
                            href={shareLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-light text-gray-600 transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-100"
                            aria-label="Share on Facebook"
                        >
                            <Facebook className="h-3.5 w-3.5" />
                            <span>Facebook</span>
                        </a>
                        <a
                            href={shareLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-light text-gray-600 transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-100"
                            aria-label="Share on LinkedIn"
                        >
                            <Linkedin className="h-3.5 w-3.5" />
                            <span>LinkedIn</span>
                        </a>
                        <button
                            onClick={handleCopyLink}
                            type="button"
                            className="relative inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-light text-gray-600 transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-100"
                            aria-label="Copy link to clipboard"
                        >
                            {copied ? (
                                <>
                                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                                    <span className="text-emerald-500">
                                        Copied!
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Copy className="h-3.5 w-3.5" />
                                    <span>Copy Link</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="border-t border-gray-100 pt-10 dark:border-gray-800">
                    <h2 className="mb-8 text-xl font-light dark:text-gray-100">
                        Comments{' '}
                        <span className="text-gray-400 dark:text-gray-500">
                            ({commentsCount})
                        </span>
                    </h2>

                    {/* Comment Form */}
                    <form
                        onSubmit={handleCommentSubmit}
                        className="mb-10 rounded-2xl border border-gray-100 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-800/30"
                    >
                        <p className="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
                            Leave a comment
                        </p>
                        <div className="space-y-3">
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-light text-gray-900 transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-gray-500"
                                    />
                                    {errors.name && (
                                        <p className="mt-1.5 text-xs font-light text-red-500">
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
                                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-light text-gray-900 transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-gray-500"
                                    />
                                    {errors.email && (
                                        <p className="mt-1.5 text-xs font-light text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <textarea
                                    placeholder="Write your thoughts..."
                                    value={data.content}
                                    onChange={(e) =>
                                        setData('content', e.target.value)
                                    }
                                    rows={4}
                                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-light text-gray-900 transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-gray-500"
                                />
                                {errors.content && (
                                    <p className="mt-1.5 text-xs font-light text-red-500">
                                        {errors.content}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-light text-white transition hover:bg-gray-800 disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                            >
                                {processing ? 'Posting...' : 'Post Comment'}
                            </button>
                        </div>
                    </form>

                    {/* Comments List */}
                    {commentsCount > 0 ? (
                        <div className="space-y-6">
                            {post.comments?.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="rounded-2xl border border-gray-100 bg-gray-50/50 p-5 dark:border-gray-800 dark:bg-gray-800/30"
                                >
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                                {comment.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <p className="text-sm font-normal text-gray-900 dark:text-gray-100">
                                                {comment.name}
                                            </p>
                                        </div>
                                        <time
                                            dateTime={comment.created_at}
                                            className="text-xs font-light text-gray-400 dark:text-gray-500"
                                        >
                                            {formatDate(comment.created_at)}
                                        </time>
                                    </div>
                                    <p className="text-sm leading-relaxed font-light text-gray-600 dark:text-gray-300">
                                        {comment.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-gray-200 py-12 text-center dark:border-gray-700">
                            <MessageCircle className="mx-auto mb-3 h-6 w-6 text-gray-300 dark:text-gray-600" />
                            <p className="text-sm font-light text-gray-400 dark:text-gray-500">
                                No comments yet. Be the first to share your
                                thoughts!
                            </p>
                        </div>
                    )}
                </div>

                {/* Related Posts */}
                {relatedPosts && relatedPosts.length > 0 && (
                    <div className="mt-12 border-t border-gray-100 pt-10 dark:border-gray-800">
                        <div className="mb-8 flex items-baseline justify-between">
                            <h2 className="text-xl font-light dark:text-gray-100">
                                Related Articles
                            </h2>
                            <Link
                                href="/posts"
                                className="text-sm font-light text-gray-400 transition-colors hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-200"
                            >
                                View all
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {relatedPosts.slice(0, 3).map((related, index) => (
                                <BlogCard
                                    key={related.id}
                                    post={related}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </Layout>
    );
}
