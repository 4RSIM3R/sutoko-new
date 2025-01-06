<?php

use App\Http\Controllers\Plugins\AppointmentController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'appointment', 'as' => 'appointment.'], function () {
    Route::get('/', [AppointmentController::class, 'index'])->name('index');
});
