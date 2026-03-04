import BlogCard from '@/components/BlogCard';
import Layout from '@/components/Layouts';
import ProjectCard from '@/components/ProjectCard';
import SeoHead from '@/components/SeoHead';
import { Post, Project } from '@/types/models';
import { Link } from '@inertiajs/react';
import { ArrowRight, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Props {
    recentPosts?: Post[];
    featuredProjects?: Project[];
}

function useMultiLineTypewriter(
    lines: string[],
    speed = 70,
    pauseBetween = 400,
) {
    const [completedLines, setCompletedLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState('');
    const [isFinished, setIsFinished] = useState(false);
    const lineIndexRef = useRef(0);
    const charIndexRef = useRef(0);

    useEffect(() => {
        lineIndexRef.current = 0;
        charIndexRef.current = 0;
        setCompletedLines([]);
        setCurrentLine('');
        setIsFinished(false);

        let timeout: ReturnType<typeof setTimeout>;

        const tick = () => {
            const li = lineIndexRef.current;
            const ci = charIndexRef.current;

            if (li >= lines.length) {
                setIsFinished(true);
                return;
            }

            const fullLine = lines[li];

            if (ci <= fullLine.length) {
                setCurrentLine(fullLine.slice(0, ci));
                charIndexRef.current++;
                timeout = setTimeout(tick, speed);
            } else {
                setCompletedLines((prev) => [...prev, fullLine]);
                setCurrentLine('');
                lineIndexRef.current++;
                charIndexRef.current = 0;
                timeout = setTimeout(tick, pauseBetween);
            }
        };

        timeout = setTimeout(tick, speed);

        return () => clearTimeout(timeout);
    }, [lines, speed, pauseBetween]);

    return { completedLines, currentLine, isFinished };
}

function useSectionVisible(rootMargin = '50px') {
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin, threshold: 0.1 },
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [rootMargin]);

    return { ref, isVisible };
}

const TYPEWRITER_LINES = ["Hi, I'm Andi Syafiudin Musafir"];

export default function Home({ recentPosts, featuredProjects }: Props) {
    const { completedLines, currentLine, isFinished } =
        useMultiLineTypewriter(TYPEWRITER_LINES);
    const projectsSection = useSectionVisible();
    const postsSection = useSectionVisible();
    const ctaSection = useSectionVisible();

    return (
        <Layout>
            <SeoHead
                title="Home"
                description="Andi Syafiudin Musafir — A passionate Software Engineer creating beautiful and functional web experiences. Specializing in Laravel, React, and modern web technologies."
                keywords="andi syafiudin musafir, web developer, software engineer, laravel, react, portfolio"
                url="/"
                type="website"
            />

            <div>
                {/* Hero Section */}
                <section className="animate-fade-in py-16 md:py-28">
                    {/* Typewriter */}
                    <h1 className="mb-4 text-4xl leading-tight font-light tracking-tight md:text-6xl dark:text-white">
                        {completedLines.map((line, i) => (
                            <span key={i} className="block">
                                {line}
                            </span>
                        ))}
                        {!isFinished && (
                            <span className="block">
                                {currentLine}
                                <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-gray-900 dark:bg-gray-100">
                                    &nbsp;
                                </span>
                            </span>
                        )}
                    </h1>

                    <p className="mb-8 max-w-xl text-lg leading-relaxed font-light text-gray-500 md:text-xl dark:text-gray-400">
                        A passionate engineer creating beautiful and functional
                        web experiences
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <Link
                            href="/about"
                            className="group inline-flex items-center gap-2 text-sm font-light text-gray-900 transition-colors hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-400"
                        >
                            <span className="border-b border-gray-900 pb-0.5 dark:border-gray-300">
                                More about me
                            </span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <a
                            href="mailto:altafpasallo12@gmail.com"
                            className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-light text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                        >
                            <Mail className="h-3.5 w-3.5" />
                            <span>Get in touch</span>
                        </a>
                    </div>
                </section>

                {/* Featured Projects */}
                <section
                    ref={projectsSection.ref as React.RefObject<HTMLElement>}
                    className="border-t border-gray-100 py-16 dark:border-gray-800"
                    style={{
                        opacity: projectsSection.isVisible ? 1 : 0,
                        transform: projectsSection.isVisible
                            ? 'translateY(0)'
                            : 'translateY(20px)',
                        transition:
                            'opacity 0.6s ease-out, transform 0.6s ease-out',
                    }}
                >
                    <div className="mb-10 flex items-baseline justify-between">
                        <h2 className="text-2xl font-light tracking-tight dark:text-white">
                            Featured Projects
                        </h2>
                        <Link
                            href="/projects"
                            className="text-sm font-light text-gray-400 transition-colors hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-200"
                        >
                            View all
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                        {featuredProjects?.slice(0, 4).map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                            />
                        ))}
                    </div>

                    {(!featuredProjects || featuredProjects.length === 0) && (
                        <p className="py-8 text-center text-sm font-light text-gray-400 dark:text-gray-500">
                            No featured projects yet.
                        </p>
                    )}
                </section>

                {/* Recent Blog Posts */}
                <section
                    ref={postsSection.ref as React.RefObject<HTMLElement>}
                    className="border-t border-gray-100 py-16 dark:border-gray-800"
                    style={{
                        opacity: postsSection.isVisible ? 1 : 0,
                        transform: postsSection.isVisible
                            ? 'translateY(0)'
                            : 'translateY(20px)',
                        transition:
                            'opacity 0.6s ease-out, transform 0.6s ease-out',
                    }}
                >
                    <div className="mb-10 flex items-baseline justify-between">
                        <h2 className="text-2xl font-light tracking-tight dark:text-white">
                            Recent Posts
                        </h2>
                        <Link
                            href="/posts"
                            className="text-sm font-light text-gray-400 transition-colors hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-200"
                        >
                            View all
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                        {recentPosts?.slice(0, 3).map((post, index) => (
                            <BlogCard key={post.id} post={post} index={index} />
                        ))}
                    </div>

                    {(!recentPosts || recentPosts.length === 0) && (
                        <p className="py-8 text-center text-sm font-light text-gray-400 dark:text-gray-500">
                            No posts yet.
                        </p>
                    )}
                </section>
            </div>
        </Layout>
    );
}
