<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CompanyRequest;
use Illuminate\Support\Facades\DB;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Company::all();
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(CompanyRequest $request)
    {
        $validated = $request->validated();
        $company = Company::create($validated);

        return $company;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Company::findOrFail($id);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(CompanyRequest $request, string $id)
    {
        $validated = $request->validated();
        $company = Company::findOrFail($id);
        $company->update($validated);
        

        return $company;
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $company = Company::findOrFail($id);
        $company->delete();

        return $company; 
    }

    public function generate_results () {

        return DB::select('SELECT * FROM production.COMPANY');

    }

    public function insert_company (Request $r) {

        DB::select('INSERT INTO production.COMPANY (company_name, address) VALUES (:a, :b)', [
            'a' => $r->input('company_name'),
            'b' => $r->input('address')
        ]);
        return 'Successful'; 
    }

    public function update_company(Request $r)
    {
        DB::update('UPDATE production.COMPANY SET company_name = :a, address = :b WHERE company_id = :c', [
            'a' => $r->input('company_name'),
            'b' => $r->input('address'),
            'c' => $r->input('id'),
        ]);
    
        return 'Update successful';
    }

    public function delete_company(Request $r)
    {
        DB::delete('DELETE FROM production.COMPANY WHERE company_id = :a',[
            'a' => $r->input('id'),
        ]);

        return 'Deleted Successfully!';
    }



    


}
