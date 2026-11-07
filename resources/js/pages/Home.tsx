import BlogCard from '@/components/BlogCard';
import Layout from '@/components/Layouts';
import ProjectCard from '@/components/ProjectCard';
import Section, { Divider, Highlight, accentLink } from '@/components/Section';
import SeoHead from '@/components/SeoHead';
import { Post, Project } from '@/types/models';
import { Link } from '@inertiajs/react';

interface Props {
    recentPosts?: Post[];
    featuredProjects?: Project[];
}

// Minimum cards per loop so a single set always overflows the viewport.
const MARQUEE_MIN_ITEMS = 6;
const MARQUEE_SECONDS_PER_ITEM = 6;

function ProjectMarquee({ projects }: { projects: Project[] }) {
    const repeats = Math.ceil(MARQUEE_MIN_ITEMS / projects.length);
    const loop = Array.from({ length: repeats }, () => projects).flat();
    // Render the loop twice; the track slides by -50% so the seam is invisible.
    const items = [...loop, ...loop];

    return (
        <div className="marquee -mx-4 overflow-hidden">
            <div
                className="marquee-track flex w-max"
                style={
                    {
                        '--marquee-duration': `${loop.length * MARQUEE_SECONDS_PER_ITEM}s`,
                    } as React.CSSProperties
                }
            >
                {items.map((project, i) => {
                    const isCopy = i >= projects.length;
                    return (
                        <div
                            key={`${project.id}-${i}`}
                            className="grid w-[260px] shrink-0 px-3 sm:w-[300px]"
                            aria-hidden={isCopy || undefined}
                            inert={isCopy || undefined}
                        >
                            <ProjectCard project={project} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function EmptyState({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-base text-gray-500 dark:text-gray-400">{children}</p>
    );
}

export default function Home({ recentPosts, featuredProjects }: Props) {
    return (
        <Layout>
            <SeoHead
                title="Home"
                description="Andi Syafiudin Musafir - Software Engineer creating beautiful and functional applications. Specializing in Laravel, React, and modern web technologies."
                keywords="andi syafiudin musafir, web developer, software engineer, laravel, react, portfolio"
                url="/"
                type="website"
            />

            {/* ── Intro ── */}
            <section className="flex flex-col gap-2">
                <p className="text-lg leading-[27px] text-gray-700 dark:text-gray-300">
                    <Highlight>Software engineer</Highlight> based in Indonesia,
                    building beautiful and functional applications with{' '}
                    <Highlight>Laravel</Highlight>, <Highlight>React</Highlight>
                    , and <Highlight>Go</Highlight>. Informatics Engineering graduate
                    of Hasanuddin University.
                </p>
                <Link
                    href="/contact"
                    className={`text-lg leading-[27px] ${accentLink}`}
                >
                    Interested in working together? Get in touch!
                </Link>
            </section>

            <Divider />

            {/* ── Featured Projects ── */}
            <Section
                title="Featured projects"
                action={{ href: '/projects', label: 'View all' }}
            >
                {featuredProjects && featuredProjects.length > 0 ? (
                    <ProjectMarquee projects={featuredProjects.slice(0, 10)} />
                ) : (
                    <EmptyState>No featured projects yet.</EmptyState>
                )}
            </Section>

            <Divider />

            {/* ── Recent Posts ── */}
            <Section
                title="Recent writing"
                action={{ href: '/posts', label: 'View all' }}
            >
                {recentPosts && recentPosts.length > 0 ? (
                    <div className="-my-4 divide-y divide-gray-200 dark:divide-gray-800">
                        {recentPosts.slice(0, 3).map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <EmptyState>No posts yet.</EmptyState>
                )}
            </Section>
        </Layout>
    );
}
