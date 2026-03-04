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

    // Get all unique tags
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        projects.forEach((project) => {
            project.tags?.forEach((tag) => tags.add(tag));
        });
        return Array.from(tags).sort();
    }, [projects]);

    // Filter projects
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
                {/* Header */}
                <header className="animate-fade-in mb-12">
                    <h1 className="mb-3 text-4xl font-light tracking-tight md:text-5xl dark:text-gray-100">
                        Projects
                    </h1>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                        A collection of {projects.length} things I've built
                    </p>
                </header>

                {/* Search & Filters */}
                <div className="animate-fade-in-up animation-delay-200 mb-10 space-y-4">
                    {/* Search */}
                    <div className="relative max-w-md">
                        <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Search projects"
                            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm font-light text-gray-900 transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-gray-500"
                        />
                    </div>

                    {/* Tag Filters */}
                    {allTags.length > 0 && (
                        <nav
                            className="flex flex-wrap gap-1.5"
                            aria-label="Filter projects by technology"
                        >
                            <button
                                onClick={() => setSelectedTag('all')}
                                className={`rounded-full px-3.5 py-1.5 text-xs font-light transition ${
                                    selectedTag === 'all'
                                        ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                                }`}
                                aria-pressed={selectedTag === 'all'}
                            >
                                All
                            </button>
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag)}
                                    className={`rounded-full px-3.5 py-1.5 text-xs font-light transition ${
                                        selectedTag === tag
                                            ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                                    }`}
                                    aria-pressed={selectedTag === tag}
                                >
                                    {tag}
                                </button>
                            ))}
                        </nav>
                    )}
                </div>

                {/* Results count */}
                {(searchTerm || selectedTag !== 'all') && (
                    <p className="mb-6 text-xs font-light text-gray-400 dark:text-gray-500">
                        Showing {filteredProjects.length} of {projects.length}
                    </p>
                )}

                {/* Projects Grid */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="py-16 text-center">
                        <p className="text-sm font-light text-gray-400 dark:text-gray-500">
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
                            className="mt-3 text-sm font-light text-gray-500 underline underline-offset-4 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
}
