import Layout from '@/components/Layouts';
import { PaginatedData, Post } from '@/types/models';
import { Link } from '@inertiajs/react';
import { Calendar, Clock, Heart, MessageCircle, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

interface Props {
    posts: PaginatedData<Post>;
}

export default function BlogIndex({ posts }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const calculateReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const words = content.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return minutes;
    };

    const filteredPosts = useMemo(() => {
        if (!searchTerm) return posts.data;
        return posts.data.filter(
            (post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [posts.data, searchTerm]);

    return (
        <Layout>
            <div>
                <div className="animate-fade-in mb-16">
                    <h1 className="mb-4 text-4xl font-light md:text-5xl">
                        Blog
                    </h1>
                    <p className="text-lg font-light text-gray-600">
                        Thoughts, ideas, and stories · {posts.data.length}{' '}
                        articles
                    </p>
                </div>

                {/* Search */}
                <div className="animate-fade-in-up animation-delay-200 mb-8">
                    <div className="relative">
                        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 py-3 pr-4 pl-12 transition focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map((post, index) => (
                        <Link
                            key={post.id}
                            href={`/post/${post.slug}`}
                            className="group animate-fade-in-up overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-lg"
                            style={{ animationDelay: `${300 + index * 50}ms` }}
                        >
                            <div className="p-6">
                                {/* Date & Reading Time */}
                                <div className="mb-3 flex items-center justify-between text-xs font-light text-gray-500">
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-3 w-3" />
                                        <span>
                                            {formatDate(post.published_at)}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Clock className="h-3 w-3" />
                                        <span>
                                            {calculateReadingTime(post.content)}{' '}
                                            min read
                                        </span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h2 className="mb-3 line-clamp-2 text-xl font-light transition group-hover:text-gray-600">
                                    {post.title}
                                </h2>

                                {/* Excerpt */}
                                <p className="mb-4 line-clamp-3 text-sm font-light text-gray-600">
                                    {post.excerpt}
                                </p>

                                {/* Stats */}
                                <div className="flex items-center space-x-4 border-t border-gray-100 pt-4">
                                    <div className="flex items-center space-x-1 text-gray-400">
                                        <Heart className="h-4 w-4" />
                                        <span className="text-xs font-light">
                                            {post.likes?.length || 0}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-gray-400">
                                        <MessageCircle className="h-4 w-4" />
                                        <span className="text-xs font-light">
                                            {post.comments?.length || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="py-12 text-center">
                        <p className="font-light text-gray-500">
                            No articles found matching your search.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {posts.links.length > 3 && !searchTerm && (
                    <div className="mt-12 flex items-center justify-center space-x-2">
                        {posts.links.map((link, index) =>
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`rounded-lg border px-4 py-2 text-sm font-light transition ${
                                        link.active
                                            ? 'border-gray-900 bg-gray-900 text-white'
                                            : 'border-gray-200 bg-white hover:border-gray-900'
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ) : (
                                <span
                                    key={index}
                                    className="px-4 py-2 text-sm font-light text-gray-400"
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ),
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}
