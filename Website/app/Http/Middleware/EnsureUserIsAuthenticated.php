<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class EnsureUserIsAuthenticated
{
    /**
     * Xử lý một yêu cầu đến.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Kiểm tra xem người dùng có được xác thực hay không
        if (!Auth::check()) {
            // Nếu người dùng không được xác thực, chuyển hướng họ đến trang đăng nhập
            return redirect('/login');
        }

        // Nếu người dùng đã được xác thực, cho phép yêu cầu tiếp tục
        return $next($request);
    }
}
