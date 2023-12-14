<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SupplierController extends Controller
{
    public function generate_supplier ()
    {
        try {
            $suppliers = DB::select('SELECT * FROM sales.suppliers');
            return response()->json($suppliers);
        } catch (\Exception $e) {
            // Log the exception
            \Log::error('Error fetching supplier: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function insert_supplier (Request $r) 
    {
        DB::insert ('INSERT INTO production.SUPPLIER (supplier_name) VALUES (:a)', [
            'a' =>$r->input('supplier_name')
        ]);
    }
 
    public function update_supplier (Request $r) 
    {
        DB::update ('UPDATE production.SUPPLIER SET supplier_name = :a WHERE supplier_id= :b', [
            'a' =>$r->input('supplier_name'),
            'b' =>$r->input('id')
        ]);
    }

    public function delete_supplier(Request $r)
    {
        DB::delete('DELETE FROM production.SUPPLIER WHERE supplier_id = :a',[
            'a' => $r->input('id'),
        ]);
        return 'Deleted Successfully!';
    }



}
