<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class RoleController extends Controller
{
    /**
     * Display a listing of roles.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $roles = Role::all();
        return response()->json(['data' => $roles], 200);
    }

    /**
     * Store a newly created role in storage.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $role = Role::create($request->all());
        return response()->json(['data' => $role], 201);
    }

    /**
     * Display the specified role.
     *
     * @param  Role  $role
     * @return JsonResponse
     */
    public function show(Role $role)
    {
        return response()->json(['data' => $role], 200);
    }

    /**
     * Update the specified role in storage.
     *
     * @param  Request  $request
     * @param  Role  $role
     * @return JsonResponse
     */
    public function update(Request $request, Role $role)
    {
        $role->update($request->all());
        return response()->json(['data' => $role], 200);
    }

    /**
     * Remove the specified role from storage.
     *
     * @param  Role  $role
     * @return JsonResponse
     */
    public function destroy(Role $role)
    {
        $role->delete();
        return response()->json(null, 204);
    }
}
