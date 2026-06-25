import Layout from '@/components/Layouts';
import ProjectCard from '@/components/ProjectCard';
import SeoHead from '@/components/SeoHead';
import { Project } from '@/types/models';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

interface Props {
    projects: Project[];
}

export default function Projects({ projects }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string>('all');

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        projects.forEach((project) => {
            project.tags?.forEach((tag) => tags.add(tag));
        });
        return Array.from(tags).sort();
    }, [projects]);

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const term = searchTerm.toLowerCase();
            const matchesSearch =
                project.title.toLowerCase().includes(term) ||
                project.description.toLowerCase().includes(term);
            const matchesTag =
                selectedTag === 'all' || project.tags?.includes(selectedTag);
            return matchesSearch && matchesTag;
        });
    }, [projects, searchTerm, selectedTag]);

    return (
        <Layout>
            <SeoHead
                title="Projects"
                description={`A curated collection of ${projects.length} projects built by Andi Syafiudin Musafir — web applications, tools, and experiments using Laravel, React, and modern technologies.`}
                keywords="projects, portfolio, web development, laravel, react, full stack, software engineering"
                url="/projects"
                type="website"
            />

            <div>
                {/* ── Header ── */}
                <header className="animate-fade-in mb-12">
                    <div className="mb-4 inline-flex border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A]">
                        <div className="bg-[#A8FF78] px-3 py-1 text-[10px] font-bold tracking-widest text-[#1A1A1A] uppercase">
                            Portfolio
                        </div>
                    </div>
                    <h1 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl dark:text-[#FAFAF8]">
                        Projects
                    </h1>
                    <div className="mb-3 h-1 w-14 border border-[#1A1A1A] bg-[#A8FF78]" />
                    <p
                        className="text-base text-[#555] dark:text-[#999]"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                        A collection of{' '}
                        <strong className="text-[#1A1A1A] dark:text-[#FAFAF8]">
                            {projects.length}
                        </strong>{' '}
                        things I've built
                    </p>
                </header>

                {/* ── Search & Filters ── */}
                <div className="animate-fade-in-up animation-delay-200 mb-10 space-y-4">
                    {/* Search */}
                    <div className="relative max-w-md">
                        <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#888]" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Search projects"
                            className="nb-input pl-10"
                        />
                    </div>

                    {/* Tag Filters */}
                    {allTags.length > 0 && (
                        <nav
                            className="flex flex-wrap gap-2"
                            aria-label="Filter projects by technology"
                        >
                            <button
                                onClick={() => setSelectedTag('all')}
                                className={`border-2 px-3.5 py-1.5 text-xs font-bold tracking-wide uppercase transition-all duration-150 ${
                                    selectedTag === 'all'
                                        ? 'border-[#1A1A1A] bg-[#FFEE00] text-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]'
                                        : 'border-[#1A1A1A] bg-[#FAFAF8] text-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none dark:border-[#E5E7EB] dark:bg-[#222] dark:text-[#FAFAF8]'
                                }`}
                                aria-pressed={selectedTag === 'all'}
                            >
                                All
                            </button>
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag)}
                                    className={`border-2 px-3.5 py-1.5 text-xs font-bold tracking-wide uppercase transition-all duration-150 ${
                                        selectedTag === tag
                                            ? 'border-[#1A1A1A] bg-[#A8FF78] text-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]'
                                            : 'border-[#1A1A1A] bg-[#FAFAF8] text-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none dark:border-[#E5E7EB] dark:bg-[#222] dark:text-[#FAFAF8]'
                                    }`}
                                    aria-pressed={selectedTag === tag}
                                >
                                    {tag}
                                </button>
                            ))}
                        </nav>
                    )}
                </div>

                {/* ── Results count ── */}
                {(searchTerm || selectedTag !== 'all') && (
                    <p className="mb-6 text-xs font-bold text-[#888] dark:text-[#666]">
                        Showing{' '}
                        <span className="text-[#1A1A1A] dark:text-[#FAFAF8]">
                            {filteredProjects.length}
                        </span>{' '}
                        of {projects.length}
                    </p>
                )}

                {/* ── Projects Grid ── */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>

                {/* ── Empty State ── */}
                {filteredProjects.length === 0 && (
                    <div className="border-2 border-dashed border-[#1A1A1A] py-16 text-center dark:border-[#444]">
                        <p className="mb-3 text-sm font-medium text-[#888] dark:text-[#666]">
                            No projects found
                            {searchTerm && ` matching "${searchTerm}"`}
                            {selectedTag !== 'all' &&
                                ` with tag "${selectedTag}"`}
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedTag('all');
                            }}
                            className="nb-btn nb-btn-yellow mx-auto px-4 py-2 text-sm"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
}
