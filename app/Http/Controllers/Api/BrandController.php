<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Brand;
use App\Models\Modell;


class BrandController extends Controller
{
    public function generate_brands ()
    {
        try {
            $brands = DB::select('SELECT * FROM production.BRANDS');
            return response()->json($brands);
        } catch (\Exception $e) {
            // Log the exception
            \Log::error('Error fetching brands: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    } 

    public function generateBrandModels($brandId)
    {
        try {
            $models = DB::table('production.brands AS B')
                ->join('production.models as M', 'B.brand_id', '=', 'M.brand_id')
                ->join('production.vehicles as V', 'M.model_id', '=', 'V.model_id')
                ->select(
                    'B.brand_id',
                    'B.company_id',
                    'B.brand_name',
                    'M.model_id',
                    'M.model_name',
                    'V.vin',
                    'V.color',
                    'V.transmission_type',
                    'V.is_diesel',
                    'V.price',
                    'M.image_path',
                    'V.availability'
                )
                ->where('B.brand_id', $brandId)
                ->get();
    
            // Log image paths
            foreach ($models as $model) {
                \Log::info('Image Path: ' . $model->image_path);
            }
    
            return response()->json(['models' => $models]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    

    public function insert_brand(Request $r)
    {
        DB::insert('INSERT INTO production.BRANDS (brand_name, image_data, company_id) VALUES (:a, :b, :c)', [
            'a' => $r->input('brand_name'),
            'b' => $r->input('image_data'),
            'c' => $r->input('company_id'),
        ]);
    }
    

    public function update_brand (Request $r) 
    {
        DB::update ('UPDATE production.BRANDS SET brand_name = :a, dealer_id = :b WHERE company_id= :c', [
            'a' =>$r->input('brand_name'),
            'b' =>$r->input('dealer_id'),
            'c' =>$r->input('id')
        ]);
        return 'Updated Successfully!';
    }

    public function delete_brand (Request $r)
    {
        DB::delete('DELETE FROM production.BRANDS WHERE brand_id = :a',[
            'a' => $r->input('id'),
        ]);
        return 'Deleted Successfully!';
    }


}
