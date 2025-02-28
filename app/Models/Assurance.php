<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assurance extends Model
{
    /** @use HasFactory<\Database\Factories\AssuranceFactory> */
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'coverage' => 'array',
    ];
}
