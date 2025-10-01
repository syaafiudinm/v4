<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $table = 'projects';

    protected $fillable = [
        'title',
        'description',
        'image',
        'tags',
        'demo_url',
        'github_url',
        'featured',
    ];

    protected $casts = [
        'tags' => 'array',
        'featured' => 'boolean'
    ];
}
