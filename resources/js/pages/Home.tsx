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
        if (ref.current) observer.observe(ref.current);
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
                {/* ── Hero ── */}
                <section className="animate-fade-in py-16 md:py-28">
                    {/* Yellow accent strip */}
                    <div className="mb-6 inline-flex items-center gap-0 border-2 border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A]">
                        <div className="bg-[#FFEE00] px-3 py-1 text-[10px] font-bold tracking-widest text-[#1A1A1A] uppercase">
                            Available for work
                        </div>
                        <div className="bg-[#1A1A1A] px-3 py-1 text-[10px] font-bold tracking-widest text-[#FFEE00] uppercase">
                            Open to opportunities
                        </div>
                    </div>

                    {/* Typewriter headline */}
                    <h1 className="mb-4 text-4xl leading-tight font-bold tracking-tight md:text-6xl dark:text-white">
                        {completedLines.map((line, i) => (
                            <span key={i} className="block">
                                {line}
                            </span>
                        ))}
                        {!isFinished && (
                            <span className="block">
                                {currentLine}
                                <span className="ml-0.5 inline-block w-[3px] animate-pulse border border-[#1A1A1A] bg-[#FFEE00]">
                                    &nbsp;
                                </span>
                            </span>
                        )}
                    </h1>

                    <p
                        className="mb-8 max-w-xl border-l-4 border-[#FFEE00] pl-4 text-lg leading-relaxed text-[#555] md:text-xl dark:text-[#999]"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                        A passionate engineer creating beautiful and functional
                        web experiences
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <Link
                            href="/about"
                            className="nb-btn nb-btn-black px-5 py-2.5 text-sm"
                        >
                            <span>More about me</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <a
                            href="mailto:altafpasallo12@gmail.com"
                            className="nb-btn nb-btn-yellow px-5 py-2.5 text-sm"
                        >
                            <Mail className="h-4 w-4" />
                            <span>Get in touch</span>
                        </a>
                    </div>
                </section>

                {/* ── Featured Projects ── */}
                <section
                    ref={projectsSection.ref as React.RefObject<HTMLElement>}
                    className="border-t-2 border-[#1A1A1A] py-16 dark:border-[#E5E7EB]"
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
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight dark:text-white">
                                Featured Projects
                            </h2>
                            <div className="mt-1 h-1 w-10 border border-[#1A1A1A] bg-[#FFEE00]" />
                        </div>
                        <Link
                            href="/projects"
                            className="text-sm font-bold text-[#1A1A1A] underline underline-offset-2 transition-colors hover:text-[#FF4F4F] dark:text-[#E5E7EB] dark:hover:text-[#FFEE00]"
                        >
                            View all →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {featuredProjects
                            ?.slice(0, 10)
                            .map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                />
                            ))}
                    </div>

                    {(!featuredProjects || featuredProjects.length === 0) && (
                        <div className="border-2 border-dashed border-[#1A1A1A] py-12 text-center dark:border-[#444]">
                            <p className="text-sm font-medium text-[#888] dark:text-[#666]">
                                No featured projects yet.
                            </p>
                        </div>
                    )}
                </section>

                {/* ── Recent Posts ── */}
                <section
                    ref={postsSection.ref as React.RefObject<HTMLElement>}
                    className="border-t-2 border-[#1A1A1A] py-16 dark:border-[#E5E7EB]"
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
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight dark:text-white">
                                Recent Posts
                            </h2>
                            <div className="mt-1 h-1 w-10 border border-[#1A1A1A] bg-[#A8FF78]" />
                        </div>
                        <Link
                            href="/posts"
                            className="text-sm font-bold text-[#1A1A1A] underline underline-offset-2 transition-colors hover:text-[#FF4F4F] dark:text-[#E5E7EB] dark:hover:text-[#FFEE00]"
                        >
                            View all →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {recentPosts?.slice(0, 3).map((post, index) => (
                            <BlogCard key={post.id} post={post} index={index} />
                        ))}
                    </div>

                    {(!recentPosts || recentPosts.length === 0) && (
                        <div className="border-2 border-dashed border-[#1A1A1A] py-12 text-center dark:border-[#444]">
                            <p className="text-sm font-medium text-[#888] dark:text-[#666]">
                                No posts yet.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </Layout>
    );
}
