<?php

namespace App\Http\Controllers\hdc\frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Clients_all extends Controller
{
  public function index()
  {
    return view('hdc.clients.all');
  }
}
