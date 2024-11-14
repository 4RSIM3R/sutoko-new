<?php

use App\Http\Controllers\Backoffice\MedicineController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice/medicine', 'as' => 'backoffice.medicine.', 'middleware' => ['auth']], function () {
    Route::get('', [MedicineController::class, 'index'])->name('index');
    Route::get('create', [MedicineController::class, 'create'])->name('create');
    Route::post('store', [MedicineController::class, 'store'])->name('store');
    Route::get('fetch', [MedicineController::class, 'fetch'])->name('fetch');
    Route::get('{medicine}', [MedicineController::class, 'show'])->name('show');
    Route::put('{medicine}', [MedicineController::class, 'update'])->name('update');
    Route::delete('{medicine}', [MedicineController::class, 'destroy'])->name('destroy');
});
