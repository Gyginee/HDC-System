<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;

use App\Models\Client;
use App\Models\Project_detail;
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
      'short_name' => 'string',
      'address' => 'required|string',
      'imagePath' => 'nullable|string',
      'dif_address' => 'string',
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
      'short_name' => 'string',
      'address' => 'required|string',
      'imagePath' => 'nullable|string',
      'dif_address' => 'string',
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

 /**
     * Calculate the sum of real costs for projects of a specific client.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function getRealCost(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'client_id' => 'required|integer', // assuming client_id is provided as integer
        ]);

        // Extract client_id from validated data
        $client_id = $validatedData['client_id'];

        // Fetch client based on provided client_id
        $client = Client::find($client_id);

        // If client not found, return error response
        if (!$client) {
            return response()->json(['error' => 'Client not found'], 404);
        }

        // Get all projects of the client
        $projects = $client->projects;

        // Initialize variables to store total costs
        $totalRealClientCost = 0;
        $totalRealInternalCost = 0;

        // Loop through each project
        foreach ($projects as $project) {
            // Get project details for the current project
            $projectDetails = Project_detail::where('project_id', $project->id)->get();

            // Calculate the sum of real client cost and real internal cost for each project
            foreach ($projectDetails as $detail) {
                $totalRealClientCost += $detail->real_client_cost;
                $totalRealInternalCost += $detail->real_internal_cost;
            }
        }

        // Return the total real costs
        return response()->json([
            'total_real_client_cost' => $totalRealClientCost,
            'total_real_internal_cost' => $totalRealInternalCost,
        ], 200);
    }

}
