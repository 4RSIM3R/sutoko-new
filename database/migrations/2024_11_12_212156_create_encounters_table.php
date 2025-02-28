<?php

use App\Models\Location;
use App\Models\Patient;
use App\Models\Assurance;
use App\Models\Practioner;
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
        Schema::create('encounters', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Patient::class);
            $table->foreignIdFor(Practioner::class);
            $table->foreignIdFor(Location::class);
            $table->foreignIdFor(Assurance::class);
            $table->string('satu_sehat_id');
            $table->string('status');
            $table->boolean('sync_satu_sehat')->default(true);
            $table->json('response')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['patient_id', 'practioner_id', 'assurance_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('encounters');
    }
};
