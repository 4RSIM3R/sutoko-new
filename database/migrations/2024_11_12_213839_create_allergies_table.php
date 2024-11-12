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
        Schema::create('allergies', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Encounter::class)->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->enum('type', ['environment', 'food', 'medication']);
            $table->string('notes');
            $table->json('coding')->comment('snomed payload for post');
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
        Schema::dropIfExists('allergies');
    }
};
