<?php

use App\Models\Medicine;
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
        Schema::create('medicine_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Medicine::class)->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->enum('type', ['arrival', 'distribution']);
            $table->integer('quantity')->default(0);
            $table->integer('prev_quantity')->default(0);
            $table->string('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicine_transactions');
    }
};
