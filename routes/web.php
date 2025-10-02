<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PostController as AdminPostController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/posts', [PostController::class, 'index'])->name('blog.index');
Route::get('/post/{slug}', [PostController::class, 'show'])->name('blog.show');
Route::post('/post/{post}/like', [PostController::class, 'like'])->name('blog.like');
Route::post('/post/{post}/comment', [PostController::class, 'comment'])->name('blog.comment');
Route::get('/projects', [ProjectController::class, 'index'])->name('projects');
Route::get('/about', function () {
    return Inertia::render('About/Index');
})->name('about');

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        return redirect()->route('admin.dashboard');
    })->name('dashboard');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('posts', AdminPostController::class);
    Route::resource('projects', AdminProjectController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
