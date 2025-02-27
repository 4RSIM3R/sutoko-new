<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Plugins\Form\AppointmentFormController;
use App\Http\Controllers\Plugins\Form\RegistrationFormController;
use App\Http\Controllers\Plugins\RegistrationController;
use App\Http\Controllers\Plugins\ScheduleController;
use Illuminate\Support\Facades\Route;

Route::get('', [HomeController::class, 'index'])->name('home');

Route::get('appointment', [AppointmentFormController::class, 'form'])->name('appointment');
Route::post('appointment', [AppointmentFormController::class, 'store'])->name('appointment');

Route::get('registration', [RegistrationFormController::class, 'form'])->name('registration');
Route::post('registration', [RegistrationFormController::class, 'store'])->name('registration');

Route::get('schedule', [ScheduleController::class, 'index'])->name('schedule');
