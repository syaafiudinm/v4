<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        {{-- Default SEO Meta Tags (overridden by Inertia Head per page) --}}
        <meta name="description" content="Andi Syafiudin Musafir — A passionate developer creating beautiful and functional web experiences. Specializing in Laravel, React, and modern web technologies.">
        <meta name="author" content="Andi Syafiudin Musafir">
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
        <meta name="theme-color" content="#111827" media="(prefers-color-scheme: dark)">

        {{-- Open Graph Defaults --}}
        <meta property="og:site_name" content="{{ config('app.name', 'Syaafiudinm') }}">
        <meta property="og:locale" content="en_US">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                var appearance = '{{ $appearance ?? "system" }}';
                var saved = localStorage.getItem('theme');

                if (saved === 'dark' || saved === 'light') {
                    appearance = saved;
                }

                if (appearance === 'system') {
                    appearance = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }

                if (appearance === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            })();
        </script>

        {{-- Inline style to prevent FOUC --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }
            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', 'Syaafiudinm') }}</title>

        {{-- Favicon --}}
        <link rel="icon" href="/favicon.png" type="image/png">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        {{-- DNS Prefetch & Preconnect --}}
        <link rel="dns-prefetch" href="https://fonts.bunny.net">
        <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>

        {{-- Font with display swap for performance --}}
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600&display=swap" rel="stylesheet" />

        {{-- Preload critical profile image --}}
        <link rel="preload" href="/profil.png" as="image" type="image/png">

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia

        {{-- Structured Data: WebSite --}}
        <script type="application/ld+json">
        {
            "@@context": "https://schema.org",
            "@@type": "WebSite",
            "name": "{{ config('app.name', 'Syaafiudinm') }}",
            "url": "{{ url('/') }}",
            "author": {
                "@@type": "Person",
                "name": "Andi Syafiudin Musafir"
            },
            "description": "A passionate developer creating beautiful and functional web experiences."
        }
        </script>
    </body>
</html>
