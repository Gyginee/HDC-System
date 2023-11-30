<?php

namespace App\Http\Controllers\hdc\backend;

use App\Http\Controllers\Controller;

use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class StatusController extends Controller
{
    /**
     * Display a listing of statuses.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $statuses = Status::all();
        return response()->json(['data' => $statuses], 200);
    }

    /**
     * Store a newly created status in storage.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $status = Status::create($request->all());
        return response()->json(['data' => $status], 201);
    }

    /**
     * Display the specified status.
     *
     * @param  Status  $status
     * @return JsonResponse
     */
    public function show(Status $status)
    {
        return response()->json(['data' => $status], 200);
    }

    /**
     * Update the specified status in storage.
     *
     * @param  Request  $request
     * @param  Status  $status
     * @return JsonResponse
     */
    public function update(Request $request, Status $status)
    {
        $status->update($request->all());
        return response()->json(['data' => $status], 200);
    }

    /**
     * Remove the specified status from storage.
     *
     * @param  Status  $status
     * @return JsonResponse
     */
    public function destroy(Status $status)
    {
        $status->delete();
        return response()->json(null, 204);
    }
}
