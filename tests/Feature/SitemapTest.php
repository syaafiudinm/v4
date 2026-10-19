<?php

namespace Tests\Feature;

use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SitemapTest extends TestCase
{
    use RefreshDatabase;

    public function test_sitemap_lists_static_pages_and_published_posts_only()
    {
        Post::create(['title' => 'Live', 'slug' => 'live-post', 'excerpt' => 'x', 'content' => 'x', 'published_at' => now()]);
        Post::create(['title' => 'Draft', 'slug' => 'draft-post', 'excerpt' => 'x', 'content' => 'x', 'published_at' => null]);

        $response = $this->get('/sitemap.xml');

        $response->assertOk()
            ->assertHeader('Content-Type', 'application/xml; charset=UTF-8')
            ->assertSee('<loc>'.url('/projects').'</loc>', false)
            ->assertSee('<loc>'.url('/contact').'</loc>', false)
            ->assertSee('<loc>'.url('/post/live-post').'</loc>', false)
            ->assertDontSee('draft-post');
    }

    public function test_robots_points_to_sitemap_and_blocks_admin()
    {
        $this->get('/robots.txt')
            ->assertOk()
            ->assertSee('Disallow: /admin')
            ->assertSee('Sitemap: '.url('/sitemap.xml'));
    }
}
