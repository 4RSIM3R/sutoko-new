<?php

use App\Http\Controllers\Backoffice\SatuSehat\ConditionController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice/encounter', 'as' => 'backoffice.encounter.', 'middleware' => ['auth']], function () {
    // Route::get('{id}', [ConditionController::class, 'index'])->name('index');
    // Route::get('{id}/major-medical-complaint', [ConditionController::class, 'store'])->name('store');
    // Route::get('{id}/accompany-medical-complaint', [ConditionController::class, 'store'])->name('store');
    // Route::get('{id}/personal-medical-history', [ConditionController::class, 'store'])->name('store');
    // Route::get('{id}/family-medical-history', [ConditionController::class, 'store'])->name('store');
    // Route::get('{id}/allergy-history', [ConditionController::class, 'store'])->name('store');
    // Route::get('{id}/medication-history', [ConditionController::class, 'store'])->name('store');
});

