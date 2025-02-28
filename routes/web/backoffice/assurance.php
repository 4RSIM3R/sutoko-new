<?php

use App\Http\Controllers\Backoffice\AssuranceController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice/assurance', 'as' => 'backoffice.assurance.', 'middleware' => ['auth']], function () {
    Route::get('', [AssuranceController::class, 'index'])->name('index');
    Route::get('create', [AssuranceController::class, 'create'])->name('create');
    Route::post('store', [AssuranceController::class, 'store'])->name('store');
    Route::get('fetch', [AssuranceController::class, 'fetch'])->name('fetch');
    Route::get('{id}', [AssuranceController::class, 'show'])->name('show');
    Route::put('{id}', [AssuranceController::class, 'update'])->name('update');
    Route::delete('{id}', [AssuranceController::class, 'destroy'])->name('destroy');
});
