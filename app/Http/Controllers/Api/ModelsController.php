<?php

namespace App\Http\Controllers\Api; 

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ModelsRequest;

class ModelsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return Models::all();
    }

    public function store(ModelsRequest $request)
    {
        $validated = $request->validated();
        $model = Models::create($validated);
        
        return $model;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Models::findOrFail($id);
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
    public function update(ModelsRequest $request, string $id)
    {
        $validated = $request->validated();
        $model = Models::findOrFail($id);
        $model->update($validated);
        

        return $model;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = Models::findOrFail($id);
        $model->delete();

        return $model;
    }
}
