<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\backend\AssetsController;
use App\Http\Controllers\backend\ClientController;
use App\Http\Controllers\backend\PermissionController;
use App\Http\Controllers\backend\ProjectController;
use App\Http\Controllers\backend\ProjectDetailController;
use App\Http\Controllers\backend\ProjectPermissionController;
use App\Http\Controllers\backend\RoleController;
use App\Http\Controllers\backend\SalaryController;
use App\Http\Controllers\backend\StaffController;
use App\Http\Controllers\backend\StaffDetailController;
use App\Http\Controllers\backend\StatusController;
use App\Http\Controllers\backend\TypeController;
use App\Http\Controllers\backend\VendorController;
use App\Http\Controllers\backend\UserPermissionController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});


// Add API versioning
Route::prefix('v1')->group(function () {

  // Group project related resources
  Route::prefix('project')->group(function () {

    // Explicit names
    Route::resource('projects', ProjectController::class)->names('projects');

    Route::resource('details', ProjectDetailController::class)->names('project-details');
    //function with req body
    Route::post('detailcount', [ProjectDetailController::class, 'project_detailCount']);
    Route::post('detailtotal', [ProjectDetailController::class, 'project_detailTotal']);

    Route::resource('project-permissions', ProjectPermissionController::class)
      ->names('project-permissions');

    //function with req body
    Route::post('count', [ProjectController::class, 'projectCount']);
    Route::post('total', [ProjectController::class, 'projectTotal']);
  });

  // Group staff related resources
  Route::prefix('staff')->group(function () {

    Route::resource('staffs', StaffController::class)->names('staffs');

    Route::resource('details', StaffDetailController::class)->names('staff-details');

    Route::resource('salaries', SalaryController::class)->names('salaries');
  });

  // Remaining resources
  Route::apiResource('assets', AssetsController::class);
  Route::apiResource('user-permission', UserPermissionController::class);
  Route::apiResource('clients', ClientController::class);
  Route::apiResource('permissions', PermissionController::class);
  Route::apiResource('roles', RoleController::class);
  Route::apiResource('status', StatusController::class);
  Route::apiResource('types', TypeController::class);
  Route::apiResource('vendors', VendorController::class);
});
