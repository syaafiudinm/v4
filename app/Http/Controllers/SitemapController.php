<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Project;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function sitemap(): Response
    {
        $latestPost = Post::whereNotNull('published_at')->max('updated_at');
        $latestProject = Project::max('updated_at');

        $urls = [
            ['loc' => url('/'), 'lastmod' => max($latestPost, $latestProject), 'priority' => '1.0'],
            ['loc' => url('/about'), 'lastmod' => null, 'priority' => '0.8'],
            ['loc' => url('/projects'), 'lastmod' => $latestProject, 'priority' => '0.8'],
            ['loc' => url('/posts'), 'lastmod' => $latestPost, 'priority' => '0.8'],
            ['loc' => url('/contact'), 'lastmod' => null, 'priority' => '0.5'],
        ];

        Post::whereNotNull('published_at')
            ->latest('published_at')
            ->get(['slug', 'updated_at'])
            ->each(function (Post $post) use (&$urls) {
                $urls[] = [
                    'loc' => url('/post/'.$post->slug),
                    'lastmod' => $post->updated_at,
                    'priority' => '0.6',
                ];
            });

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n";

        foreach ($urls as $url) {
            $xml .= "  <url>\n";
            $xml .= '    <loc>'.e($url['loc'])."</loc>\n";
            if ($url['lastmod']) {
                $xml .= '    <lastmod>'.date('Y-m-d', strtotime((string) $url['lastmod']))."</lastmod>\n";
            }
            $xml .= '    <priority>'.$url['priority']."</priority>\n";
            $xml .= "  </url>\n";
        }

        $xml .= '</urlset>'."\n";

        return response($xml, 200, ['Content-Type' => 'application/xml; charset=UTF-8']);
    }

    public function robots(): Response
    {
        $lines = [
            'User-agent: *',
            'Disallow: /admin',
            'Disallow: /dashboard',
            'Disallow: /settings',
            'Disallow: /login',
            'Disallow: /register',
            'Disallow: /forgot-password',
            'Disallow: /reset-password',
            '',
            'Sitemap: '.url('/sitemap.xml'),
        ];

        return response(implode("\n", $lines)."\n", 200, ['Content-Type' => 'text/plain; charset=UTF-8']);
    }
}
