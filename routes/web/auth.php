<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth'], function () {
    Route::get('login', [AuthController::class, 'login'])->name('login');
    Route::post('attempt', [AuthController::class, 'attempt'])->name('attempt');
    Route::get('forgot', [AuthController::class, 'forgot'])->name('forgot');
    Route::get('reset', [AuthController::class, 'reset'])->name('reset');
    Route::get('logout', [AuthController::class, 'logout'])->name('logout');
});
