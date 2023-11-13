<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\DealerRequest;

class DealerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Dealer::all();
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
    public function store(DealerRequest $request)
    {
        $validated = $request->validated();
        $dealer = Dealer::create($validated);

        return $dealer;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Dealer::findOrFail($id);
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
    public function update(DealerRequest $request, string $id)
    {
        $validated = $request->validated();
        $dealer = Dealer::findOrFail($id);
        $dealer->update($validated);

        return $dealer;
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dealer = Dealer::findOrFail($id);
        $dealer->delete();

        return $dealer;
    }
}
