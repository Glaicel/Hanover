<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Models\User; 
use Illuminate\Support\Facades\Storage;



class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $validated = $request->validated();

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        return $user;
    }

    public function authenticatedUser(Request $request)
{
    // Fetch the authenticated user based on the provided token
    $user = $request->user();

    return $user;
}

    public function authenticatedUserName (Request $request)
    {       // Fetch the authenticated user based on the provided token
    $user = $request->user();
    //Assuming the user model has a 'name' attribute, you can return only the name
    return $user ? $user->id : null;
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return User::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, string $id)
    {
        $user = User::findOrFail($id);
    
        $validated = $request->validated();
    
        if (isset($validated['email'])) {
            $user->email = $validated['email'];
        }
    
        if (isset($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        if ($request->hasFile('profile_image')){
            $profileImage = $request->file('profile_image');
            $path = $profileImage->store ('profile_image', 'public');
            $user->profile_image = $path;
        }
    
        $user->save();
    
        return $user;
    }

    public function uploadProfileImage(UserRequest $request, string $id)
    {
        try {
            $user = User::findOrFail($id);
    
            $request->validate([
                'profile_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
    
            if ($request->hasFile('profile_image')) {
                $profileImage = $request->file('profile_image');
                $path = $profileImage->store('profile_image', 'public');
                
                // Use the "update" method to update the user's profile image
                $user->update(['profile_image' => $path]);
    
                return response()->json(['message' => 'Profile image uploaded successfully']);
            }
    
            return response()->json(['error' => 'No profile image provided'], 400);
        } catch (\Exception $e) {
            // Handle exceptions (e.g., user not found)
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    public function getDealers() //dealers show in the customer's interface
    {
        $dealers = User::where('role', 'dealer')->get();
        return response()->json($dealers);
    }

    public function searchDealer(Request $request) // Include Request in method parameters
    {
        $searchTerm = $request->query('search');
    
        $query = User::where('role', 'dealer');
    
        if ($searchTerm) {
            $query->where(function ($query) use ($searchTerm) {
                $query->where('name', 'like', "%$searchTerm%")
                    ->orWhere('email', 'like', "%$searchTerm%");
            });
        }
    
        $dealers = $query->get();
    
        return response()->json($dealers); // Fix typo in response() function
    }
    

    public function email(UserRequest $request, string $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validated();
 
        $user->email = $validated['email'];
         
        $user->save();

        return $user;
    }

    public function password(UserRequest $request, string $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validated();
 
        $user->password = Hash::make($validated['password']);
         
        $user->save();

        return $user;
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);

        $user->delete();

        return $user;
    }

}
