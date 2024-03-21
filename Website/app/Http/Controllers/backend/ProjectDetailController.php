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
  public function project_detailCount(Request $request)
  {
    $vendor_id = $request->input('vendor_id');

    if (!$vendor_id) {
      return response()->json(['error' => 'Client ID parameter is missing'], 400);
    }

    $count = Project_detail::where('vendor_id', $vendor_id)->count();

    return response()->json(['count' => $count], 200);
  }

  public function project_detailTotal(Request $request)
  {
    $vendor_id = $request->input('vendor_id');

    if (!$vendor_id) {
      return response()->json(['error' => 'Client ID parameter is missing'], 400);
    }

    $totalCost = Project_detail::where('vendor_id', $vendor_id)->sum('cost');

    return response()->json(['total_cost' => $totalCost], 200);
  }
  /**
   * Lấy tổng các chi phí theo id và type.
   *
   * @param  Request  $request
   * @param  Project_detail  $Project_detail
   * @return JsonResponse
   */
  public function getTotalCost(Request $request)
  {

    // Lấy id và type từ request
    $id = $request->input('id');
    $type = $request->input('type');

    // Lấy tổng các trường client_cost, internal_cost, và real_cost
    $totalClientCost = Project_detail::where('project_id', $id)
      ->where('type', $type)
      ->sum('client_cost');

    $totalInternalCost = Project_detail::where('project_id', $id)
      ->where('type', $type)
      ->sum('internal_cost');

    $totalRealCost = Project_detail::where('project_id', $id)
      ->where('type', $type)
      ->sum('real_cost');

    // Trả về kết quả
    return response()->json([
      'total_client_cost' => $totalClientCost,
      'total_internal_cost' => $totalInternalCost,
      'total_real_cost' => $totalRealCost,
    ]);
  }
}
