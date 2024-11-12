<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Location extends Model
{
    use HasFactory, SoftDeletes;

    public const mapCodeToName = [
        'bu' => 'Building',
        'wi' => 'Wing',
        'co' => 'Corridor',
        'ro' => 'Room',
        've' => 'Vehicle',
        'ho' => 'House',
        'ca' => 'Cabinet',
        'rd' => 'Road',
        'area' => 'Area',
    ];

    protected $guarded = [];
}
