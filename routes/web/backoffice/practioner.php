<?php

use App\Http\Controllers\Backoffice\PractionerController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice/practioner', 'as' => 'backoffice.practioner.'], function () {
    Route::get('', [PractionerController::class, 'index'])->name('index');
    Route::get('create', [PractionerController::class, 'create'])->name('create');
    Route::post('store', [PractionerController::class, 'store'])->name('store');
    Route::get('{practioner}', [PractionerController::class, 'show'])->name('show');
    Route::put('{practioner}', [PractionerController::class, 'update'])->name('update');
    Route::delete('{practioner}', [PractionerController::class, 'destroy'])->name('destroy');
});
