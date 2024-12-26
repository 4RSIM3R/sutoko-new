<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicineTransaction extends Model
{
    /** @use HasFactory<\Database\Factories\MedicineTransactionFactory> */
    use HasFactory;

    protected $guarded = [];
}
