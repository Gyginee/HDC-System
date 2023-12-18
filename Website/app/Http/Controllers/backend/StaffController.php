<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;

use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

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
    $data = $request->all();

    // Check if 'password' key exists in the input data
    if (isset($data['password'])) {
      $data['password'] = Hash::make($data['password']); // Hash the password
    }

    $staffMember = Staff::create($data);

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
    $data = $request->all();

    // Check if 'password' key exists in the input data
    if (isset($data['password'])) {
      $data['password'] = Hash::make($data['password']); // Hash the password
    }

    $staffMember->update($data);

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
