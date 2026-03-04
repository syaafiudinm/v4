import BlogCard from '@/components/BlogCard';
import Layout from '@/components/Layouts';
import SeoHead from '@/components/SeoHead';
import { PaginatedData, Post } from '@/types/models';
import { Link } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

interface Props {
    posts: PaginatedData<Post>;
}

export default function BlogIndex({ posts }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPosts = useMemo(() => {
        if (!searchTerm) return posts.data;
        const term = searchTerm.toLowerCase();
        return posts.data.filter(
            (post) =>
                post.title.toLowerCase().includes(term) ||
                post.excerpt.toLowerCase().includes(term),
        );
    }, [posts.data, searchTerm]);

    return (
        <Layout>
            <SeoHead
                title="Blog"
                description="Thoughts, ideas, and stories about web development, software engineering, and technology by Andi Syafiudin Musafir."
                keywords="blog, web development, laravel, react, programming, software engineering"
                url="/posts"
                type="website"
            />

            <div>
                {/* Header */}
                <header className="animate-fade-in mb-12">
                    <h1 className="mb-3 text-4xl font-light tracking-tight md:text-5xl dark:text-gray-100">
                        Blog
                    </h1>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                        Thoughts, ideas, and stories ·{' '}
                        {posts.meta?.total ?? posts.data.length} articles
                    </p>
                </header>

                {/* Search */}
                <div className="animate-fade-in-up animation-delay-200 mb-10">
                    <div className="relative max-w-md">
                        <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Search articles"
                            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm font-light text-gray-900 transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-gray-500"
                        />
                    </div>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map((post, index) => (
                        <BlogCard key={post.id} post={post} index={index} />
                    ))}
                </div>

                {/* Empty State */}
                {filteredPosts.length === 0 && (
                    <div className="py-16 text-center">
                        <p className="text-sm font-light text-gray-400 dark:text-gray-500">
                            No articles found matching "{searchTerm}"
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {posts.links.length > 3 && !searchTerm && (
                    <nav
                        className="mt-14 flex items-center justify-center gap-1.5"
                        aria-label="Blog pagination"
                    >
                        {posts.links.map((link, index) =>
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`rounded-md px-3.5 py-2 text-sm font-light transition ${
                                        link.active
                                            ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                                            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    aria-current={
                                        link.active ? 'page' : undefined
                                    }
                                />
                            ) : (
                                <span
                                    key={index}
                                    className="px-3.5 py-2 text-sm font-light text-gray-300 dark:text-gray-600"
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ),
                        )}
                    </nav>
                )}
            </div>
        </Layout>
    );
}
