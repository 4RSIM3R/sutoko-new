<?php

use App\Http\Controllers\ScheduleController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'schedule', 'as' => 'schedule.'], function () {
    Route::get('/', [ScheduleController::class, 'index'])->name('index');
});
