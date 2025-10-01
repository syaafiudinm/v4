import Layout from '@/components/Layouts';
import { Post, Project } from '@/types/models';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
    recentPosts?: Post[];
    featuredProjects?: Project[];
}

export default function Home({ recentPosts, featuredProjects }: Props) {
    const [displayedText, setDisplayedText] = useState('');
    const fullText = "Hi, I'm Andi Syafiudin Musafir";

    useEffect(() => {
        let currentIndex = 0;
        const intervalId = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setDisplayedText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(intervalId);
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Layout>
            <div>
                {/* Hero Section */}
                <section className="py-20 md:py-32">
                    <h1 className="mb-6 text-4xl font-light leading-tight md:text-7xl">
                        {displayedText}
                    </h1>
                    <p className="mb-8 max-w-2xl text-xl font-light text-gray-600 md:text-2xl">
                        A passionate developer creating beautiful and functional
                        web experiences
                    </p>
                    <Link
                        href="/about"
                        className="inline-flex items-center space-x-2 border-b border-gray-900 pb-1 text-sm font-light transition hover:text-gray-600"
                    >
                        <span>More about me</span>
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </section>

                {/* Featured Projects */}
                <section className="border-t border-gray-200 py-16">
                    <div className="mb-12 flex items-center justify-between">
                        <h2 className="text-3xl font-light">
                            Featured Projects
                        </h2>
                        <Link
                            href="/projects"
                            className="text-sm font-light transition hover:text-gray-600"
                        >
                            View all
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {featuredProjects?.slice(0, 4).map((project) => (
                            <div key={project.id} className="group">
                                <div className="mb-4 aspect-video overflow-hidden bg-gray-100">
                                    <img
                                        src={`/storage/${project.image}`}
                                        alt={project.title}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="mb-2 text-xl font-light transition group-hover:text-gray-600">
                                    {project.title}
                                </h3>
                                <p className="mb-3 text-sm font-light text-gray-600">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags?.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="border border-gray-200 px-2 py-1 text-xs font-light"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Recent Blog Posts */}
                <section className="border-t border-gray-200 py-16">
                    <div className="mb-12 flex items-center justify-between">
                        <h2 className="text-3xl font-light">Recent Posts</h2>
                        <Link
                            href="/post"
                            className="text-sm font-light transition hover:text-gray-600"
                        >
                            View all
                        </Link>
                    </div>

                    <div className="space-y-8">
                        {recentPosts?.slice(0, 3).map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group block border-b border-gray-100 pb-8 last:border-0"
                            >
                                <p className="mb-2 text-xs font-light text-gray-500">
                                    {new Date(
                                        post.published_at,
                                    ).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                                <h3 className="mb-2 text-2xl font-light transition group-hover:text-gray-600">
                                    {post.title}
                                </h3>
                                <p className="font-light text-gray-600">
                                    {post.excerpt}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
}
