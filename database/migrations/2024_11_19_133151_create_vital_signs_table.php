<?php

use App\Models\Encounter;
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
        Schema::create('vital_signs', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Encounter::class)->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('satu_sehat_id');
            $table->float('systolic');
            $table->float('diastolic');
            $table->float('body_temperature');
            $table->float('heart_rate');
            $table->float('breathing_rate');
            $table->string('consciousness_code');
            $table->string('consciousness_display');
            $table->float('weight');
            $table->float('height');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vital_signs');
    }
};
