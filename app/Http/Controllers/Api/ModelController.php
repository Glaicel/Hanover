<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ModelController extends Controller
{
    public function generate_models ()
    {
        try {
            $models = DB::select('SELECT * FROM production.MODELS');
            return response()->json($models);
        } catch (\Exception $e) {
            // Log the exception
            \Log::error('Error fetching models: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
    public function models()
    {
        try {
            $models = DB::table('production.models')
                ->select(
                    'production.models.model_id',
                    'production.models.brand_id',
                    'production.brands.brand_name',
                    'production.models.vehicle_id',
                    'production.vehicle_types.vehicle_type',
                    'production.models.model_name',
                    'production.models.image_path',
                    'production.models.color_id'
                )
                ->join('production.brands', 'production.models.brand_id', '=', 'production.brands.brand_id')
                ->join('production.vehicle_types', 'production.models.vehicle_id', '=', 'production.vehicle_types.vehicle_id')
                ->get();
    
            return response()->json($models);
        } catch (\Exception $e) {
            // Log the exception
            \Log::error('Error fetching models: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
    


    public function insert_model (Request $r) 
    {
        DB::insert ('INSERT INTO production.MODELS (brand_id, vehicle_id, model_name, image_path, color_id ) VALUES (:a, :b, :c, :d, e)', [
            'a' =>$r->input('brand_id'),
            'b' =>$r->input('vehicle_id'),
            'c' =>$r->input('model_name'),
            'd' =>$r->input('image_path'),
            'e' =>$r->input('color_id')

        ]);
    }
    public function update_model (Request $r) 
    {
        DB::update ('UPDATE production.MODELS SET brand_id = :a, vehicle_id= :b, model_name = :c, image_path= :d, color_id= :e WHERE model_id= :f', [
            'a' =>$r->input('brand_id'),
            'b' =>$r->input('vehicle_id'),
            'c' =>$r->input('model_name'),
            'd' =>$r->input('image_path'),
            'e' =>$r->input('color_id'),
            'f' =>$r->input('id')
        ]);
    }

    public function delete_model(Request $r)
    {
        DB::delete('DELETE FROM production.MODELS WHERE model_id = :a',[
            'a' => $r->input('id'),
        ]);
        return 'Deleted Successfully!';
    }
}
