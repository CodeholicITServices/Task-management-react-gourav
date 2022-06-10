<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class PermissionCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */

     public function permission_check(Request $request, Closure $next,$user_permission)
       {
            $permissions_array = explode(',', Auth::user()->permission);
            if(in_array($user_permission, $permission_array)){

             return $next($request);
            }else{
             return redirect(RouteServiceProvider::HOME);
            }
        } 
}
