<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\TransactionDetailsRequest;

class TransactionDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TransactionDetails::all();
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
    public function store(TransactionDetailsRequest $request)
    {
        $validated = $request->validated();
        $details = TransactionDetails::create($validated);

        return $details;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return TransactionDetails::findOrFail($id);
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
    public function update(TranscationDetailsRequest $request, string $id)
    {
        $validated = $request->validated();
        $details = TransactionDetails::findOrFail($id);
        $details->update($validated);
    
        return $details;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
    
        $details = TransactionDetails::findOrFail($id);
        $details>delete($validated);

        return $details;
    }
}
