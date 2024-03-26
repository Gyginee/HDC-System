<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\language\LanguageController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\pages\DashboardController;
use App\Http\Controllers\pages\ProjectController;
use App\Http\Controllers\pages\ProjectDetailController;
use App\Http\Controllers\pages\ClientController;
use App\Http\Controllers\pages\VendorController;
use App\Http\Controllers\pages\FixedCostController;


// Main Page Route

Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login'])->name('login.submit');
Route::get('logout', [LoginController::class, 'logout'])->name('logout');

// Routes for admin and manager
Route::middleware(['auth.staff', 'role:admin,manager'])->group(function () {

  Route::get('projects', [ProjectController::class, 'index'])->name('projects');
  Route::get('project/detail/{id}', [ProjectDetailController::class, 'index'])
    ->where('id', '[0-9]+')
    ->name('projects-detail');

  Route::get('clients', [ClientController::class, 'index'])->name('clients');
  Route::get('vendors', [VendorController::class, 'index'])->name('vendors');

  Route::get('fixedcost', [FixedCostController::class, 'index'])->name('fixedcost');

  // Locale - accessible only to authenticated users
  Route::get('lang/{locale}', [LanguageController::class, 'swap']);
});

// Routes for employees
Route::middleware(['auth.staff', 'role:employee'])->group(function () {

});

// Home page accessible only to authenticated users
Route::middleware(['auth.staff'])->group(function () {

  Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
  Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

});
