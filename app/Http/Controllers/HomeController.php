<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use App\Models\Project;
use Illuminate\Http\Request;


class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'recentPosts' => Post::latest('published_at')->take(3)->get(),
            'featuredProjects' => Project::where('featured', true)->take(4)->get()
        ]);
    }

}
