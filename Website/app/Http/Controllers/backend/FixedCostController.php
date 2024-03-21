<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\FixedCost;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FixedCostController extends Controller
{
    /**
     * Display a listing of fixed costs.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $fixedCosts = FixedCost::all();
        return response()->json(['data' => $fixedCosts], 200);
    }

    /**
     * Store a newly created fixed cost in storage.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $fixedCost = FixedCost::create($request->all());
        return response()->json(['data' => $fixedCost], 201);
    }

    /**
     * Display the specified fixed cost.
     *
     * @param  FixedCost  $fixedCost
     * @return JsonResponse
     */
    public function show(FixedCost $fixedCost)
    {
        return response()->json(['data' => $fixedCost], 200);
    }

    /**
     * Update the specified fixed cost in storage.
     *
     * @param  Request  $request
     * @param  FixedCost  $fixedCost
     * @return JsonResponse
     */
    public function update(Request $request, FixedCost $fixedCost)
    {
        $fixedCost->update($request->all());
        return response()->json(['data' => $fixedCost], 200);
    }

    /**
     * Remove the specified fixed cost from storage.
     *
     * @param  FixedCost  $fixedCost
     * @return JsonResponse
     */
    public function destroy(FixedCost $fixedCost)
    {
        $fixedCost->delete();
        return response()->json(null, 204);
    }
}
