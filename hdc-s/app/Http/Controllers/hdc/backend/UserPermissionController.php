<?php

namespace App\Http\Controllers\hdc\backend;

use App\Http\Controllers\Controller;

use App\Models\User_permission;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserPermissionController extends Controller
{
    /**
     * Display a listing of user permissions.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $userPermissions = User_permission::all();
        return response()->json(['data' => $userPermissions], 200);
    }

    /**
     * Store a newly created user permission in storage.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $userPermission = User_permission::create($request->all());
        return response()->json(['data' => $userPermission], 201);
    }

    /**
     * Display the specified user permission.
     *
     * @param  User_permission  $userPermission
     * @return JsonResponse
     */
    public function show(User_permission $userPermission)
    {
        return response()->json(['data' => $userPermission], 200);
    }

    /**
     * Update the specified user permission in storage.
     *
     * @param  Request  $request
     * @param  User_permission  $userPermission
     * @return JsonResponse
     */
    public function update(Request $request, User_permission $userPermission)
    {
        $userPermission->update($request->all());
        return response()->json(['data' => $userPermission], 200);
    }

    /**
     * Remove the specified user permission from storage.
     *
     * @param  User_permission  $userPermission
     * @return JsonResponse
     */
    public function destroy(User_permission $userPermission)
    {
        $userPermission->delete();
        return response()->json(null, 204);
    }
}
