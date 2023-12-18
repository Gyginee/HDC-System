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
            return redirect("/");
        } else {

            return back()
                ->withInput()
                ->withErrors(['email' => 'Invalid credentials']);

        }
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
