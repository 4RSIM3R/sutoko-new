<?php

use App\Http\Controllers\Backoffice\PatientController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice/patient', 'as' => 'backoffice.patient.', 'middleware' => ['auth']], function () {
    Route::get('', [PatientController::class, 'index'])->name('index');
    Route::get('create', [PatientController::class, 'create'])->name('create');
    Route::post('store', [PatientController::class, 'store'])->name('store');
    Route::get('{patient}', [PatientController::class, 'show'])->name('show');
    Route::put('{patient}', [PatientController::class, 'update'])->name('update');
    Route::delete('{patient}', [PatientController::class, 'destroy'])->name('destroy');
});
