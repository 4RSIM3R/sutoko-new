<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Plugins\AppointmentController;
use App\Http\Controllers\Plugins\RegistrationController;
use App\Http\Controllers\Plugins\ScheduleController;
use Illuminate\Support\Facades\Route;

Route::get('', [HomeController::class, 'index'])->name('home');

Route::get('appointment', [RegistrationController::class, 'appointment_form'])->name('appointment');
Route::post('appointment', [RegistrationController::class, 'appointment_store'])->name('appointment');

Route::get('registration', [RegistrationController::class, 'registration_form'])->name('registration');
Route::post('registration', [RegistrationController::class, 'registration_store'])->name('registration');

Route::get('schedule', [ScheduleController::class, 'index'])->name('schedule');
