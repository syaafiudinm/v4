<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $table = 'likes';
    protected $guarded = [];

    public function post() {
        return $this->belongsTo(Post::class);
    }
}
