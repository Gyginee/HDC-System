<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;

use App\Models\Project_detail;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProjectDetailController extends Controller
{
    /**
     * Display a listing of project details.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $projectDetails = Project_detail::all();
        return response()->json(['data' => $projectDetails], 200);
    }

    /**
     * Store a newly created project detail in storage.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $projectDetail = Project_detail::create($request->all());
        return response()->json(['data' => $projectDetail], 201);
    }

    /**
     * Display the specified project detail.
     *
     * @param  Project_detail  $projectDetail
     * @return JsonResponse
     */
    public function show(Project_detail $projectDetail)
    {
        return response()->json(['data' => $projectDetail], 200);
    }

    /**
     * Update the specified project detail in storage.
     *
     * @param  Request  $request
     * @param  Project_detail  $projectDetail
     * @return JsonResponse
     */
    public function update(Request $request, Project_detail $projectDetail)
    {
        $projectDetail->update($request->all());
        return response()->json(['data' => $projectDetail], 200);
    }

    /**
     * Remove the specified project detail from storage.
     *
     * @param  Project_detail  $projectDetail
     * @return JsonResponse
     */
    public function destroy(Project_detail $projectDetail)
    {
        $projectDetail->delete();
        return response()->json(null, 204);
    }
}
