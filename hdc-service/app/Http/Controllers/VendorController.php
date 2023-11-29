<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class VendorController extends Controller
{
    /**
     * Display a listing of vendors.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $vendors = Vendor::all();
        return response()->json(['data' => $vendors], 200);
    }

    /**
     * Store a newly created vendor in storage.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $vendor = Vendor::create($request->all());
        return response()->json(['data' => $vendor], 201);
    }

    /**
     * Display the specified vendor.
     *
     * @param  Vendor  $vendor
     * @return JsonResponse
     */
    public function show(Vendor $vendor)
    {
        return response()->json(['data' => $vendor], 200);
    }

    /**
     * Update the specified vendor in storage.
     *
     * @param  Request  $request
     * @param  Vendor  $vendor
     * @return JsonResponse
     */
    public function update(Request $request, Vendor $vendor)
    {
        $vendor->update($request->all());
        return response()->json(['data' => $vendor], 200);
    }

    /**
     * Remove the specified vendor from storage.
     *
     * @param  Vendor  $vendor
     * @return JsonResponse
     */
    public function destroy(Vendor $vendor)
    {
        $vendor->delete();
        return response()->json(null, 204);
    }
}
