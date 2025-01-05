<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Practioner extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia;

    protected $guarded = [];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('str');
        $this->addMediaCollection('sip');
        $this->addMediaCollection('ktp');
    }

    public function getStrAttribute(): string|null
    {
        return $this->getFirstMediaUrl('str');
    }

    public function getSipAttribute(): string|null
    {
        return $this->getFirstMediaUrl('sip');
    }

    public function getKtpAttribute(): string|null
    {
        return $this->getFirstMediaUrl('ktp');
    }
}
