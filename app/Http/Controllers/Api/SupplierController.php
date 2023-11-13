<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\SupplierRequest;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Supplier::all();
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
    public function store(SupplierRequest $request)
    {
        $validated = $request->validated();
        $supplier = Supplier::create($validated);

        return $supplier;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Supplier::findOrFail($id);
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
    public function update(SupplierRequest $request, string $id)
    {
        $validated = $request->validated();
        $supplier = Supplier::findOrFail($id);
        $supplier->update($validated);

        return $supplier;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $supplier = Option::findOrFail($id);
        $supplier->delete();

        return $supplier;
    }
}
