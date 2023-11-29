<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Models\Salary;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SalaryController extends Controller
{
    /**
     * Display a listing of salaries.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $salaries = Salary::all();
        return response()->json(['data' => $salaries], 200);
    }

    /**
     * Store a newly created salary in storage.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $salary = Salary::create($request->all());
        return response()->json(['data' => $salary], 201);
    }

    /**
     * Display the specified salary.
     *
     * @param  Salary  $salary
     * @return JsonResponse
     */
    public function show(Salary $salary)
    {
        return response()->json(['data' => $salary], 200);
    }

    /**
     * Update the specified salary in storage.
     *
     * @param  Request  $request
     * @param  Salary  $salary
     * @return JsonResponse
     */
    public function update(Request $request, Salary $salary)
    {
        $salary->update($request->all());
        return response()->json(['data' => $salary], 200);
    }

    /**
     * Remove the specified salary from storage.
     *
     * @param  Salary  $salary
     * @return JsonResponse
     */
    public function destroy(Salary $salary)
    {
        $salary->delete();
        return response()->json(null, 204);
    }
}
