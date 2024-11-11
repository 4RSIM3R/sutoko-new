<?php

use App\Http\Controllers\Backoffice\PaymentAssuranceController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice/payment-assurance', 'as' => 'backoffice.payment-assurance.', 'middleware' => ['auth']], function () {
    Route::get('', [PaymentAssuranceController::class, 'index'])->name('index');
    Route::get('create', [PaymentAssuranceController::class, 'create'])->name('create');
    Route::post('store', [PaymentAssuranceController::class, 'store'])->name('store');
    Route::get('{id}', [PaymentAssuranceController::class, 'show'])->name('show');
    Route::put('{id}', [PaymentAssuranceController::class, 'update'])->name('update');
    Route::delete('{id}', [PaymentAssuranceController::class, 'destroy'])->name('destroy');
});
