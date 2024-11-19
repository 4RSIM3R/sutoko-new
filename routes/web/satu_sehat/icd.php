<?php

use App\Http\Controllers\Backoffice\SatuSehat\IcdController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice/encounter', 'as' => 'backoffice.encounter.', 'middleware' => ['auth']], function () {
    Route::get('icd-9', [IcdController::class, 'icd_9']);
    Route::get('icd-10', [IcdController::class, 'icd_10']);
});
