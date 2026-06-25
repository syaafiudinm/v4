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
        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    const handleImageLoad = useCallback(() => setImageLoaded(true), []);

    return (
        <div
            ref={cardRef}
            className="nb-card group flex flex-col overflow-hidden bg-[#FAFAF8] dark:bg-[#222222]"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: `${index * 80}ms`,
                transitionProperty: 'opacity, transform, box-shadow',
                transitionDuration: '400ms',
            }}
        >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden border-b-2 border-[#1A1A1A] bg-[#F0F0EE] dark:border-[#E5E7EB] dark:bg-[#333]">
                {isVisible && (
                    <img
                        src={`/${project.image}`}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        onLoad={handleImageLoad}
                        className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.04] ${
                            imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                )}
                {!imageLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-[#E8E8E6] dark:bg-[#333]" />
                )}
                {/* Corner accent */}
                <div className="absolute top-0 left-0 h-6 w-6 border-r-2 border-b-2 border-[#1A1A1A] bg-[#FFEE00]" />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 text-lg font-bold tracking-tight text-[#1A1A1A] transition-colors group-hover:text-[#FF4F4F] dark:text-[#FAFAF8] dark:group-hover:text-[#FFEE00]">
                    {project.title}
                </h3>

                <p
                    className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-[#555] dark:text-[#999]"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                    {project.description}
                </p>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-1.5">
                        {project.tags.map((tag, i) => (
                            <span key={i} className="nb-tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Links */}
                <div className="flex items-center gap-3 border-t-2 border-dashed border-[#1A1A1A] pt-4 dark:border-[#444]">
                    {project.demo_url && (
                        <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nb-btn nb-btn-yellow px-3 py-1.5 text-xs"
                            aria-label={`View live demo of ${project.title}`}
                        >
                            <ExternalLink className="h-3 w-3" />
                            <span>Demo</span>
                        </a>
                    )}
                    {project.github_url && (
                        <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nb-btn nb-btn-ghost px-3 py-1.5 text-xs"
                            aria-label={`View source code of ${project.title} on GitHub`}
                        >
                            <Github className="h-3 w-3" />
                            <span>Source</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
