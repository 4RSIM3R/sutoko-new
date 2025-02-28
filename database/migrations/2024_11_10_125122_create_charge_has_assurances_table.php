<?php

use App\Models\Charge;
use App\Models\Assurance;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('charge_has_assurances', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Assurance::class)->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignIdFor(Charge::class)->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->decimal('price');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('charge_has_assurances');
    }
};
