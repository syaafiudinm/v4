import { ExternalLink, Github } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

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
    index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '100px', threshold: 0.1 },
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleImageLoad = useCallback(() => {
        setImageLoaded(true);
    }, []);

    return (
        <div
            ref={cardRef}
            className="group rounded-2xl border border-gray-300 bg-gray-50/50 p-4 transition-all duration-500 ease-out hover:border-gray-200 dark:border-gray-800 dark:bg-gray-800/30 dark:hover:border-gray-700"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: `${index * 80}ms`,
                transitionProperty: 'opacity, transform',
            }}
        >
            {/* Image */}
            <div className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                {isVisible && (
                    <img
                        src={`/${project.image}`}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        onLoad={handleImageLoad}
                        className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.03] ${
                            imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                )}
                {!imageLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
                )}
            </div>

            {/* Content */}
            <h3 className="mb-2 text-lg font-normal tracking-tight text-gray-900 transition-colors group-hover:text-gray-600 dark:text-gray-100 dark:group-hover:text-gray-300">
                {project.title}
            </h3>

            <p className="mb-4 line-clamp-2 text-sm leading-relaxed font-light text-gray-500 dark:text-gray-400">
                {project.description}
            </p>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-light text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Links */}
            <div className="flex items-center gap-4">
                {project.demo_url && (
                    <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-light text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                        aria-label={`View live demo of ${project.title}`}
                    >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>Demo</span>
                    </a>
                )}
                {project.github_url && (
                    <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-light text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                        aria-label={`View source code of ${project.title} on GitHub`}
                    >
                        <Github className="h-3.5 w-3.5" />
                        <span>Source</span>
                    </a>
                )}
            </div>
        </div>
    );
}
