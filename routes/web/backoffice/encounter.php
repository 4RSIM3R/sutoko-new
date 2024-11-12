<?php

use App\Http\Controllers\Backoffice\EncounterController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice/encounter', 'as' => 'backoffice.encounter.', 'middleware' => ['auth']], function () {
    Route::get('', [EncounterController::class, 'index'])->name('index');
    Route::get('create', [EncounterController::class, 'create'])->name('create');
    Route::post('store', [EncounterController::class, 'store'])->name('store');
});
