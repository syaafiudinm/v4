import AdminLayout from '@/components/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Project } from '@/types/models';
import { FormEventHandler, useState } from 'react';

interface Props {
  project?: Project;
}

export default function ProjectForm({ project }: Props) {
  const [tagInput, setTagInput] = useState('');
  const { data, setData, post: submit, put, processing, errors } = useForm({
    title: project?.title || '',
    description: project?.description || '',
    image: project?.image || '',
    tags: project?.tags || [],
    demo_url: project?.demo_url || '',
    github_url: project?.github_url || '',
    featured: project?.featured || false,
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    
    if (project) {
      put(`/admin/projects/${project.id}`);
    } else {
      submit('/admin/projects');
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !data.tags.includes(tagInput.trim())) {
      setData('tags', [...data.tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setData('tags', data.tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-light mb-8">
          {project ? 'Edit Project' : 'Create Project'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow">
          <div>
            <label className="block text-sm font-light mb-2">Title</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-gray-900 transition"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-light mb-2">Description</label>
            <textarea
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-gray-900 transition resize-none"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-light mb-2">Image URL</label>
            <input
              type="text"
              value={data.image}
              onChange={(e) => setData('image', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-gray-900 transition"
            />
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
          </div>

          <div>
            <label className="block text-sm font-light mb-2">Tags</label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add a tag"
                className="flex-1 px-4 py-2 border border-gray-200 focus:outline-none focus:border-gray-900 transition"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 border border-gray-200 hover:border-gray-900 transition font-light"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-sm font-light flex items-center space-x-2"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-light mb-2">Demo URL</label>
            <input
              type="text"
              value={data.demo_url}
              onChange={(e) => setData('demo_url', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-gray-900 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-light mb-2">GitHub URL</label>
            <input
              type="text"
              value={data.github_url}
              onChange={(e) => setData('github_url', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-gray-900 transition"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={data.featured}
              onChange={(e) => setData('featured', e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="featured" className="text-sm font-light">Featured Project</label>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={processing}
              className="px-6 py-2 bg-gray-900 text-white font-light hover:bg-gray-800 transition disabled:opacity-50"
            >
              {processing ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}