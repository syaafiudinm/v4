import BlogCard from '@/components/BlogCard';
import Layout from '@/components/Layouts';
import Section, { Divider, accentLink, inputClass } from '@/components/Section';
import SeoHead from '@/components/SeoHead';
import { Post } from '@/types/models';
import { Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Heart } from 'lucide-react';
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
    } = useForm({ name: '', email: '', content: '' });

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

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

    const currentUrl = useMemo(() => {
        if (typeof window !== 'undefined') return window.location.href;
        return pageUrl;
    }, [pageUrl]);

    const handleCopyLink = () => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(currentUrl);
        }
        setCopied(true);
    };

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

    const shareItems = [
        { href: shareLinks.twitter, label: 'X / Twitter' },
        { href: shareLinks.facebook, label: 'Facebook' },
        { href: shareLinks.linkedin, label: 'LinkedIn' },
    ];

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

            <article className="flex flex-col gap-8">
                <header className="flex flex-col gap-3">
                    <Link
                        href="/posts"
                        className="group inline-flex items-center gap-1.5 self-start text-base text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                        Back to blog
                    </Link>
                    <h1 className="text-3xl leading-tight font-bold md:text-4xl">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-base text-gray-500 dark:text-gray-400">
                        <time dateTime={post.published_at}>
                            {formatDate(post.published_at)}
                        </time>
                        <span>{viewsCount} views</span>
                        <span>{commentsCount} comments</span>
                        <button
                            onClick={handleLike}
                            disabled={liked}
                            className={`inline-flex items-center gap-1.5 transition-colors ${
                                liked
                                    ? 'text-blue-700 dark:text-blue-400'
                                    : 'cursor-pointer hover:text-blue-700 dark:hover:text-blue-400'
                            }`}
                            aria-label={
                                liked ? 'Already liked' : 'Like this post'
                            }
                            type="button"
                        >
                            <Heart
                                className={`h-4 w-4 ${liked ? 'fill-current' : ''}`}
                            />
                            <span>{likesCount}</span>
                        </button>
                    </div>
                </header>

                {post.featured_image && (
                    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
                        <img
                            src={post.featured_image}
                            alt={post.title}
                            className="aspect-video w-full object-cover"
                        />
                    </div>
                )}

                <div
                    className="prose prose-lg max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-base">
                    <span className="text-gray-500 dark:text-gray-400">
                        Share:
                    </span>
                    {shareItems.map(({ href, label }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={accentLink}
                            aria-label={`Share on ${label}`}
                        >
                            {label}
                        </a>
                    ))}
                    <button
                        onClick={handleCopyLink}
                        type="button"
                        className={`cursor-pointer ${accentLink}`}
                        aria-label="Copy link to clipboard"
                    >
                        {copied ? 'Copied!' : 'Copy link'}
                    </button>
                </div>
            </article>

            <Divider />

            {/* ── Comments ── */}
            <Section title={`Comments (${commentsCount})`}>
                <form
                    onSubmit={handleCommentSubmit}
                    className="flex flex-col gap-3"
                >
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                aria-label="Name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className={inputClass}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                aria-label="Email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                className={inputClass}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <textarea
                            placeholder="Write your thoughts..."
                            aria-label="Comment"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            rows={4}
                            className={`${inputClass} resize-y`}
                        />
                        {errors.content && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                {errors.content}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="cursor-pointer self-start rounded-md bg-gray-900 px-4 py-2 text-base font-semibold text-white transition-colors hover:bg-gray-700 disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
                    >
                        {processing ? 'Posting...' : 'Post comment'}
                    </button>
                </form>

                {commentsCount > 0 ? (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                        {post.comments?.map((comment) => (
                            <li
                                key={comment.id}
                                className="flex flex-col gap-1 py-4"
                            >
                                <div className="flex items-baseline justify-between gap-4">
                                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                                        {comment.name}
                                    </p>
                                    <time
                                        dateTime={comment.created_at}
                                        className="shrink-0 text-sm text-gray-500 dark:text-gray-400"
                                    >
                                        {formatDate(comment.created_at)}
                                    </time>
                                </div>
                                <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                                    {comment.content}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-base text-gray-500 dark:text-gray-400">
                        No comments yet. Be the first to share your thoughts!
                    </p>
                )}
            </Section>

            {/* ── Related Posts ── */}
            {relatedPosts && relatedPosts.length > 0 && (
                <>
                    <Divider />
                    <Section
                        title="Related articles"
                        action={{ href: '/posts', label: 'View all' }}
                    >
                        <div className="-my-4 divide-y divide-gray-200 dark:divide-gray-800">
                            {relatedPosts.slice(0, 3).map((related) => (
                                <BlogCard key={related.id} post={related} />
                            ))}
                        </div>
                    </Section>
                </>
            )}
        </Layout>
    );
}
