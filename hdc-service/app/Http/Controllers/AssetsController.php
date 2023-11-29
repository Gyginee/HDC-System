<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;

use App\Models\Assets;
use Illuminate\Http\Request;

class AssetsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $assets = Assets::all();
        return response()->json(['data' => $assets], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $asset = Assets::create($request->all());
        return response()->json(['data' => $asset], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Assets  $asset
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Assets $asset)
    {
        return response()->json(['data' => $asset], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Assets  $asset
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Assets $asset)
    {
        $asset->update($request->all());
        return response()->json(['data' => $asset], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Assets  $asset
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Assets $asset)
    {
        $asset->delete();
        return response()->json(null, 204);
    }
}
