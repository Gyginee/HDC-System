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
use App\Http\Controllers\backend\CategoryController;
use App\Http\Controllers\backend\FixedCostController;
use App\Http\Controllers\backend\CostTypeController;
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
  Route::prefix('projects')->group(function () {

    // Explicit names
    Route::apiResource('project', ProjectController::class)->names('projects');

    Route::apiResource('detail', ProjectDetailController::class)->names('project-details');



    Route::resource('project-permissions', ProjectPermissionController::class)
      ->names('project-permissions');

    //function with req body
    Route::post('count', [ProjectController::class, 'projectCount']);
    Route::post('total', [ProjectController::class, 'projectTotal']);

    //Project Detail
    Route::post('total-cost-type', [ProjectDetailController::class, 'getTotalCostByType']);
    Route::post('total-cost-id', [ProjectDetailController::class, 'getTotalCostById']);
    //function with req body
    Route::post('detailcount', [ProjectDetailController::class, 'project_detailCount']);
    Route::post('detailtotal', [ProjectDetailController::class, 'project_detailTotal']);

  });

  // Group internal related resources
  Route::prefix('internals')->group(function () {
    Route::apiResource('fixedcost', FixedCostController::class)->names('fixed-cost');
    Route::apiResource('costtype', CostTypeController::class)->names('cost-type');
  });
  // Group staff related resources
  Route::prefix('staffs')->group(function () {

    Route::resource('staff', StaffController::class)->names('staff');

    Route::resource('detail', StaffDetailController::class)->names('staff-detail');

    Route::resource('salary', SalaryController::class)->names('salary');
  });

  // Remaining resources
  Route::apiResource('assets', AssetsController::class);
  Route::apiResource('user-permission', UserPermissionController::class);


  Route::prefix('clients')->group(function () {
    Route::apiResource('clients', ClientController::class);
    Route::post('get-real-cost', [ClientController::class, 'getRealCost']);
  });
  Route::apiResource('permissions', PermissionController::class);
  Route::apiResource('roles', RoleController::class);
  Route::apiResource('status', StatusController::class);
  Route::apiResource('types', TypeController::class);
  Route::apiResource('category', CategoryController::class);
  Route::apiResource('vendors', VendorController::class);
});
