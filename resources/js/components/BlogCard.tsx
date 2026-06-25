import { Link } from '@inertiajs/react';
import { Calendar, Clock, Eye, Heart, MessageCircle } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image?: string;
    published_at: string;
    likes?: { id: number }[];
    comments?: { id: number }[];
    views?: number;
}

interface BlogCardProps {
    post: Post;
    index?: number;
}

function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '100px', threshold: 0.1 },
        );
        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    const handleImageLoad = useCallback(() => setImageLoaded(true), []);

    const likesCount = post.likes?.length || 0;
    const commentsCount = post.comments?.length || 0;
    const viewsCount = post.views || 0;
    const readingTime = calculateReadingTime(post.content);

    return (
        <article
            ref={cardRef}
            className="nb-card group flex flex-col overflow-hidden bg-[#FAFAF8] dark:bg-[#222222]"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: `${index * 80}ms`,
                transitionProperty: 'opacity, transform, box-shadow',
                transitionDuration: '400ms',
            }}
        >
            <Link
                href={`/post/${post.slug}`}
                className="flex flex-1 flex-col"
                aria-label={`Read article: ${post.title}`}
            >
                {/* Featured Image */}
                {post.featured_image ? (
                    <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-[#1A1A1A] bg-[#F0F0EE] dark:border-[#E5E7EB] dark:bg-[#333]">
                        {isVisible && (
                            <img
                                src={post.featured_image}
                                alt={post.title}
                                loading="lazy"
                                decoding="async"
                                onLoad={handleImageLoad}
                                className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.04] ${
                                    imageLoaded ? 'opacity-100' : 'opacity-0'
                                }`}
                            />
                        )}
                        {!imageLoaded && (
                            <div className="absolute inset-0 animate-pulse bg-[#E8E8E6] dark:bg-[#333]" />
                        )}
                        {/* Yellow corner accent */}
                        <div className="absolute top-0 right-0 h-6 w-6 border-b-2 border-l-2 border-[#1A1A1A] bg-[#FFEE00]" />
                    </div>
                ) : (
                    /* No-image: yellow accent block */
                    <div className="flex h-20 items-center border-b-2 border-[#1A1A1A] bg-[#FFEE00] dark:border-[#E5E7EB]">
                        <div className="px-4 text-xs font-bold tracking-widest text-[#1A1A1A] uppercase">
                            Article
                        </div>
                    </div>
                )}

                <div className="flex flex-1 flex-col p-5">
                    {/* Meta */}
                    <div className="mb-3 flex items-center gap-3 text-xs font-medium text-[#888] dark:text-[#666]">
                        <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <time dateTime={post.published_at}>
                                {formatDate(post.published_at)}
                            </time>
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{readingTime} min read</span>
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="mb-2 text-lg leading-tight font-bold tracking-tight text-[#1A1A1A] transition-colors group-hover:text-[#FF4F4F] dark:text-[#FAFAF8] dark:group-hover:text-[#FFEE00]">
                        {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p
                        className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-[#555] dark:text-[#999]"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                        {post.excerpt}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 border-t-2 border-dashed border-[#1A1A1A] pt-3 text-xs font-medium text-[#888] dark:border-[#444] dark:text-[#666]">
                        <span
                            className="inline-flex items-center gap-1"
                            aria-label={`${likesCount} likes`}
                        >
                            <Heart className="h-3.5 w-3.5 text-[#FF4F4F]" />
                            <span>{likesCount}</span>
                        </span>
                        <span
                            className="inline-flex items-center gap-1"
                            aria-label={`${commentsCount} comments`}
                        >
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span>{commentsCount}</span>
                        </span>
                        <span
                            className="inline-flex items-center gap-1"
                            aria-label={`${viewsCount} views`}
                        >
                            <Eye className="h-3.5 w-3.5" />
                            <span>{viewsCount}</span>
                        </span>
                        <span className="ml-auto bg-[#1A1A1A] px-2 py-0.5 text-[10px] font-bold tracking-widest text-[#FFEE00] uppercase dark:bg-[#333]">
                            Read →
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}
