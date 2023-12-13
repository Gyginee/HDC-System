<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    /**
     * Display a listing of projects.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $projects = Project::all();
        return response()->json(['data' => $projects], 200);
    }

    /**
     * Store a newly created project in storage.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $project = Project::create($request->all());
        return response()->json(['data' => $project], 201);
    }

    /**
     * Display the specified project.
     *
     * @param  Project  $project
     * @return JsonResponse
     */
    public function show(Project $project)
    {
        return response()->json(['data' => $project], 200);
    }

    /**
     * Update the specified project in storage.
     *
     * @param  Request  $request
     * @param  Project  $project
     * @return JsonResponse
     */
    public function update(Request $request, Project $project)
    {
        $project->update($request->all());
        return response()->json(['data' => $project], 200);
    }

    /**
     * Remove the specified project from storage.
     *
     * @param  Project  $project
     * @return JsonResponse
     */
    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(null, 204);
    }
}
