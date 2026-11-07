import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags?: string[];
    demo_url?: string;
    github_url?: string;
}

interface ProjectCardProps {
    project: Project;
}

const linkClass =
    'inline-flex items-center gap-0.5 text-sm font-semibold text-blue-700 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300';

export default function ProjectCard({ project }: ProjectCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <article className="group flex flex-col gap-3">
            <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                <img
                    src={`/${project.image}`}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setImageLoaded(true)}
                    className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.02] ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            </div>

            <div className="flex flex-1 flex-col gap-1.5">
                <h3 className="text-lg leading-snug font-semibold text-gray-900 dark:text-gray-100">
                    {project.title}
                </h3>
                <p className="line-clamp-2 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    {project.description}
                </p>
                {project.tags && project.tags.length > 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {project.tags.join(' · ')}
                    </p>
                )}
                {(project.demo_url || project.github_url) && (
                    <div className="mt-1 flex items-center gap-4">
                        {project.demo_url && (
                            <a
                                href={project.demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={linkClass}
                                aria-label={`View live demo of ${project.title}`}
                            >
                                Live demo
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                        )}
                        {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={linkClass}
                                aria-label={`View source code of ${project.title} on GitHub`}
                            >
                                Source
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
}
