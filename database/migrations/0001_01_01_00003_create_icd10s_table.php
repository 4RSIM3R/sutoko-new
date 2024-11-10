<?php

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
        Schema::create('icd10s', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->longText('english');
            $table->longText('indonesia')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
            $table->fullText(['code', 'english', 'indonesia']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('icd10s');
    }
};
