<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
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
      try {
          $projectDetail->delete();
          return response()->json([
              'success' => true,
              'message' => 'Project detail deleted successfully'
          ], Response::HTTP_NO_CONTENT);
      } catch (\Exception $e) {
          return response()->json([
              'success' => false,
              'message' => 'Failed to delete project detail',
              'error' => $e->getMessage()
          ], Response::HTTP_INTERNAL_SERVER_ERROR);
      }
  }
 /**
   * Remove the specified project detail from storage.
   *
   * @param  Project_detail  $projectDetail
   * @return JsonResponse
   */
  public function project_detailCount(Request $request)
  {
    $vendor_id = $request->input('vendor_id');

    if (!$vendor_id) {
      return response()->json(['error' => 'Vendor ID parameter is missing'], 400);
    }

    $count = Project_detail::where('vendor_id', $vendor_id)->count();

    return response()->json(['count' => $count], 200);
  }

  public function project_detailTotal(Request $request)
  {
    $vendor_id = $request->input('vendor_id');

    if (!$vendor_id) {
      return response()->json(['error' => 'Vendor ID parameter is missing'], 400);
    }

    $totalCost = Project_detail::where('vendor_id', $vendor_id)->sum('real_internal_cost');

    return response()->json(['total_cost' => $totalCost], 200);
  }
  /**
   * Lấy tổng các chi phí theo id và type.
   *
   * @param  Request  $request
   * @param  Project_detail  $Project_detail
   * @return JsonResponse
   */
  public function getTotalCostByType(Request $request)
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

    $totalRealClientCost = Project_detail::where('project_id', $id)
      ->where('type', $type)
      ->sum('real_client_cost');

    $totalRealInternalCost = Project_detail::where('project_id', $id)
    ->where('type', $type)
    ->sum('real_internal_cost');

    // Trả về kết quả
    return response()->json([
      'total_client_cost' => $totalClientCost,
      'total_internal_cost' => $totalInternalCost,
      'total_real_client_cost' => $totalRealClientCost,
      'total_real_internal_cost' => $totalRealInternalCost,
    ]);
  }
   /**
   * Lấy tổng các chi phí theo id và type.
   *
   * @param  Request  $request
   * @param  Project_detail  $Project_detail
   * @return JsonResponse
   */
  public function getTotalCostById(Request $request)
  {

    // Lấy id và type từ request
    $project_id = $request->input('project_id');

    // Lấy tổng các trường client_cost, internal_cost, và real_client_cost, real_internal_cost
    $totalClientCost = Project_detail::where('project_id', $project_id)
      ->sum('client_cost');

    $totalInternalCost = Project_detail::where('project_id', $project_id)
      ->sum('internal_cost');

    $totalRealClientCost = Project_detail::where('project_id', $project_id)
      ->sum('real_client_cost');

    $totalRealInternalCost = Project_detail::where('project_id', $project_id)
    ->sum('real_internal_cost');

    // Trả về kết quả
    return response()->json([
      'total_client_cost' => $totalClientCost,
      'total_internal_cost' => $totalInternalCost,
      'total_real_client_cost' => $totalRealClientCost,
      'total_real_internal_cost' => $totalRealInternalCost,
    ]);
  }
 /**
   * Lấy tổng các chi phí theo id và type.
   *
   * @param  Request  $request
   * @param  Project_detail  $Project_detail
   * @return JsonResponse
   */
  public function getTotalInternalCost(Request $request)
  {
    $project_id = $request->input('project_id');

    if (!$project_id) {
      return response()->json(['error' => 'Project ID parameter is missing'], 400);
    }

    $totalInternalCost = Project_detail::where('project_id', $project_id)->sum('real_internal_cost');

    return response()->json(['totalInternalCost' => $totalInternalCost], 200);
  }
  public function getTotalClientCost(Request $request)
  {
    $project_id = $request->input('project_id');

    if (!$project_id) {
      return response()->json(['error' => 'Project ID parameter is missing'], 400);
    }

    $totalClientCost = Project_detail::where('project_id', $project_id)->sum('real_client_cost');

    return response()->json(['totalClientCost' => $totalClientCost], 200);
  }
  /**
   * Lấy tổng các chi phí theo id và type.
   *
   * @param  Request  $request
   * @param  Project_detail  $Project_detail
   * @return JsonResponse
   */
  public function getAllCostByProjectId(Request $request)
{
    $project_id = $request->input('project_id');

    if (!$project_id) {
        return response()->json(['error' => 'Project ID parameter is missing'], 400);
    }
    $projectDetails = Project_detail::where('project_id', $project_id)->get();
    return response()->json(['data' => $projectDetails], 200);
}

}
