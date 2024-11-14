<?php

use App\Http\Controllers\Backoffice\PatientController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice/patient', 'as' => 'backoffice.patient.', 'middleware' => ['auth']], function () {
    Route::get('', [PatientController::class, 'index'])->name('index');
    Route::get('create', [PatientController::class, 'create'])->name('create');
    Route::post('store', [PatientController::class, 'store'])->name('store');
    Route::get('fetch', [PatientController::class, 'fetch'])->name('fetch');
    Route::get('{id}', [PatientController::class, 'show'])->name('show');
    Route::put('{id}', [PatientController::class, 'update'])->name('update');
    Route::delete('{id}', [PatientController::class, 'destroy'])->name('destroy');
});
