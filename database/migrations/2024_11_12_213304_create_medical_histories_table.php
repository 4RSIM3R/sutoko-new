<?php

use App\Models\Encounter;
use App\Models\Location;
use App\Models\Patient;
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
        Schema::create('medical_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Encounter::class)->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->enum('type', ['personal', 'family']);
            $table->string('notes');
            $table->json('coding')->comment('snomed payload for main coding');
            $table->json('outcome')->comment('snomed payload for outcome, used when type is family');
            $table->boolean('contributed_to_death')->nullable()->comment('set when type is family');
            $table->json('request')->nullable();
            $table->json('response')->nullable();
            $table->timestamps();
            $table->dateTime('synced_at')->nullable();
            $table->softDeletes();
            $table->index(['encounter_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_histories');
    }
};