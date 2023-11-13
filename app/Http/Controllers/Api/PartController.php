<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\PartRequest;

class PartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Part::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
   
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PartRequest $request)
    {
        $validated = $request->validated();
        $part = Part::create($validated);

        return $part;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Part::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
       
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PartRequest $request, string $id)
    {
        $validated = $request->validated();
        $part = Part::findOrFail($id);
        $part->update($validated);

        return $part;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $part = Part::findOrFail($id);
        $part->delete();

        return $part;
    }
}
