import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './Contexts/ThemeContext';

const appName = import.meta.env.VITE_APP_NAME || 'Syaafiudinm';
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

createInertiaApp({
    title: formatTitle,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <ThemeProvider>
                <App {...props} />
            </ThemeProvider>,
        );
    },
    progress: {
        color: '#1d4ed8',
        showSpinner: false,
    },
});
