<?php

namespace App\Http\Controllers\Admin;

use App\Models\Like;
use App\Models\Post;
use Inertia\Inertia;
use App\Models\Comment;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index(){
        $stats = [
            'total_posts' => Post::count(),
            'total_projects' => Project::count(),
            'total_likes' => Like::count(),
            'total_comments' => Comment::count(),
        ];

        $recentPosts = Post::latest()->take(5)->get();
        $recentComments = Comment::with('post')->latest()->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentPosts' => $recentPosts,
            'recentComments' => $recentComments,
        ]);
    }
}
