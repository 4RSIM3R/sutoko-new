<?php 

use Illuminate\Support\Facades\Route;

Route::prefix('charge')->group(function () {
    Route::get('/', [App\Http\Controllers\Backoffice\ChargeController::class, 'index']);
});