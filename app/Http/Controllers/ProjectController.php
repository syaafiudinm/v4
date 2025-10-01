<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Response;
use Inertia\Inertia;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
   public function index() 
    {
        $projects = Project::orderBy('created_at', 'desc')->get();
        
        return Inertia::render('Projects/Index', [
            'projects' => $projects
        ]);
    }
}
