<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ClientController extends Controller
{
  /**
   * Display a listing of the clients.
   *
   * @return JsonResponse
   */
  public function index()
  {
    $clients = Client::all();
    return response()->json(['data' => $clients], 200)->header('Content-Type', 'application/json; charset=utf-8');
  }

  /**
   * Store a newly created client in storage.
   *
   * @param  Request  $request
   * @return JsonResponse
   */
  public function store(Request $request)
  {
    // Validate the request data
    $validatedData = $request->validate([
      'name' => 'required|string',
      'address' => 'required|string',
      'imagePath' => 'nullable|string',
      'en_name' => 'string',
      'owner' => 'string',
      'dif_address' => 'string',
      'industry_type' => 'string',
      'category' => 'string',
      'tax_code' => 'string',
      'contract_duration' => 'string',
    ]);

    // Create a new client record
    $client = Client::create($validatedData);

    return response()->json(['data' => $client], 201)->header('Content-Type', 'application/json; charset=utf-8');
  }

  /**
   * Display the specified client.
   *
   * @param  Client  $client
   * @return JsonResponse
   */
  public function show(Client $client)
  {
    return response()->json(['data' => $client], 200)->header('Content-Type', 'application/json; charset=utf-8');
  }

  /**
   * Update the specified client in storage.
   *
   * @param  Request  $request
   * @param  Client  $client
   * @return JsonResponse
   */
  public function update(Request $request, Client $client)
  {
    // Validate the request data
    $validatedData = $request->validate([
      'name' => 'required|string',
      'address' => 'required|string',
      'imagePath' => 'nullable|string',
      'en_name' => 'string',
      'owner' => 'string',
      'dif_address' => 'string',
      'industry_type' => 'string',
      'category' => 'string',
      'tax_code' => 'string',
      'contract_duration' => 'string',
    ]);

    // Update the client record
    $client->update($validatedData);

    return response()->json(['data' => $client], 200)->header('Content-Type', 'application/json; charset=utf-8');
  }

  /**
   * Remove the specified client from storage.
   *
   * @param  Client  $client
   * @return JsonResponse
   */
  public function destroy(Client $client)
  {
    // Delete the client record
    $client->delete();

    return response()->json(null, 204);
  }
}
