<?php

use App\Http\Controllers\Backoffice\SatuSehat\ConditionController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice/encounter', 'as' => 'backoffice.encounter.', 'middleware' => ['auth']], function () {
    Route::get('{id}/ttv', [ConditionController::class, 'ttv_form'])->name('ttv');
    Route::post('{id}/ttv', [ConditionController::class, 'ttv_store'])->name('ttv');
    Route::get('{id}/psychological', [ConditionController::class, 'psychological_form'])->name('psychological');
    Route::post('{id}/psychological', [ConditionController::class, 'psychological_store'])->name('psychological');
    Route::get('{id}/htt', [ConditionController::class, 'htt_form'])->name('htt');
    Route::post('{id}/htt', [ConditionController::class, 'htt_store'])->name('htt');
    Route::get('{id}/summary', [ConditionController::class, 'summary_form'])->name('summary');
    Route::post('{id}/summary', [ConditionController::class, 'summary_store'])->name('summary');
});
