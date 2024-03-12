<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;

use App\Models\Project_permission;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProjectPermissionController extends Controller
{
    /**
     * Display a listing of project permissions.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $projectPermissions = Project_permission::all();
        return response()->json(['data' => $projectPermissions], 200);
    }

    /**
     * Store a newly created project permission in storage.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $projectPermission = Project_permission::create($request->all());
        return response()->json(['data' => $projectPermission], 201);
    }

    /**
     * Display the specified project permission.
     *
     * @param  Project_permission  $projectPermission
     * @return JsonResponse
     */
    public function show(Project_permission $projectPermission)
    {
        return response()->json(['data' => $projectPermission], 200);
    }

    /**
     * Update the specified project permission in storage.
     *
     * @param  Request  $request
     * @param  Project_permission  $projectPermission
     * @return JsonResponse
     */
    public function update(Request $request, Project_permission $projectPermission)
    {
        $projectPermission->update($request->all());
        return response()->json(['data' => $projectPermission], 200);
    }

    /**
     * Remove the specified project permission from storage.
     *
     * @param  Project_permission  $projectPermission
     * @return JsonResponse
     */
    public function destroy(Project_permission $projectPermission)
    {
        $projectPermission->delete();
        return response()->json(null, 204);
    }
}
