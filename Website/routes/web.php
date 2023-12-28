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

// Middleware to redirect authenticated users from login page to home
Route::post('login', [LoginController::class, 'login'])->middleware('guest');
Route::get('login', [LoginController::class, 'showLoginForm'])->name('login')->middleware('guest');
Route::get('logout', [LoginController::class, 'logout'])->name('logout')->middleware('auth');


// Home page accessible only to authenticated users
Route::get('/', [DashboardController::class, 'index'])->middleware('guest');

Route::get('projects', [ProjectController::class, 'index'])->middleware('guest');
Route::get('project/detail', [ProjectDetailController::class, 'index'])->middleware('guest');


Route::get('clients', [ClientController::class, 'index'])->middleware('guest');
Route::get('vendors', [VendorController::class, 'index'])->middleware('guest');

// Accessible only to authenticated users
Route::get('page-2', [Page2::class, 'index'])->name('pages-page-2')->middleware('auth');

// Locale - accessible only to authenticated users
Route::get('lang/{locale}', [LanguageController::class, 'swap'])->middleware('auth');

// Pages - accessible only to authenticated users
Route::get('pages/misc-error', [MiscError::class, 'index'])->name('pages-misc-error')->middleware('auth');
