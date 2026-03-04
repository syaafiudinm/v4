import { Head } from '@inertiajs/react';

interface SeoHeadProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'profile';
    publishedAt?: string;
    updatedAt?: string;
    author?: string;
    noindex?: boolean;
    children?: React.ReactNode;
}

const SITE_NAME = 'Syaafiudinm';
const DEFAULT_DESCRIPTION =
    'Andi Syafiudin Musafir — A passionate developer creating beautiful and functional web experiences. Specializing in Laravel, React, and modern web technologies.';
const DEFAULT_IMAGE = '/profil.png';
const BASE_URL = typeof window !== 'undefined' ? window.location.origin : '';

export default function SeoHead({
    title,
    description = DEFAULT_DESCRIPTION,
    keywords,
    image,
    url,
    type = 'website',
    publishedAt,
    updatedAt,
    author = 'Andi Syafiudin Musafir',
    noindex = false,
    children,
}: SeoHeadProps) {
    const pageTitle = title ? `${title} - ${SITE_NAME}` : SITE_NAME;
    const pageUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const pageImage = image ? (image.startsWith('http') ? image : `${BASE_URL}${image.startsWith('/') ? '' : '/'}${image}`) : `${BASE_URL}${DEFAULT_IMAGE}`;
    const safeDescription = description.length > 160 ? description.slice(0, 157) + '...' : description;

    const structuredData: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': type === 'article' ? 'BlogPosting' : type === 'profile' ? 'ProfilePage' : 'WebSite',
        name: pageTitle,
        description: safeDescription,
        url: pageUrl,
        image: pageImage,
        author: {
            '@type': 'Person',
            name: author,
            url: BASE_URL,
        },
    };

    if (type === 'article') {
        if (publishedAt) structuredData.datePublished = publishedAt;
        if (updatedAt) structuredData.dateModified = updatedAt;
        structuredData.publisher = {
            '@type': 'Person',
            name: author,
            url: BASE_URL,
        };
        structuredData.headline = title || SITE_NAME;
    }

    if (type === 'website') {
        structuredData.potentialAction = {
            '@type': 'SearchAction',
            target: `${BASE_URL}/posts?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
        };
    }

    return (
        <Head>
            <title>{pageTitle}</title>
            <meta name="description" content={safeDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="author" content={author} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}
            {!noindex && <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />}

            {/* Canonical */}
            <link rel="canonical" href={pageUrl} />

            {/* Open Graph */}
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={safeDescription} />
            <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
            <meta property="og:url" content={pageUrl} />
            <meta property="og:image" content={pageImage} />
            <meta property="og:locale" content="en_US" />
            {type === 'article' && publishedAt && (
                <meta property="article:published_time" content={publishedAt} />
            )}
            {type === 'article' && updatedAt && (
                <meta property="article:modified_time" content={updatedAt} />
            )}
            {type === 'article' && (
                <meta property="article:author" content={author} />
            )}

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={safeDescription} />
            <meta name="twitter:image" content={pageImage} />

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

            {children}
        </Head>
    );
}
