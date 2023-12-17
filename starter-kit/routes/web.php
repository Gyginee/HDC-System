<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\language\LanguageController;
use App\Http\Controllers\pages\HomePage;
use App\Http\Controllers\pages\Page2;
use App\Http\Controllers\pages\MiscError;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\pages\DashboardController;

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

// Authentication Routes
/*
Route::get('/', function () {
  // Kiểm tra xem người dùng có được xác thực hay không
  if (Auth::check()) {
      // Nếu đã xác thực, chuyển hướng đến bảng điều khiển
      return view('/');
  } else {
      // Nếu chưa xác thực, chuyển hướng đến trang đăng nhập
      return redirect('/login');
  }
}); */
/*
Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('login', [LoginController::class, 'login']);
Route::get('logout', [LoginController::class, 'logout'])->name('logout');

Route::get('/page-2', [Page2::class, 'index'])->name('pages-page-2')->middleware('authenticated');

// locale
Route::get('lang/{locale}', [LanguageController::class, 'swap'])->middleware('authenticated');

// pages
Route::get('/pages/misc-error', [MiscError::class, 'index'])->name('pages-misc-error')->middleware('authenticated');

 */
// Middleware to redirect authenticated users from login page to home
Route::post('login', [LoginController::class, 'login'])->middleware('guest');
Route::get('login', [LoginController::class, 'showLoginForm'])->name('login')->middleware('guest');
Route::get('logout', [LoginController::class, 'logout'])->name('logout')->middleware('auth');


// Home page accessible only to authenticated users
Route::get('/', [DashboardController::class, 'index'])->middleware('guest');

// Accessible only to authenticated users
Route::get('/page-2', [Page2::class, 'index'])->name('pages-page-2')->middleware('auth');

// Locale - accessible only to authenticated users
Route::get('lang/{locale}', [LanguageController::class, 'swap'])->middleware('auth');

// Pages - accessible only to authenticated users
Route::get('/pages/misc-error', [MiscError::class, 'index'])->name('pages-misc-error')->middleware('auth');
