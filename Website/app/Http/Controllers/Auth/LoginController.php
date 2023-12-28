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
          $this->validate($request, [
              'email' => 'required|email',
              'password' => 'required',
          ]);

          if (Auth::guard('staff')->attempt(['email' => $request->email, 'password' => $request->password], $request->remember)) {
              // Redirect based on role_id
              return redirect()->intended(route('dashboard'));
          }

          return redirect()->back()->withInput($request->only('email', 'remember'));
    }

    public function logout(Request $request)
    {
        Auth::guard('staff')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }

    // Use the Staff model for authentication
    public function username()
    {
        return 'email'; // Change this if you want to use a different field for authentication
    }

    protected function guard()
    {
        return Auth::guard('staff');
    }
}
