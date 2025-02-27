<?php

use App\Http\Controllers\Plugins\AppointmentController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice/appointment', 'as' => 'backoffice.appointment.', 'middleware' => ['auth']], function () {
    Route::get('', [AppointmentController::class, 'index'])->name('index');
    Route::post('', [AppointmentController::class, 'index'])->name('index');
});
