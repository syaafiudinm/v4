import BlogCard from '@/components/BlogCard';
import Layout from '@/components/Layouts';
import Section, { inputClass } from '@/components/Section';
import SeoHead from '@/components/SeoHead';
import { PaginatedData, Post } from '@/types/models';
import { Link } from '@inertiajs/react';
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

    const total = posts.meta?.total ?? posts.data.length;

    return (
        <Layout>
            <SeoHead
                title="Blog"
                description="Thoughts, ideas, and stories about web development, software engineering, and technology by Andi Syafiudin Musafir."
                keywords="blog, web development, laravel, react, programming, software engineering"
                url="/posts"
                type="website"
            />

            <Section title="Blog" as="h1">
                <p className="text-lg leading-[27px] text-gray-700 dark:text-gray-300">
                    Thoughts, ideas, and stories about{' '}
                    <span className="font-medium text-blue-700 dark:text-blue-400">
                        web development
                    </span>{' '}
                    and software engineering · {total} articles
                </p>

                <input
                    type="search"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search articles"
                    className={inputClass}
                />
            </Section>

            {filteredPosts.length > 0 ? (
                <div className="-my-4 divide-y divide-gray-200 dark:divide-gray-800">
                    {filteredPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <p className="text-base text-gray-500 dark:text-gray-400">
                    {searchTerm
                        ? `No articles found matching "${searchTerm}".`
                        : 'No articles yet.'}
                </p>
            )}

            {posts.links.length > 3 && !searchTerm && (
                <nav
                    className="flex flex-wrap items-center justify-center gap-1"
                    aria-label="Blog pagination"
                >
                    {posts.links.map((link, index) =>
                        link.url ? (
                            <Link
                                key={index}
                                href={link.url}
                                className={`rounded-md px-3 py-1.5 text-base transition-colors ${
                                    link.active
                                        ? 'font-semibold text-blue-700 dark:text-blue-400'
                                        : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                                }`}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                                aria-current={link.active ? 'page' : undefined}
                            />
                        ) : (
                            <span
                                key={index}
                                className="px-3 py-1.5 text-base text-gray-300 dark:text-gray-700"
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        ),
                    )}
                </nav>
            )}
        </Layout>
    );
}
