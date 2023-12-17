<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Staff;

class LoginController extends Controller
{
  public function showLoginForm()
  {
    $pageConfigs = ['myLayout' => 'blank'];
    return view('content.auth.login', ['pageConfigs' => $pageConfigs]);
  }

  public function login(Request $request)
  {
    $credentials = $request->validate([
      'email' => 'required|email',
      'password' => 'required',
    ]);
    if (Auth::guard('staff')->attempt($credentials)) {

      $request->session()->regenerate();
      return redirect()->intended('/dashboard');
    } else {
      dd('Authentication failed: ');
      dd($credentials);

      return back()->withErrors([
        'email' => 'Không tìm thấy tài khoản trong cơ sở dữ liệu.',
      ]);
    }
  }

  public function logout(Request $request)
  {
    Auth::guard('staff')->logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect('/');
  }
}
