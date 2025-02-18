<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChargeHasAssurance extends Model
{
    /** @use HasFactory<\Database\Factories\ChargeHasAssuranceFactory> */
    use HasFactory;

    protected $guarded = [];

    public function charge()
    {
        return $this->belongsTo(Charge::class);
    }

    public function assurance()
    {
        return $this->belongsTo(PaymentAssurance::class, 'payment_assurance_id');
    }
}
