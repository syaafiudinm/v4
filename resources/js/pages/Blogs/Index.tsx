import Layout from '@/components/Layouts';
import { PaginatedData, Post } from '@/types/models';
import { Link } from '@inertiajs/react';
import { Heart, MessageCircle } from 'lucide-react';

interface Props {
    posts: PaginatedData<Post>;
}

export default function BlogIndex({ posts }: Props) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <Layout>
            <div>
                <div className="mb-16">
                    <h1 className="mb-4 text-4xl font-light md:text-5xl">
                        Blog
                    </h1>
                    <p className="text-lg font-light text-gray-600">
                        Thoughts, ideas, and stories
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.data.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group"
                        >
                            {/* Featured Image */}
                            {post.featured_image && (
                                <div className="mb-4 aspect-video overflow-hidden bg-gray-100">
                                    <img
                                        src={post.featured_image}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
                                </div>
                            )}

                            {/* Date */}
                            <p className="mb-2 text-xs font-light text-gray-500">
                                {formatDate(post.published_at)}
                            </p>

                            {/* Title */}
                            <h2 className="mb-2 text-xl font-light transition group-hover:text-gray-600">
                                {post.title}
                            </h2>

                            {/* Excerpt */}
                            <p className="mb-4 line-clamp-2 text-sm font-light text-gray-600">
                                {post.excerpt}
                            </p>

                            {/* Stats */}
                            <div className="flex items-center space-x-4 text-gray-400">
                                <div className="flex items-center space-x-1">
                                    <Heart className="h-4 w-4" />
                                    <span className="text-xs font-light">
                                        {post.likes?.length || 0}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <MessageCircle className="h-4 w-4" />
                                    <span className="text-xs font-light">
                                        {post.comments?.length || 0}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                {posts.links.length > 3 && (
                    <div className="mt-12 flex items-center justify-center space-x-2">
                        {posts.links.map((link, index) =>
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`border px-4 py-2 text-sm font-light transition ${
                                        link.active
                                            ? 'border-gray-900 bg-gray-900 text-white'
                                            : 'border-gray-200 hover:border-gray-900'
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
