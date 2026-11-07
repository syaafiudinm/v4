import Layout from '@/components/Layouts';
import ProjectCard from '@/components/ProjectCard';
import Section, { accentLink, inputClass } from '@/components/Section';
import SeoHead from '@/components/SeoHead';
import { Project } from '@/types/models';
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

    const filterClass = (active: boolean) =>
        `cursor-pointer text-base transition-colors ${
            active
                ? 'font-semibold text-blue-700 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
        }`;

    return (
        <Layout>
            <SeoHead
                title="Projects"
                description={`A curated collection of ${projects.length} projects built by Andi Syafiudin Musafir — web applications, tools, and experiments using Laravel, React, and modern technologies.`}
                keywords="projects, portfolio, web development, laravel, react, full stack, software engineering"
                url="/projects"
                type="website"
            />

            <Section title="Projects" as="h1">
                <p className="text-lg leading-[27px] text-gray-700 dark:text-gray-300">
                    A collection of{' '}
                    <span className="font-medium text-blue-700 dark:text-blue-400">
                        {projects.length} things
                    </span>{' '}
                    I've built — web applications, tools, and experiments.
                </p>

                <input
                    type="search"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search projects"
                    className={inputClass}
                />

                {allTags.length > 0 && (
                    <nav
                        className="flex flex-wrap gap-x-4 gap-y-1"
                        aria-label="Filter projects by technology"
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedTag('all')}
                            className={filterClass(selectedTag === 'all')}
                            aria-pressed={selectedTag === 'all'}
                        >
                            All
                        </button>
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => setSelectedTag(tag)}
                                className={filterClass(selectedTag === tag)}
                                aria-pressed={selectedTag === tag}
                            >
                                {tag}
                            </button>
                        ))}
                    </nav>
                )}

                {(searchTerm || selectedTag !== 'all') &&
                    filteredProjects.length > 0 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Showing {filteredProjects.length} of{' '}
                            {projects.length}
                        </p>
                    )}
            </Section>

            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-start gap-2">
                    <p className="text-base text-gray-500 dark:text-gray-400">
                        No projects found
                        {searchTerm && ` matching "${searchTerm}"`}
                        {selectedTag !== 'all' && ` with tag "${selectedTag}"`}.
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedTag('all');
                        }}
                        className={`cursor-pointer text-base ${accentLink}`}
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </Layout>
    );
}
