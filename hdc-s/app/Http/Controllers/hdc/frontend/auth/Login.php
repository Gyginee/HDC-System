<?php

namespace App\Http\Controllers\hdc\frontend\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Login extends Controller
{
  public function index()
  {
    $pageConfigs = ['myLayout' => 'blank'];
    return view('hdc.auth.login', ['pageConfigs' => $pageConfigs]);
  }
}


