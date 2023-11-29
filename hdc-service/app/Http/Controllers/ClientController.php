<?php

namespace App\Http\Controllers;

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
        return response()->json(['data' => $clients], 200);
    }

    /**
     * Store a newly created client in storage.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $client = Client::create($request->all());
        return response()->json(['data' => $client], 201);
    }

    /**
     * Display the specified client.
     *
     * @param  Client  $client
     * @return JsonResponse
     */
    public function show(Client $client)
    {
        return response()->json(['data' => $client], 200);
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
        $client->update($request->all());
        return response()->json(['data' => $client], 200);
    }

    /**
     * Remove the specified client from storage.
     *
     * @param  Client  $client
     * @return JsonResponse
     */
    public function destroy(Client $client)
    {
        $client->delete();
        return response()->json(null, 204);
    }
}
