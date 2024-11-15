<?php

use App\Http\Controllers\Backoffice\EncounterController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice/encounter', 'as' => 'backoffice.encounter.', 'middleware' => ['auth']], function () {
    Route::get('', [EncounterController::class, 'index'])->name('index');
    Route::get('create', [EncounterController::class, 'create'])->name('create');
    Route::post('store', [EncounterController::class, 'store'])->name('store');
    Route::get('{id}/anamnesis', [EncounterController::class, 'anamnesis'])->name('anamnesis');
    Route::get('{id}/observation', [EncounterController::class, 'observation'])->name('observation');
    Route::get('{id}/diagnose', [EncounterController::class, 'diagnose'])->name('diagnose');
    Route::get('{id}/medication', [EncounterController::class, 'medication'])->name('medication');
});
