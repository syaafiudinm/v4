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
                {/* ── Back link ── */}
                <Link
                    href="/posts"
                    className="group mb-8 inline-flex items-center gap-2 border-2 border-[#1A1A1A] bg-[#FAFAF8] px-3 py-1.5 text-sm font-bold shadow-[2px_2px_0px_#1A1A1A] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none dark:border-[#E5E7EB] dark:bg-[#222] dark:text-[#FAFAF8] dark:shadow-[2px_2px_0px_#E5E7EB]"
                >
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                    <span>Back to blog</span>
                </Link>

                {/* ── Header ── */}
                <header className="mb-10">
                    <time
                        dateTime={post.published_at}
                        className="mb-4 block text-sm font-medium text-[#888] dark:text-[#666]"
                    >
                        {formatDate(post.published_at)}
                    </time>
                    <h1 className="mb-6 text-3xl leading-tight font-bold tracking-tight md:text-5xl dark:text-[#FAFAF8]">
                        {post.title}
                    </h1>
                    <div className="mb-5 h-1 w-16 border border-[#1A1A1A] bg-[#FFEE00]" />

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-5">
                        <button
                            onClick={handleLike}
                            disabled={liked}
                            className={`nb-btn px-3 py-1.5 text-sm ${
                                liked
                                    ? 'border-[#FF4F4F] bg-[#FF4F4F] text-white shadow-[2px_2px_0px_#1A1A1A]'
                                    : 'nb-btn-ghost'
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
                        <div className="flex items-center gap-1.5 text-sm font-medium text-[#888] dark:text-[#666]">
                            <MessageCircle className="h-4 w-4" />
                            <span>{commentsCount}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm font-medium text-[#888] dark:text-[#666]">
                            <Eye className="h-4 w-4" />
                            <span>{viewsCount} views</span>
                        </div>
                    </div>
                </header>

                {/* ── Featured Image ── */}
                {post.featured_image && (
                    <div className="mb-12 overflow-hidden border-2 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] dark:border-[#E5E7EB] dark:shadow-[6px_6px_0px_#E5E7EB]">
                        <img
                            src={post.featured_image}
                            alt={post.title}
                            className="aspect-video w-full object-cover"
                        />
                    </div>
                )}

                {/* ── Content ── */}
                <div
                    className="prose prose-lg mb-16 max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* ── Social Share ── */}
                <div className="mb-12 border-t-2 border-[#1A1A1A] pt-8 dark:border-[#E5E7EB]">
                    <h3 className="mb-4 text-base font-bold text-[#1A1A1A] dark:text-[#FAFAF8]">
                        Share this article
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {[
                            {
                                href: shareLinks.twitter,
                                icon: <Twitter className="h-3.5 w-3.5" />,
                                label: 'Twitter',
                                bg: 'hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]',
                            },
                            {
                                href: shareLinks.facebook,
                                icon: <Facebook className="h-3.5 w-3.5" />,
                                label: 'Facebook',
                                bg: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
                            },
                            {
                                href: shareLinks.linkedin,
                                icon: <Linkedin className="h-3.5 w-3.5" />,
                                label: 'LinkedIn',
                                bg: 'hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]',
                            },
                        ].map(({ href, icon, label, bg }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`nb-btn nb-btn-ghost px-4 py-2 text-sm ${bg} transition-all`}
                                aria-label={`Share on ${label}`}
                            >
                                {icon}
                                <span>{label}</span>
                            </a>
                        ))}
                        <button
                            onClick={handleCopyLink}
                            type="button"
                            className={`nb-btn nb-btn-ghost px-4 py-2 text-sm ${
                                copied
                                    ? 'border-[#A8FF78] bg-[#A8FF78] text-[#1A1A1A]'
                                    : ''
                            }`}
                            aria-label="Copy link to clipboard"
                        >
                            {copied ? (
                                <>
                                    <Check className="h-3.5 w-3.5" />
                                    <span>Copied!</span>
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

                {/* ── Comments ── */}
                <div className="border-t-2 border-[#1A1A1A] pt-10 dark:border-[#E5E7EB]">
                    <h2 className="mb-8 text-xl font-bold dark:text-[#FAFAF8]">
                        Comments{' '}
                        <span className="text-[#888] dark:text-[#666]">
                            ({commentsCount})
                        </span>
                    </h2>

                    {/* Comment Form */}
                    <form
                        onSubmit={handleCommentSubmit}
                        className="mb-10 border-2 border-[#1A1A1A] bg-[#FFFFF0] p-6 shadow-[4px_4px_0px_#1A1A1A] dark:border-[#E5E7EB] dark:bg-[#222] dark:shadow-[4px_4px_0px_#E5E7EB]"
                    >
                        <p className="mb-4 text-sm font-bold text-[#1A1A1A] dark:text-[#FAFAF8]">
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
                                        className="nb-input"
                                    />
                                    {errors.name && (
                                        <p className="mt-1.5 text-xs font-medium text-[#FF4F4F]">
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
                                        className="nb-input"
                                    />
                                    {errors.email && (
                                        <p className="mt-1.5 text-xs font-medium text-[#FF4F4F]">
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
                                    className="nb-input resize-none"
                                />
                                {errors.content && (
                                    <p className="mt-1.5 text-xs font-medium text-[#FF4F4F]">
                                        {errors.content}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="nb-btn nb-btn-yellow px-5 py-2.5 text-sm disabled:opacity-50"
                            >
                                {processing ? 'Posting...' : 'Post Comment'}
                            </button>
                        </div>
                    </form>

                    {/* Comments List */}
                    {commentsCount > 0 ? (
                        <div className="space-y-4">
                            {post.comments?.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="border-2 border-[#1A1A1A] bg-[#FAFAF8] p-5 shadow-[3px_3px_0px_#1A1A1A] dark:border-[#E5E7EB] dark:bg-[#222] dark:shadow-[3px_3px_0px_#E5E7EB]"
                                >
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-7 w-7 items-center justify-center border-2 border-[#1A1A1A] bg-[#FFEE00] text-xs font-bold text-[#1A1A1A]">
                                                {comment.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#FAFAF8]">
                                                {comment.name}
                                            </p>
                                        </div>
                                        <time
                                            dateTime={comment.created_at}
                                            className="text-xs font-medium text-[#888] dark:text-[#666]"
                                        >
                                            {formatDate(comment.created_at)}
                                        </time>
                                    </div>
                                    <p
                                        className="text-sm leading-relaxed text-[#555] dark:text-[#999]"
                                        style={{
                                            fontFamily:
                                                "'Inter', system-ui, sans-serif",
                                        }}
                                    >
                                        {comment.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="border-2 border-dashed border-[#1A1A1A] py-12 text-center dark:border-[#444]">
                            <MessageCircle className="mx-auto mb-3 h-6 w-6 text-[#CCC] dark:text-[#555]" />
                            <p className="text-sm font-medium text-[#888] dark:text-[#666]">
                                No comments yet. Be the first to share your
                                thoughts!
                            </p>
                        </div>
                    )}
                </div>

                {/* ── Related Posts ── */}
                {relatedPosts && relatedPosts.length > 0 && (
                    <div className="mt-12 border-t-2 border-[#1A1A1A] pt-10 dark:border-[#E5E7EB]">
                        <div className="mb-8 flex items-baseline justify-between">
                            <div>
                                <h2 className="text-xl font-bold dark:text-[#FAFAF8]">
                                    Related Articles
                                </h2>
                                <div className="mt-1 h-1 w-10 border border-[#1A1A1A] bg-[#A8FF78]" />
                            </div>
                            <Link
                                href="/posts"
                                className="text-sm font-bold text-[#1A1A1A] underline underline-offset-2 transition-colors hover:text-[#FF4F4F] dark:text-[#E5E7EB] dark:hover:text-[#FFEE00]"
                            >
                                View all →
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
