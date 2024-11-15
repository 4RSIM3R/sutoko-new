<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anamnesis extends Model
{
    /** @use HasFactory<\Database\Factories\AnamnesisFactory> */
    use HasFactory;

    protected $guarded = [];

    public function encounter()
    {
        return $this->belongsTo(Encounter::class);
    }
}
