<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PlantController extends Controller
{
    public function generate_plants()
    {
        try {
            $plants = DB::select('SELECT * FROM production.plants');
            return response()->json($plants);
        } catch (\Exception $e) {
            // Log the exception
            \Log::error('Error fetching plants: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function insert_plants (Request $r) 
    {
        DB::insert ('INSERT INTO production.PLANTS (supplier_name, plant_name, location ) VALUES (:a, :b, :c)', [
            'a' =>$r->input('supplier_id'),
            'b' =>$r->input('plant_name'),
            'c' =>$r->input('location'),
        ]);
    }

    public function update_plants (Request $r) 
    {
        DB::update ('UPDATE production.PLANTS SET supplier_id = :a, plant_name= :b, location= :c WHERE plant_id= :d', [
            'a' =>$r->input('supplier_id'),
            'b' =>$r->input('plant_name'),
            'c' =>$r->input('location'),
            'd' =>$r->input('id')
        ]);
    }
    public function delete_plants(Request $r)
    {
        DB::delete('DELETE FROM production.PLANTS WHERE plant_id = :a',[
            'a' => $r->input('id'),
        ]);
        return 'Deleted Successfully!';
    }

}
