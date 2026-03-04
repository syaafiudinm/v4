import Layout from '@/components/Layouts';
import SeoHead from '@/components/SeoHead';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Home } from 'lucide-react';

interface Props {
    status: number;
}

const statusMessages: Record<number, { title: string; description: string }> = {
    404: {
        title: 'Page not found',
        description: "The page you're looking for doesn't exist or has been moved.",
    },
    500: {
        title: 'Server error',
        description: 'Something went wrong on our end. Please try again later.',
    },
    503: {
        title: 'Service unavailable',
        description: 'We\'re currently undergoing maintenance. Please check back soon.',
    },
    403: {
        title: 'Forbidden',
        description: "You don't have permission to access this resource.",
    },
};

export default function Error({ status }: Props) {
    const { title, description } = statusMessages[status] ?? {
        title: 'Something went wrong',
        description: 'An unexpected error occurred. Please try again.',
    };

    return (
        <Layout>
            <SeoHead title={`${status} - ${title}`} description={description} noindex />

            <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                {/* Status Code */}
                <p className="animate-fade-in mb-2 text-8xl font-light tracking-tighter text-gray-200 select-none md:text-9xl dark:text-gray-800">
                    {status}
                </p>

                {/* Title */}
                <h1 className="animate-fade-in-up mb-3 text-2xl font-light tracking-tight md:text-3xl dark:text-gray-100">
                    {title}
                </h1>

                {/* Description */}
                <p className="animate-fade-in-up animation-delay-200 mb-10 max-w-md text-sm leading-relaxed font-light text-gray-500 dark:text-gray-400">
                    {description}
                </p>

                {/* Actions */}
                <div className="animate-fade-in-up animation-delay-300 flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-light text-white transition hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                    >
                        <Home className="h-3.5 w-3.5" />
                        <span>Go home</span>
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-light text-gray-600 transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-100"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        <span>Go back</span>
                    </button>
                </div>
            </div>
        </Layout>
    );
}
