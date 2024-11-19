<?php

use App\Http\Controllers\Backoffice\SatuSehat\ConditionController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice/encounter', 'as' => 'backoffice.encounter.', 'middleware' => ['auth']], function () {
    Route::get('{id}/condition', [ConditionController::class, 'condition_form'])->name('condition');
    Route::post('{id}/condition', [ConditionController::class, 'condition_store'])->name('condition');
    Route::get('{id}/treatment', [ConditionController::class, 'treatment_form'])->name('treatment');
    Route::post('{id}/treatment', [ConditionController::class, 'treatment_store'])->name('treatment');
    Route::get('{id}/nutrition', [ConditionController::class, 'nutrition_form'])->name('nutrition');
    Route::post('{id}/nutrition', [ConditionController::class, 'nutrition_store'])->name('nutrition');
    Route::get('{id}/medication', [ConditionController::class, 'medication_form'])->name('medication');
    Route::post('{id}/medication', [ConditionController::class, 'medication_store'])->name('medication');
    Route::get('{id}/follow-up', [ConditionController::class, 'follow_up_form'])->name('follow-up');
    Route::post('{id}/follow-up', [ConditionController::class, 'follow_up_store'])->name('follow-up');
});

