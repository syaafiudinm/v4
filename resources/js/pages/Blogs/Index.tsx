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
                {/* ── Header ── */}
                <header className="animate-fade-in mb-12">
                    <div className="mb-4 inline-flex border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A]">
                        <div className="bg-[#FFEE00] px-3 py-1 text-[10px] font-bold tracking-widest text-[#1A1A1A] uppercase">
                            Writing
                        </div>
                    </div>
                    <h1 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl dark:text-[#FAFAF8]">
                        Blog
                    </h1>
                    <div className="mb-3 h-1 w-14 border border-[#1A1A1A] bg-[#FFEE00]" />
                    <p
                        className="text-base text-[#555] dark:text-[#999]"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                        Thoughts, ideas, and stories ·{' '}
                        <strong className="text-[#1A1A1A] dark:text-[#FAFAF8]">
                            {posts.meta?.total ?? posts.data.length}
                        </strong>{' '}
                        articles
                    </p>
                </header>

                {/* ── Search ── */}
                <div className="animate-fade-in-up animation-delay-200 mb-10">
                    <div className="relative max-w-md">
                        <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#888]" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Search articles"
                            className="nb-input pl-10"
                        />
                    </div>
                </div>

                {/* ── Posts Grid ── */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map((post, index) => (
                        <BlogCard key={post.id} post={post} index={index} />
                    ))}
                </div>

                {/* ── Empty State ── */}
                {filteredPosts.length === 0 && (
                    <div className="border-2 border-dashed border-[#1A1A1A] py-16 text-center dark:border-[#444]">
                        <p className="text-sm font-medium text-[#888] dark:text-[#666]">
                            No articles found matching "{searchTerm}"
                        </p>
                    </div>
                )}

                {/* ── Pagination ── */}
                {posts.links.length > 3 && !searchTerm && (
                    <nav
                        className="mt-14 flex items-center justify-center gap-2"
                        aria-label="Blog pagination"
                    >
                        {posts.links.map((link, index) =>
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`border-2 px-4 py-2 text-sm font-bold transition-all duration-150 ${
                                        link.active
                                            ? 'border-[#1A1A1A] bg-[#FFEE00] text-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] dark:border-[#E5E7EB]'
                                            : 'border-[#1A1A1A] bg-[#FAFAF8] text-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none dark:border-[#E5E7EB] dark:bg-[#222] dark:text-[#FAFAF8]'
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
                                    className="px-4 py-2 text-sm font-bold text-[#CCC] dark:text-[#555]"
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
