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

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleImageLoad = useCallback(() => {
        setImageLoaded(true);
    }, []);

    const likesCount = post.likes?.length || 0;
    const commentsCount = post.comments?.length || 0;
    const viewsCount = post.views || 0;
    const readingTime = calculateReadingTime(post.content);

    return (
        <article
            ref={cardRef}
            className="group rounded-2xl border border-gray-300 bg-gray-50/50 p-4 transition-all duration-500 ease-out hover:border-gray-200 dark:border-gray-800 dark:bg-gray-800/30 dark:hover:border-gray-700"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: `${index * 80}ms`,
                transitionProperty: 'opacity, transform',
            }}
        >
            <Link
                href={`/post/${post.slug}`}
                className="block"
                aria-label={`Read article: ${post.title}`}
            >
                {/* Featured Image */}
                {post.featured_image && (
                    <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                        {isVisible && (
                            <img
                                src={post.featured_image}
                                alt={post.title}
                                loading="lazy"
                                decoding="async"
                                onLoad={handleImageLoad}
                                className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.03] ${
                                    imageLoaded ? 'opacity-100' : 'opacity-0'
                                }`}
                            />
                        )}
                        {!imageLoaded && (
                            <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
                        )}
                    </div>
                )}

                {/* Meta row */}
                <div className="mb-2.5 flex items-center gap-3 text-xs font-light text-gray-400 dark:text-gray-500">
                    <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <time dateTime={post.published_at}>
                            {formatDate(post.published_at)}
                        </time>
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{readingTime} min</span>
                    </span>
                </div>

                {/* Title */}
                <h2 className="mb-2 text-lg leading-snug font-normal tracking-tight text-gray-900 transition-colors group-hover:text-gray-600 dark:text-gray-100 dark:group-hover:text-gray-300">
                    {post.title}
                </h2>

                {/* Excerpt */}
                <p className="mb-4 line-clamp-2 text-sm leading-relaxed font-light text-gray-500 dark:text-gray-400">
                    {post.excerpt}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs font-light text-gray-400 dark:text-gray-500">
                    <span
                        className="inline-flex items-center gap-1"
                        aria-label={`${likesCount} likes`}
                    >
                        <Heart className="h-3.5 w-3.5" />
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
                </div>
            </Link>
        </article>
    );
}
