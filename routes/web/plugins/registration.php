<?php

namespace App\Http\Controllers\Plugins;

use App\Http\Controllers\Plugins\RegistrationController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'registration', 'as' => 'registration.'], function () {
    Route::get('/', [QueueController::class, 'index'])->name('index');
});
