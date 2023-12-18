<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;

use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PermissionController extends Controller
{
    /**
     * Display a listing of permissions.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $permissions = Permission::all();
        return response()->json(['data' => $permissions], 200);
    }

    /**
     * Store a newly created permission in storage.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $permission = Permission::create($request->all());
        return response()->json(['data' => $permission], 201);
    }

    /**
     * Display the specified permission.
     *
     * @param  Permission  $permission
     * @return JsonResponse
     */
    public function show(Permission $permission)
    {
        return response()->json(['data' => $permission], 200);
    }

    /**
     * Update the specified permission in storage.
     *
     * @param  Request  $request
     * @param  Permission  $permission
     * @return JsonResponse
     */
    public function update(Request $request, Permission $permission)
    {
        $permission->update($request->all());
        return response()->json(['data' => $permission], 200);
    }

    /**
     * Remove the specified permission from storage.
     *
     * @param  Permission  $permission
     * @return JsonResponse
     */
    public function destroy(Permission $permission)
    {
        $permission->delete();
        return response()->json(null, 204);
    }
}
