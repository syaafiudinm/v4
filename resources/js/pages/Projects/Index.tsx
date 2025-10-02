import Layout from '@/components/Layouts';
import { Project } from '@/types/models';
import { ExternalLink, Github } from 'lucide-react';

interface Props {
    projects: Project[];
}

export default function Projects({ projects }: Props) {
    return (
        <Layout>
            <div>
                <div className="mb-16">
                    <h1 className="mb-4 text-4xl font-light md:text-5xl">
                        Projects
                    </h1>
                    <p className="text-lg font-light text-gray-600">
                        A collection of things I've built
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    {projects.map((project) => (
                        <div key={project.id} className="group">
                            <div className="mb-6 aspect-video overflow-hidden bg-gray-100">
                                <img
                                    src={`/${project.image}`}
                                    alt={project.title}
                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                />
                            </div>

                            <h2 className="mb-3 text-2xl font-light">
                                {project.title}
                            </h2>

                            <p className="mb-4 font-light text-gray-600">
                                {project.description}
                            </p>

                            <div className="mb-6 flex flex-wrap gap-2">
                                {project.tags?.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="border border-gray-200 px-3 py-1 text-xs font-light"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center space-x-4">
                                {project.demo_url && (
                                    <a
                                        href={project.demo_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2 text-sm font-light transition hover:text-gray-600"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        <span>Live Demo</span>
                                    </a>
                                )}
                                {project.github_url && (
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2 text-sm font-light transition hover:text-gray-600"
                                    >
                                        <Github className="h-4 w-4" />
                                        <span>Source Code</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
