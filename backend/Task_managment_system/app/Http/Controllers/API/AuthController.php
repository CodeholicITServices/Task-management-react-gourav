<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{

    public function register(Request $request)
    {

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password'))
        ]);
        $token = $user->createToken('token')->plainTextToken;
        // $cookie = cookie('jwt', $token, 60 * 24);
        return response([
            'success'=> true,
            'token'=> $token,
            'message'=> 'Logged in successfully.'
        ]);
        // ])->withCookie($cookie);
    }
    
    public function login(Request $request)
    {
        if(!Auth::attempt($request->all())){
            return response([
                'message'=> "Invalid credentials"
            ], 401);
        }
        $user = Auth::user();
        $token = $user->createToken('token')->plainTextToken;
        // $cookie = cookie('jwt', $token, 60 * 24);
        return response([
            'success'=> true,
            'token'=> $token,
            'message'=> 'Logged in successfully.'
        ]);
        // ])->withCookie($cookie);
    }

    public function user()
    {
        return Auth::user();
    }

     public function logout(Request $request)
    {
        // $cookie = Cookie::forget('jwt');
        Auth::user()->tokens()->delete();
        return response([
            'success' => true
        ]);
        // ])->withCookie($cookie);
    }


}
