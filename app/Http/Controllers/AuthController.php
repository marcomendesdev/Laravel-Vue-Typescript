<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'string'],
        ]);

        $validatedData['password'] = bcrypt($validatedData['password']);

        $user = User::create($validatedData);

        $token = $user->createToken('authToken')->plainTextToken;

        return response(['user' => $user, 'token' => $token]);
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
            'password' => ['required', 'string'],
        ]);
        if (!Auth::attempt($validatedData)) {
            return response(['message' => 'Invalid credentials']);
        }
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $token = $user->createToken('authToken')->plainTextToken;

        return response(['user' => $user, 'token' => $token]);
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
       $request->user()->currentAccessToken()->delete();

        return response(['message' => 'Logged out']);
    }
}
