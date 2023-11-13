<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use App\Http\Requests\VehicleRequest;
use Illuminate\Support\Facades\DB;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Vehicle::all();

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
    public function store(VehicleRequest $request)
    {
        $validated = $request->validated();
        $vehicle = Vehicle::create($validated);

        return $vehicle;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Vehicle::findOrFail($id);
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
    public function update(VehicleRequest $request, string $id)
    {
        $validated = $request->validated();
        $vehicle = Vehicle::findOrFail($id);
        $vehicle->update($validated);

        return $vehicle;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $vehicle = Vehicle::findOrFail($id); 
        $vehicle ->delete();

        return $vehicle;
    }
}
