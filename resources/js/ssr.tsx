import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const formatTitle = (title?: string) => {
    if (!title) return appName;
    const normalizedTitle = title.trim();
    const normalizedAppName = appName.trim();

    if (
        normalizedTitle.toLowerCase() === normalizedAppName.toLowerCase() ||
        normalizedTitle
            .toLowerCase()
            .endsWith(`- ${normalizedAppName}`.toLowerCase())
    ) {
        return normalizedTitle;
    }

    return `${normalizedTitle} - ${normalizedAppName}`;
};

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: formatTitle,
        resolve: (name) =>
            resolvePageComponent(
                `./pages/${name}.tsx`,
                import.meta.glob('./pages/**/*.tsx'),
            ),
        setup: ({ App, props }) => {
            return <App {...props} />;
        },
    }),
);
