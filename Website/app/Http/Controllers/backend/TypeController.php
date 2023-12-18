<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;

use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TypeController extends Controller
{
    /**
     * Display a listing of types.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $types = Type::all();
        return response()->json(['data' => $types], 200);
    }

    /**
     * Store a newly created type in storage.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $type = Type::create($request->all());
        return response()->json(['data' => $type], 201);
    }

    /**
     * Display the specified type.
     *
     * @param  Type  $type
     * @return JsonResponse
     */
    public function show(Type $type)
    {
        return response()->json(['data' => $type], 200);
    }

    /**
     * Update the specified type in storage.
     *
     * @param  Request  $request
     * @param  Type  $type
     * @return JsonResponse
     */
    public function update(Request $request, Type $type)
    {
        $type->update($request->all());
        return response()->json(['data' => $type], 200);
    }

    /**
     * Remove the specified type from storage.
     *
     * @param  Type  $type
     * @return JsonResponse
     */
    public function destroy(Type $type)
    {
        $type->delete();
        return response()->json(null, 204);
    }
}
