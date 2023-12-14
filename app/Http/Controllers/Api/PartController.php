<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PartController extends Controller
{
    public function generate_parts () 
    {
        try {
            $parts = DB::select('SELECT * FROM production.parts');
            return response()->json($parts);
        } catch (\Exception $e) {
            // Log the exception
            \Log::error('Error fetching parts: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function insert_parts (Request $r) 
    {
        DB::insert ('INSERT INTO production.PARTS (company_id, supplier_id, plant_id, parts_name, price, availability, inventory_item_id ) VALUES (:a, :b, :c, :d, :e, :f, :g)', [
            'a' =>$r->input('company_id'),
            'b' =>$r->input('supplier_id'),
            'c' =>$r->input('plant_id'),
            'd' =>$r->input('parts_name'),
            'e' =>$r->input('price'),
            'f' =>$r->input('availability'),
            'g' =>$r->input ('inventory_item_id')

        ]);
    }

    public function parts(){
        $parts = DB::table('production.parts')
        ->join('sales.suppliers', 'production.parts.supplier_id', '=', 'sales.suppliers.supplier_id')
        ->select('production.parts.*', 'sales.suppliers.supplier_name')
        ->get();

        return response()->json($parts);
    }

    public function update_parts (Request $r) 
    {
        DB::update ('UPDATE production.PARTS SET company_id = :a, supplier_id= :b, plant_id = :c, parts_name= :d, price = :e, availability = :f,  WHERE parts_id= :g', [
            'a' =>$r->input('company_id'),
            'b' =>$r->input('supplier_id'),
            'c' =>$r->input('plant_id'),
            'd' =>$r->input('parts_name'),
            'e' =>$r->input('price'),
            'f' =>$r->input('availability'),
            'g' =>$r->input('id')
        ]);
    }
    
    public function delete_parts(Request $r)
    {
        DB::delete('DELETE FROM production.PARTS WHERE parts_id = :a',[
            'a' => $r->input('id'),
        ]);
        return 'Deleted Successfully!';
    }


}
