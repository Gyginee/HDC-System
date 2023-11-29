<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class StaffController extends Controller
{
    /**
     * Display a listing of staff members.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $staffMembers = Staff::all();
        return response()->json(['data' => $staffMembers], 200);
    }

    /**
     * Store a newly created staff member in storage.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $staffMember = Staff::create($request->all());
        return response()->json(['data' => $staffMember], 201);
    }

    /**
     * Display the specified staff member.
     *
     * @param  Staff  $staffMember
     * @return JsonResponse
     */
    public function show(Staff $staffMember)
    {
        return response()->json(['data' => $staffMember], 200);
    }

    /**
     * Update the specified staff member in storage.
     *
     * @param  Request  $request
     * @param  Staff  $staffMember
     * @return JsonResponse
     */
    public function update(Request $request, Staff $staffMember)
    {
        $staffMember->update($request->all());
        return response()->json(['data' => $staffMember], 200);
    }

    /**
     * Remove the specified staff member from storage.
     *
     * @param  Staff  $staffMember
     * @return JsonResponse
     */
    public function destroy(Staff $staffMember)
    {
        $staffMember->delete();
        return response()->json(null, 204);
    }
}
