<?php

use App\Http\Controllers\Backoffice\ChargeController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice/charge', 'as' => 'backoffice.charge.', 'middleware' => ['auth']], function () {
    Route::get('', [ChargeController::class, 'index'])->name('index');
    Route::get('create', [ChargeController::class, 'create'])->name('create');
    Route::post('store', [ChargeController::class, 'store'])->name('store');
    Route::get('{id}', [ChargeController::class, 'show'])->name('show');
    Route::put('{id}', [ChargeController::class, 'update'])->name('update');
    Route::delete('{id}', [ChargeController::class, 'destroy'])->name('destroy');
});
