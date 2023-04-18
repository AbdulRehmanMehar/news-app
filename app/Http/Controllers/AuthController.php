<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    private $rules = [
        'name' => 'required',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:8'
    ];

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), $this->rules);

        if ($validator->fails()) {
            return response([
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::create([
            ...$request->all(),
            'password' => Hash::make($request['password'])
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;
        $user = $user->with('authors', 'sources');

        return response([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response([
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::where('email', $request['email'])->with('authors', 'sources')->first();

        if (!$user || ($user && !Hash::check($request['password'], $user->password))) {
            return response([
                'errors' => [
                    'email' => ['No such record was found.']
                ],
            ]);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response([
            'message' => 'Success',
        ], 200);
    }
}
