<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(UserRequest $request)
    {

        $credentials = $request->only('email', 'password', 'role'); //include the role in the login credentials 

        $user = User::where('email', $credentials['email'])
            ->where('role', $credentials['role'])
            ->first();
     
        if ( !$user || !Hash::check($credentials['password'], $user->password) ) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $response = [
            'user'      => $user,
            'token'     => $user->createToken($request->email)->plainTextToken,
        ];
     
        return $response;
    }

    public function showRegistrationForm()
    {
        // You can create a view for the registration form if needed
        return view('auth.register');
    }

    /**
     * Logout using the specified resource.
     */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        $response = [
            'message'   => 'Logout.'
        ];

        return $response;
    }



}
