import Layout from '@/components/Layouts';
import { Project } from '@/types/models';
import { ExternalLink, Github, Search } from 'lucide-react';
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
            const matchesSearch =
                project.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                project.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            const matchesTag =
                selectedTag === 'all' || project.tags?.includes(selectedTag);
            return matchesSearch && matchesTag;
        });
    }, [projects, searchTerm, selectedTag]);

    return (
        <Layout>
            <div>
                <div className="animate-fade-in mb-12">
                    <h1 className="mb-4 text-4xl font-light md:text-5xl">
                        Projects
                    </h1>
                    <p className="text-lg font-light text-gray-600">
                        A collection of {projects.length} things I've built
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="animate-fade-in-up animation-delay-200 mb-8 space-y-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 py-3 pr-4 pl-12 transition focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
                        />
                    </div>

                    {/* Tag Filters */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedTag('all')}
                            className={`rounded-full px-4 py-2 text-sm font-light transition ${
                                selectedTag === 'all'
                                    ? 'bg-gray-900 text-white'
                                    : 'border border-gray-200 hover:border-gray-900'
                            }`}
                        >
                            All
                        </button>
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`rounded-full px-4 py-2 text-sm font-light transition ${
                                    selectedTag === tag
                                        ? 'bg-gray-900 text-white'
                                        : 'border border-gray-200 hover:border-gray-900'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results count */}
                <p className="mb-6 text-sm font-light text-gray-600">
                    Showing {filteredProjects.length} of {projects.length}{' '}
                    projects
                </p>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    {filteredProjects.map((project, index) => (
                        <div key={index}>
                            <div className="mb-6 aspect-video overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                                <img
                                    src={`/${project.image}`}
                                    alt={project.title}
                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                />
                            </div>

                            <h2 className="mb-3 text-2xl font-light transition group-hover:text-gray-600">
                                {project.title}
                            </h2>

                            <p className="mb-4 line-clamp-2 font-light text-gray-600">
                                {project.description}
                            </p>

                            <div className="mb-6 flex flex-wrap gap-2">
                                {project.tags?.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="rounded-full border border-gray-200 px-3 py-1 text-xs font-light"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center space-x-4">
                                {project.demo_url && (
                                    <span className="flex items-center space-x-2 text-sm font-light text-gray-600">
                                        <ExternalLink className="h-4 w-4" />
                                        <span>Live Demo</span>
                                    </span>
                                )}
                                {project.github_url && (
                                    <span className="flex items-center space-x-2 text-sm font-light text-gray-600">
                                        <Github className="h-4 w-4" />
                                        <span>Source Code</span>
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="py-12 text-center">
                        <p className="font-light text-gray-500">
                            No projects found matching your criteria.
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
