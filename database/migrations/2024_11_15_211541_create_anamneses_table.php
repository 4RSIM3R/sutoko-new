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
        Schema::create('anamneses', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Encounter::class)->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('primary_satu_sehat_id');
            $table->string('primary_code');
            $table->string('primary_display');
            $table->string('secondary_satu_sehat_id')->nullable();
            $table->string('secondary_code')->nullable();
            $table->string('secondary_display')->nullable();
            $table->text('notes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anamneses');
    }
};
