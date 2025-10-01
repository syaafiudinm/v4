import AdminLayout from '@/components/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { Project } from '@/types/models';
import { Plus, Edit, Trash2 } from 'lucide-react';

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
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light">Projects</h1>
          <Link 
            href="/admin/projects/create"
            className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white font-light hover:bg-gray-800 transition"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="aspect-video bg-gray-100">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-light text-lg">{project.title}</h3>
                  {project.featured && (
                    <span className="px-2 py-1 text-xs font-light bg-yellow-100 text-yellow-800 rounded">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 font-light mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="p-2 text-gray-600 hover:text-gray-900 transition"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-red-600 hover:text-red-900 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}