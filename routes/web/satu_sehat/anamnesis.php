<?php

use App\Http\Controllers\Backoffice\SatuSehat\AnamnesisController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice/encounter', 'as' => 'backoffice.encounter.', 'middleware' => ['auth']], function () {
    Route::get('{id}/main-complaint', [AnamnesisController::class, 'main_complaint_form'])->name('main-complaint');
    Route::post('{id}/main-complaint', [AnamnesisController::class, 'main_complaint_store'])->name('main-complaint');
    Route::get('{id}/medical-history', [AnamnesisController::class, 'medical_history_form'])->name('medical-history');
    Route::post('{id}/medical-history', [AnamnesisController::class, 'medical_history_store'])->name('medical-history');
    Route::get('{id}/family-history', [AnamnesisController::class, 'family_history_form'])->name('family-history');
    Route::post('{id}/family-history', [AnamnesisController::class, 'family_history_store'])->name('family-history');
    Route::get('{id}/allergy-history', [AnamnesisController::class, 'allergy_history_form'])->name('allergy-history');
    Route::post('{id}/allergy-history', [AnamnesisController::class, 'allergy_history_store'])->name('allergy-history');
    Route::get('{id}/medication-history', [AnamnesisController::class, 'medication_history_form'])->name('medication-history');
    Route::post('{id}/medication-history', [AnamnesisController::class, 'medication_history_store'])->name('medication-history');
});
