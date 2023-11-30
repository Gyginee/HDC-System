<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\hdc\backend\AssetsController;
use App\Http\Controllers\hdc\backend\ClientController;
use App\Http\Controllers\hdc\backend\PermissionController;
use App\Http\Controllers\hdc\backend\ProjectController;
use App\Http\Controllers\hdc\backend\ProjectDetailController;
use App\Http\Controllers\hdc\backend\ProjectPermissionController;
use App\Http\Controllers\hdc\backend\RoleController;
use App\Http\Controllers\hdc\backend\SalaryController;
use App\Http\Controllers\hdc\backend\StaffController;
use App\Http\Controllers\hdc\backend\StaffDetailController;
use App\Http\Controllers\hdc\backend\StatusController;
use App\Http\Controllers\hdc\backend\TypeController;
use App\Http\Controllers\hdc\backend\VendorController;
use App\Http\Controllers\hdc\backend\UserPermissionController;


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
Route::prefix('v1')->group(function() {

    // Group project related resources
    Route::prefix('project')->group(function() {

        // Explicit names
        Route::resource('projects', ProjectController::class)->names('projects');

        Route::resource('details', ProjectDetailController::class)->names('project-details');

        Route::resource('project-permissions', ProjectPermissionController::class)
            ->names('project-permissions');

    });

    // Group staff related resources
    Route::prefix('staff')->group(function() {

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
