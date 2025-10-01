import AdminLayout from '@/components/AdminLayout';
import { Project } from '@/types/models';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus, Upload, X } from 'lucide-react';
import { ChangeEvent, FormEventHandler, useState } from 'react';

interface Props {
    project?: Project;
}

export default function ProjectForm({ project }: Props) {
    const [tagInput, setTagInput] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(
        project?.image ? `/storage/${project.image}` : null,
    );

    const {
        data,
        setData,
        post: submit,
        processing,
        errors,
    } = useForm({
        title: project?.title || '',
        description: project?.description || '',
        image: null as File | null,
        tags: project?.tags || [],
        demo_url: project?.demo_url || '',
        github_url: project?.github_url || '',
        featured: project?.featured || false,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (project) {
            submit(`/admin/projects/${project.id}`, {
                method: 'post',
                forceFormData: true,
                headers: {
                    'X-HTTP-Method-Override': 'PUT',
                },
            });
        } else {
            submit('/admin/projects', {
                forceFormData: true,
            });
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addTag = () => {
        if (tagInput.trim() && !data.tags.includes(tagInput.trim())) {
            setData('tags', [...data.tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setData(
            'tags',
            data.tags.filter((tag) => tag !== tagToRemove),
        );
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl space-y-6">
                <div className="flex items-center space-x-4">
                    <Link
                        href="/admin/projects"
                        className="rounded-lg p-2 transition hover:bg-gray-100"
                    >
                        <ArrowLeft className="h-5 w-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-light text-gray-900">
                            {project ? 'Edit Project' : 'Create New Project'}
                        </h1>
                        <p className="mt-1 font-light text-gray-600">
                            {project
                                ? 'Update your project details'
                                : 'Add a new project to your portfolio'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        {/* Title */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Project Title{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                className="text-gray-900 w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900"
                                placeholder="My Awesome Project"
                            />
                            {errors.title && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Description{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                rows={4}
                                className="text-gray-900 w-full resize-none rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900"
                                placeholder="Describe your project..."
                            />
                            {errors.description && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Project Image{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-3">
                                <div className="flex w-full items-center justify-center">
                                    <label className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition hover:bg-gray-100">
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="h-full w-full rounded-lg object-cover"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                                <Upload className="mb-3 h-10 w-10 text-gray-400" />
                                                <p className="mb-2 text-sm font-light text-gray-500">
                                                    <span className="font-medium">
                                                        Click to upload
                                                    </span>{' '}
                                                    or drag and drop
                                                </p>
                                                <p className="text-xs font-light text-gray-500">
                                                    PNG, JPG, WEBP (MAX. 2MB)
                                                </p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
                                {imagePreview && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImagePreview(null);
                                            setData('image', null);
                                        }}
                                        className="text-sm font-light text-red-600 hover:text-red-800"
                                    >
                                        Remove image
                                    </button>
                                )}
                            </div>
                            {errors.image && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.image}
                                </p>
                            )}
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Technologies / Tags
                            </label>
                            <div className="mb-3 flex space-x-2">
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) =>
                                        setTagInput(e.target.value)
                                    }
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addTag();
                                        }
                                    }}
                                    placeholder="e.g., React, Laravel, TypeScript"
                                    className="text-gray-900 flex-1 rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900"
                                />
                                <button
                                    type="button"
                                    onClick={addTag}
                                    className="flex items-center space-x-2 rounded-lg bg-gray-900 px-4 py-2 transition hover:bg-gray-800"
                                >
                                    <Plus className="h-4 w-4" />
                                    <span className="font-light">Add</span>
                                </button>
                            </div>
                            {data.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {data.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center space-x-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-light text-gray-800"
                                        >
                                            <span>{tag}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="transition hover:text-gray-900"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                            <p className="mt-2 text-xs text-gray-500">
                                Press Enter or click Add to add a tag
                            </p>
                        </div>

                        {/* Demo URL */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Live Demo URL
                            </label>
                            <input
                                type="text"
                                value={data.demo_url}
                                onChange={(e) =>
                                    setData('demo_url', e.target.value)
                                }
                                className="text-gray-900 w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900"
                                placeholder="https://example.com"
                            />
                            {errors.demo_url && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.demo_url}
                                </p>
                            )}
                        </div>

                        {/* GitHub URL */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                GitHub Repository URL
                            </label>
                            <input
                                type="text"
                                value={data.github_url}
                                onChange={(e) =>
                                    setData('github_url', e.target.value)
                                }
                                className="text-gray-900 w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900"
                                placeholder="https://github.com/username/repo"
                            />
                            {errors.github_url && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.github_url}
                                </p>
                            )}
                        </div>

                        {/* Featured */}
                        <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-4">
                            <input
                                type="checkbox"
                                id="featured"
                                checked={data.featured}
                                onChange={(e) =>
                                    setData('featured', e.target.checked)
                                }
                                className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                            />
                            <label
                                htmlFor="featured"
                                className="text-sm font-medium text-gray-700"
                            >
                                Feature this project on homepage
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <Link
                            href="/admin/projects"
                            className="rounded-lg px-4 py-2 font-light text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-gray-900 px-6 py-2 font-light text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing
                                ? 'Saving...'
                                : project
                                  ? 'Update Project'
                                  : 'Create Project'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
