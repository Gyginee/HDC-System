<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\language\LanguageController;
use App\Http\Controllers\pages\HomePage;
use App\Http\Controllers\pages\Page2;
use App\Http\Controllers\pages\MiscError;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\pages\DashboardController;
use App\Http\Controllers\pages\ProjectController;
use App\Http\Controllers\pages\ProjectDetailController;
use App\Http\Controllers\pages\ClientController;
use App\Http\Controllers\pages\VendorController;
use Illuminate\Routing\RouteGroup;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


// Main Page Route

Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login'])->name('login.submit');
Route::get('logout', [LoginController::class, 'logout'])->name('logout');

  // Routes for admin and manager
Route::middleware(['auth.staff', 'role:admin,manager'])->group(function () {


  Route::get('projects', [ProjectController::class, 'index'])->name('projects');
  Route::get('project/detail', [ProjectDetailController::class, 'index'])->name('projects-detail');


  Route::get('clients', [ClientController::class, 'index'])->name('clients');
  Route::get('vendors', [VendorController::class, 'index'])->name('vendors');


  // Locale - accessible only to authenticated users
  Route::get('lang/{locale}', [LanguageController::class, 'swap']);
});

// Routes for employees
Route::middleware(['auth.staff', 'role:employee'])->group(function () {

});

  // Home page accessible only to authenticated users
Route::middleware(['auth.staff', 'role:admin,manager,employee'])->group(function () {
  Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
  Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

});


