<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;  //import facade

class CompanyController extends Controller
{

    public function generate_companies ()
    {
        try {
            $companies = DB::select('SELECT * FROM production.COMPANIES');
            return response()->json($companies);
        } catch (\Exception $e) {
            // Log the exception
            \Log::error('Error fetching companies: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function generate_company_names() {
        try {
            $companies = DB::select('SELECT company_id FROM production.COMPANIES');
            $companyNames = array_column($companies, 'company_id');
            return response()->json($companyNames);
        } catch (\Exception $e) {
            // Log the exception
            \Log::error('Error fetching companies name: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function insert_company (Request $r) 
    {
        DB::insert ('INSERT INTO production.COMPANIES (company_name, address) VALUES (:a, :b)', [
            'a' =>$r->input('company_name'),
            'b' =>$r->input('address')
        ]);
    }

    public function update_company (Request $r) 
    {
        DB::update ('UPDATE production.COMPANIES SET company_name = :a, address = :b, WHERE company_id= :c', [
            'a' =>$r->input('company_name'),
            'b' =>$r->input('address'),
            'c' =>$r->input('id')
        ]);
        return ('Update Successful');
    }
    public function delete_company(Request $r)
    {
        DB::delete('DELETE FROM production.COMPANIES WHERE company_id = :a',[
            'a' => $r->input('id'),
        ]);
        return 'Deleted Successfully!';
    }
}
