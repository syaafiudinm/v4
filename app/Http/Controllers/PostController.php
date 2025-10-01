<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(){
        $posts = Post::with('comments', 'likes')
            ->whereNotNull('published_at')
            ->latest('published_at')
            ->paginate(5);

    
        return Inertia::render('Blogs/Index', ['posts' => $posts]);
    }

    public function show($slug){
        $post = Post::with('comments', 'likes')
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('Blogs/Show', [
            'post' => $post,
            'hasLiked' => $post->likes()->where('ip_address', request()->ip())->exists()
        ]);
    }

    public function like(Post $post){
        $post->likes()->firstOrCreate([
            'ip_address' => request()->ip()
        ]);

        return back();
    }

    public function comment(Post $post, Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email',
            'content' => 'required|max:1000'
        ]);
        
        $post->comments()->create($validated);
        return back();
    }
}
