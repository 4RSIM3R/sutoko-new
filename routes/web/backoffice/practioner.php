<?php

use App\Http\Controllers\Backoffice\PractionerController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice/practioner', 'as' => 'backoffice.practioner.', 'middleware' => ['auth']], function () {
    Route::get('', [PractionerController::class, 'index'])->name('index');
    Route::get('create', [PractionerController::class, 'create'])->name('create');
    Route::post('store', [PractionerController::class, 'store'])->name('store');
    Route::get('fetch', [PractionerController::class, 'fetch'])->name('fetch');
    Route::get('{id}', [PractionerController::class, 'show'])->name('show');
    Route::put('{id}', [PractionerController::class, 'update'])->name('update');
    Route::delete('{id}', [PractionerController::class, 'destroy'])->name('destroy');
});
