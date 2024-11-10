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
        Schema::create('regions', function (Blueprint $table) {
            $table->id();
            // Level wilayah (1: Provinsi, 2: Kabupaten, 3: Kecamatan, 4: Desa/Kelurahan)
            $table->integer('level')->nullable();
            $table->string('kode_wilayah', 20); // Kode wilayah unik
            $table->string('nama_wilayah'); // Nama wilayah
            $table->string('parent')->nullable(); // Parent wilayah (kode - nama wilayah)
            $table->string('state')->nullable(); // State atau negara bagian
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('regions');
    }
};
