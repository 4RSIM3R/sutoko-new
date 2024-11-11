<?php

use App\Http\Controllers\Backoffice\ProfileController;
use App\Http\Controllers\Backoffice\RegionController;
use App\Http\Controllers\Backoffice\SettingController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice/setting', 'as' => 'backoffice.setting.', 'middleware' => ['auth']], function () {
    Route::get('profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('profile/update', [ProfileController::class, 'update'])->name('profile.update');

    Route::get('application', [SettingController::class, 'index'])->name('application.index');
    Route::get('application/update', [SettingController::class, 'update'])->name('application.update');
});
