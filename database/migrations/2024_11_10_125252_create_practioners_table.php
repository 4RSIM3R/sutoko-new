<?php

use App\Traits\BaseMigration;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    use BaseMigration;

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('practioners', function (Blueprint $table) {
            $table->id();
            $table->string('nik');
            $table->string('employee_id');
            $table->string('prefix');
            $table->string('name');
            $table->string('suffix');
            $table->string('birth_place');
            $table->date('birth_date');
            $table->enum('gender', ['male', 'female']);
            $table->string('religion');
            $table->string('occupation');
            $table->string('specialty');
            $table->date('str_expired')->nullable();
            $table->date('sip_expired')->nullable();
            $this->contact_fields($table);
            $this->address_fields($table);
            $this->satu_sehat_fields($table);
            $this->base_fields($table);
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
