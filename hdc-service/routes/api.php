<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AssetsController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectDetailController;
use App\Http\Controllers\ProjectPermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SalaryController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\UserPermissionController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\StaffDetailController;



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



//Route::group(['prefix' => 'api'], function () {
Route::group(['prefix'], function () {
    $controllers = [
        'assets' => AssetsController::class,
        'clients' => ClientController::class,
        'permissions' => PermissionController::class,
        'projects' => ProjectController::class,
        'project-details' => ProjectDetailController::class,
        'project-permissiones' => ProjectPermissionController::class,
        'roles' => RoleController::class,
        'salary' => SalaryController::class,
        'staffs' => StaffController::class,
        'statuses' => StatusController::class,
        'types' => TypeController::class,
        'user-permissions' => UserPermissionController::class,
        'vendors' => VendorController::class,
        'staff_details' => StaffDetailController::class,
    ];
    foreach ($controllers as $resource => $controller) {
        Route::resource($resource, $controller);
    }
});
