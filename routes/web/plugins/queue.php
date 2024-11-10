<?php

use App\Http\Controllers\Plugins\QueueController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'queue', 'as' => 'queue.'], function () {
    Route::get('/', [QueueController::class, 'index'])->name('index');
});
