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
        Schema::create('practioners', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('nik');
            $table->enum('role', ['doctor', 'pharmacist', 'nurse', 'midwife']);
            $table->string('satu_sehat_id')->nullable();
            $table->dateTime('synced_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('practioners');
    }
};
