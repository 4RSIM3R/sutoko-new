<?php

use App\Http\Controllers\Backoffice\RegionController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice/region', 'as' => 'backoffice.region.', 'middleware' => ['auth']], function () {
    Route::get('province', [RegionController::class, 'province'])->name('province');
    Route::get('regency', [RegionController::class, 'regency'])->name('regency');
    Route::get('district', [RegionController::class, 'district'])->name('district');
    Route::get('village', [RegionController::class, 'village'])->name('village');
});
