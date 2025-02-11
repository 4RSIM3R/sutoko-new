<?php

use App\Http\Controllers\Plugins\ScheduleController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice/schedule', 'as' => 'backoffice.schedule.', 'middleware' => ['auth']], function () {
    Route::get('/', [ScheduleController::class, 'index'])->name('index');
});
