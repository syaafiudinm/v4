import { Link } from '@inertiajs/react';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    published_at: string;
}

interface BlogCardProps {
    post: Post;
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
    const words = content
        .replace(/<[^>]*>/g, ' ')
        .trim()
        .split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <article>
            <Link
                href={`/post/${post.slug}`}
                className="group flex flex-col gap-1 py-4"
            >
                <h3 className="text-lg leading-snug font-semibold text-gray-900 transition-colors group-hover:text-blue-700 dark:text-gray-100 dark:group-hover:text-blue-400">
                    {post.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={post.published_at}>
                        {formatDate(post.published_at)}
                    </time>
                    {' · '}
                    {calculateReadingTime(post.content)} min read
                </p>
                {post.excerpt && (
                    <p className="line-clamp-2 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                        {post.excerpt}
                    </p>
                )}
            </Link>
        </article>
    );
}
