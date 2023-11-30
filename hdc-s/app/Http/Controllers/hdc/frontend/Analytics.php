<?php

namespace App\Http\Controllers\hdc\frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Analytics extends Controller
{
  public function index()
  {
    return view('hdc.dashboard.dashboards-analytics');
  }
}
