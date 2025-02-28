<?php

use App\Http\Controllers\Backoffice\LocationController;
use Illuminate\Support\Facades\Route;


Route::group(['prefix' => 'backoffice/location', 'as' => 'backoffice.location.', 'middleware' => ['auth']], function () {
    Route::get('', [LocationController::class, 'index'])->name('index');
    Route::get('create', [LocationController::class, 'create'])->name('create');
    Route::get('fetch', [LocationController::class, 'fetch'])->name('fetch');
    Route::post('store', [LocationController::class, 'store'])->name('store');
    Route::get('{patient}', [LocationController::class, 'show'])->name('show');
    Route::put('{patient}', [LocationController::class, 'update'])->name('update');
    Route::delete('{patient}', [LocationController::class, 'destroy'])->name('destroy');
});
