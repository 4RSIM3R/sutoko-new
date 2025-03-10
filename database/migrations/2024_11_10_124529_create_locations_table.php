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
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('physical_type_code');
            $table->string('physical_type_name');
            $table->integer('capacity')->default(0);
            $table->enum('encounter_type', ['outpatient', 'inpatient'])->default('outpatient');
            $table->integer('administration_fee')->default(0);
            $this->satu_sehat_fields($table);
            $this->base_fields($table);
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
