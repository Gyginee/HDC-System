<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next, ...$roles)
    {
        if (!Auth::guard('staff')->check()) {
            return redirect('login');
        }

        $userRole = Auth::guard('staff')->user()->role_id;
        foreach ($roles as $role) {
            if ($userRole == config('roles.'.$role)) {
                return $next($request);
            }
        }

        abort(403); // Forbidden access
    }
}
