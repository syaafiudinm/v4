import { Link, router } from '@inertiajs/react';
import { PaginatedData, Post } from '@/types/models';
import { Plus, Edit, Trash2 } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

interface Props {
  posts: PaginatedData<Post>;
}

export default function PostsIndex({ posts }: Props) {
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      router.delete(`/admin/posts/${id}`);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light">Blog Posts</h1>
          <Link 
            href="/admin/posts/create"
            className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white font-light hover:bg-gray-800 transition"
          >
            <Plus className="w-4 h-4" />
            <span>New Post</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500 uppercase">Published</th>
                <th className="px-6 py-3 text-right text-xs font-light text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.data.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 font-light">{post.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-light rounded ${
                      post.published_at ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {post.published_at ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-light text-gray-500">
                    {post.published_at ? formatDate(post.published_at) : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="p-2 text-gray-600 hover:text-gray-900 transition"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-red-600 hover:text-red-900 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {posts.links.length > 3 && (
          <div className="flex justify-center items-center space-x-2 mt-6">
            {posts.links.map((link, index) => (
              link.url ? (
                <Link
                  key={index}
                  href={link.url}
                  className={`px-4 py-2 text-sm font-light border transition ${
                    link.active
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'border-gray-200 hover:border-gray-900'
                  }`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ) : (
                <span
                  key={index}
                  className="px-4 py-2 text-sm font-light text-gray-400"
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              )
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}