<?php

namespace App\Http\Controllers;

use App\Models\StaffDetail;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class StaffDetailController extends Controller
{
    /**
     * Display a listing of staff details.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $staffDetails = StaffDetail::all();
        return response()->json(['data' => $staffDetails], 200);
    }

    /**
     * Store a newly created staff detail in storage.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $staffDetail = StaffDetail::create($request->all());
        return response()->json(['data' => $staffDetail], 201);
    }

    /**
     * Display the specified staff detail.
     *
     * @param  StaffDetail  $staffDetail
     * @return JsonResponse
     */
    public function show(StaffDetail $staffDetail)
    {
        return response()->json(['data' => $staffDetail], 200);
    }

    /**
     * Update the specified staff detail in storage.
     *
     * @param  Request  $request
     * @param  StaffDetail  $staffDetail
     * @return JsonResponse
     */
    public function update(Request $request, StaffDetail $staffDetail)
    {
        $staffDetail->update($request->all());
        return response()->json(['data' => $staffDetail], 200);
    }

    /**
     * Remove the specified staff detail from storage.
     *
     * @param  StaffDetail  $staffDetail
     * @return JsonResponse
     */
    public function destroy(StaffDetail $staffDetail)
    {
        $staffDetail->delete();
        return response()->json(null, 204);
    }
}
