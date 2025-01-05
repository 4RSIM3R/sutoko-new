<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    /** @use HasFactory<\Database\Factories\MedicineFactory> */
    use HasFactory;

    protected $guarded = [];

    protected $appends = [
        'current_stock',
    ];

    public function transactions()
    {
        return $this->hasMany(MedicineTransaction::class);
    }

    public function getCurrentStockAttribute()
    {
        // Retrieve the latest 'alter' transaction for this medicine
        $lastAlter = $this->transactions()
            ->where('type', 'alter')
            ->orderBy('created_at', 'desc')
            ->first();

        if ($lastAlter) {
            // Initialize stock with the 'alter' transaction's quantity
            $stock = $lastAlter->quantity;

            // Aggregate 'add' and 'subtract' transactions that occurred after the last 'alter'
            $aggregated = $this->transactions()
                ->whereIn('type', ['add', 'subtract'])
                ->where('created_at', '>', $lastAlter->created_at)
                ->selectRaw("
                SUM(CASE WHEN type = 'add' THEN quantity ELSE 0 END) as add_sum,
                SUM(CASE WHEN type = 'subtract' THEN quantity ELSE 0 END) as subtract_sum
            ")
                ->first();

            // Update stock based on the aggregated sums
            $stock += $aggregated->add_sum ?? 0;
            $stock -= $aggregated->subtract_sum ?? 0;
        } else {
            // No 'alter' transactions; sum all 'add' and 'subtract' transactions
            $aggregated = $this->transactions()
                ->whereIn('type', ['add', 'subtract'])
                ->selectRaw("
                SUM(CASE WHEN type = 'add' THEN quantity ELSE 0 END) as add_sum,
                SUM(CASE WHEN type = 'subtract' THEN quantity ELSE 0 END) as subtract_sum
            ")
                ->first();

            // Calculate stock as total additions minus total subtractions
            $stock = ($aggregated->add_sum ?? 0) - ($aggregated->subtract_sum ?? 0);
        }

        return $stock;
    }
}
