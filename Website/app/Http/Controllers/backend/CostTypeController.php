<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\CostType;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CostTypeController extends Controller
{
    /**
     * Display a listing of cost types.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $costTypes = CostType::all();
        return response()->json(['data' => $costTypes], 200);
    }

    /**
     * Store a newly created cost type in storage.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $costType = CostType::create($request->all());
        return response()->json(['data' => $costType], 201);
    }

    /**
     * Display the specified cost type.
     *
     * @param  CostType  $costType
     * @return JsonResponse
     */
    public function show(CostType $costType)
    {
        return response()->json(['data' => $costType], 200);
    }

    /**
     * Update the specified cost type in storage.
     *
     * @param  Request  $request
     * @param  CostType  $costType
     * @return JsonResponse
     */
    public function update(Request $request, CostType $costType)
    {
        $costType->update($request->all());
        return response()->json(['data' => $costType], 200);
    }

    /**
     * Remove the specified cost type from storage.
     *
     * @param  CostType  $costType
     * @return JsonResponse
     */
    public function destroy(CostType $costType)
    {
        $costType->delete();
        return response()->json(null, 204);
    }
}
