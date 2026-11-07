import { Link } from '@inertiajs/react';

export const accentLink =
    'font-semibold text-blue-700 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300';

export const inputClass =
    'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400';

export function Highlight({ children }: { children: React.ReactNode }) {
    return (
        <span className="font-medium text-blue-700 dark:text-blue-400">
            {children}
        </span>
    );
}

export function Divider() {
    return (
        <hr className="w-full border-t border-gray-200 dark:border-gray-800" />
    );
}

interface SectionProps {
    title: string;
    as?: 'h1' | 'h2';
    action?: { href: string; label: string };
    children: React.ReactNode;
}

export default function Section({
    title,
    as: Heading = 'h2',
    action,
    children,
}: SectionProps) {
    return (
        <section className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between gap-4">
                <Heading className="text-2xl leading-tight font-bold">
                    {title}
                </Heading>
                {action && (
                    <Link
                        href={action.href}
                        className={`shrink-0 text-base ${accentLink}`}
                    >
                        {action.label}
                    </Link>
                )}
            </div>
            {children}
        </section>
    );
}
