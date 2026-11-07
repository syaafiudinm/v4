import Layout from '@/components/Layouts';
import Section, { accentLink } from '@/components/Section';
import SeoHead from '@/components/SeoHead';
import { Link } from '@inertiajs/react';

interface Props {
    status: number;
}

const statusMessages: Record<number, { title: string; description: string }> = {
    404: {
        title: 'Page not found',
        description:
            "The page you're looking for doesn't exist or has been moved.",
    },
    500: {
        title: 'Server error',
        description: 'Something went wrong on our end. Please try again later.',
    },
    503: {
        title: 'Service unavailable',
        description:
            "We're currently undergoing maintenance. Please check back soon.",
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
            <SeoHead
                title={`${status} - ${title}`}
                description={description}
                noindex
            />

            <Section title={`${status} — ${title}`} as="h1">
                <p className="text-lg leading-[27px] text-gray-700 dark:text-gray-300">
                    {description}
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-lg">
                    <Link href="/" className={accentLink}>
                        Go home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        type="button"
                        className={`cursor-pointer ${accentLink}`}
                    >
                        Go back
                    </button>
                </div>
            </Section>
        </Layout>
    );
}
