import AdminLayout from '@/components/AdminLayout';
import { Project } from '@/types/models';
import { Link, router } from '@inertiajs/react';
import {
    Edit,
    ExternalLink,
    FolderKanban,
    Github,
    Plus,
    Star,
    Trash2,
} from 'lucide-react';

interface Props {
    projects: Project[];
}

export default function ProjectsIndex({ projects }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this project?')) {
            router.delete(`/admin/projects/${id}`);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-light text-gray-900">
                            Projects
                        </h1>
                        <p className="mt-1 font-light text-gray-600">
                            Manage your portfolio projects
                        </p>
                    </div>
                    <Link
                        href="/admin/projects/create"
                        className="flex items-center space-x-2 rounded-lg bg-gray-900 px-4 py-2 font-light text-white transition hover:bg-gray-800"
                    >
                        <Plus className="h-4 w-4" />
                        <span>New Project</span>
                    </Link>
                </div>

                {projects && projects.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                            >
                                {/* Project Image */}
                                <div className="group relative aspect-video bg-gray-100">
                                    <img
                                        src={`/storage/${project.image}`}
                                        alt={project.title}
                                        className="h-full w-full object-cover"
                                    />
                                    {project.featured && (
                                        <div className="absolute right-3 top-3">
                                            <span className="inline-flex items-center space-x-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-light text-yellow-800">
                                                <Star className="h-3 w-3 fill-current" />
                                                <span>Featured</span>
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Project Info */}
                                <div className="p-5">
                                    <h3 className="mb-2 text-lg font-light text-gray-900">
                                        {project.title}
                                    </h3>
                                    <p className="mb-4 line-clamp-2 text-sm font-light text-gray-600">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    {project.tags &&
                                        project.tags.length > 0 && (
                                            <div className="mb-4 flex flex-wrap gap-1">
                                                {project.tags
                                                    .slice(0, 3)
                                                    .map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="rounded bg-gray-100 px-2 py-1 text-xs font-light text-gray-700"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                {project.tags.length > 3 && (
                                                    <span className="px-2 py-1 text-xs font-light text-gray-500">
                                                        +
                                                        {project.tags.length -
                                                            3}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                    {/* Links */}
                                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                        <div className="flex items-center space-x-2">
                                            {project.demo_url && (
                                                <a
                                                    href={project.demo_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1 text-gray-500 transition hover:text-gray-900"
                                                    title="Live Demo"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </a>
                                            )}
                                            {project.github_url && (
                                                <a
                                                    href={project.github_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1 text-gray-500 transition hover:text-gray-900"
                                                    title="GitHub"
                                                >
                                                    <Github className="h-4 w-4" />
                                                </a>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center space-x-1">
                                            <Link
                                                href={`/admin/projects/${project.id}/edit`}
                                                className="rounded p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(project.id)
                                                }
                                                className="rounded p-2 text-red-600 transition hover:bg-red-50 hover:text-red-900"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
                        <div className="mx-auto max-w-md">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                <FolderKanban className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="mb-2 text-lg font-light text-gray-900">
                                No projects yet
                            </h3>
                            <p className="mb-6 font-light text-gray-600">
                                Create your first project to showcase your work
                            </p>
                            <Link
                                href="/admin/projects/create"
                                className="inline-flex items-center space-x-2 rounded-lg bg-gray-900 px-4 py-2 font-light text-white transition hover:bg-gray-800"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Create Project</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
