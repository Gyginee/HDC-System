<?php


namespace App\Http\Controllers\backend;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Category;
class CategoryController extends Controller
{
    /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function index()
  {
    $category = Category::all();
    return response()->json(['data' => $category], 200);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function store(Request $request)
  {
    $category = Category::create($request->all());
    return response()->json(['data' => $category], 201);
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Category  $category
   * @return \Illuminate\Http\JsonResponse
   */
  public function show(Category $category)
  {
    return response()->json(['data' => $category], 200);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Category  $category
   * @return \Illuminate\Http\JsonResponse
   */
  public function update(Request $request, Category $category)
  {
    $category->update($request->all());
    return response()->json(['data' => $category], 200);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Category  $category
   * @return \Illuminate\Http\JsonResponse
   */
  public function destroy(Category $category)
  {
    $category->delete();
    return response()->json(null, 204);
  }
}
