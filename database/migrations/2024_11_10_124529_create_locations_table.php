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
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->enum('physical_type_code', ['bu', 'wi', 'co', 'ro', 've', 'ho', 'ca', 'rd', 'area']);
            $table->enum('physical_type_name', ['Building', 'Wing', 'Corridor', 'Room', 'Vehicle', 'House', 'Cabinet', 'Road', 'Area']);
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
        Schema::dropIfExists('locations');
    }
};
