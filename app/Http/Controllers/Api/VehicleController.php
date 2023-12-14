<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VehicleController extends Controller
{

    public function countVehicles(Request $request)
    {
        $vehicleCount = DB::table('production.vehicles')->count();
    
        return response()->json(['vehicle_count' => $vehicleCount]);
    }



    public function generate_vehicles () 
    {
        try {
            $vehicles = DB::select('SELECT * FROM production.VEHICLES');
            return response()->json($vehicles);
        } catch (\Exception $e) {
            // Log the exception
            \Log::error('Error fetching vehicles: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function generate_vehicle_public (Request $r)
    {
        return DB::select('SELECT
        V.VIN,
        V.color,
        V.transmission_type,
        ME.engine_name AS engine_type,
        M.model_name,
        B.brand_name,
        V.price,
        V.availability,
        M.image_path AS model_image_path
    FROM
        production.VEHICLES V
    JOIN
        production.MODELS M ON V.model_id = M.model_id
    JOIN
        production.BRANDS B ON V.brand_id = B.brand_id
    JOIN
        production.model_engine_type ME ON V.met_id = ME.met_id;
    
    ');
    }
    
    public function generate_specific_vehicle(Request $r)
    {
        return DB::select('SELECT
        V.VIN,
        V.color,
        V.transmission_type,
        ME.engine_name AS engine_type,
        M.model_name,
        B.brand_name,
        V.price,
        V.availability,
        M.image_path AS model_image_path
    FROM
        production.VEHICLES V
    JOIN
        production.MODELS M ON V.model_id = M.model_id
    JOIN
        production.BRANDS B ON V.brand_id = B.brand_id
    JOIN
        production.model_engine_type ME ON V.met_id = ME.met_id;
    
    ');
    }

    public function generate_vehicle_one(Request $r)
{
    // Assuming $r->vin contains the VIN you want to query
    $vin = $r->input('vin');

    $result = DB::select('
        SELECT
            V.VIN,
            V.color,
            V.transmission_type,
            ME.engine_name AS engine_type,
            M.model_name,
            B.brand_name,
            V.price,
            V.availability,
            M.image_path AS model_image_path
        FROM
            production.VEHICLES V
        JOIN
            production.MODELS M ON V.model_id = M.model_id
        JOIN
            production.BRANDS B ON V.brand_id = B.brand_id
        JOIN
            production.model_engine_type ME ON V.met_id = ME.met_id
        WHERE
            V.VIN = :a');

    return $result;
}



public function generateSpecificVehicle(Request $request)
{
    $searchTerm = $request->search;
    $query = DB::table('production.brands')
        ->leftJoin('production.models', 'production.brands.brand_id', '=', 'production.models.brand_id')
        ->leftJoin('production.vehicles', 'production.models.model_id', '=', 'production.vehicles.model_id')
        ->select(
            'production.brands.brand_name',
            'production.models.model_name',
            'production.vehicles.vin',
            'production.vehicles.color',
            'production.vehicles.transmission_type'
        );

    if ($searchTerm) {
        $query->where(function ($query) use ($searchTerm) {
            $query->where('production.brands.brand_name', 'ILIKE', "%$searchTerm%")
                ->orWhere('production.models.model_name', 'ILIKE', "%$searchTerm%")
                ->orWhere('production.vehicles.vin', 'ILIKE', "%$searchTerm%");
        });
    }

    $products = $query->get();
    return response()->json($products);
}




    
    public function insert_vehicle (Request $r)
    {
        DB::insert ('INSERT INTO production.VEHICLES (model_id, color, engine_type, transmission_type, is_diesel, price availability) VALUES (:a, :b. :c, :d, :e, :f)', [
            'a' =>$r->input('model_id'),
            'b' =>$r->input('color'),
            'c' =>$r->input('engine_type'),
            'd' =>$r->input('transmission_type'),
            'e' =>$r->input('is_diesel'),
            'f'  =>$r->input('price'),
            'g' =>$r->input('availability'),
        ]);
    }


    public function update_vehicle (Request $r) 
    {
        DB::update ('UPDATE production.VEHICLES SET model_id = :a, color= :b, engine_type = :c, transmission_type= :d, is_diesel = :e, pricec = :f,  availability = :g,  WHERE parts_id= :h', [
            'a' =>$r->input('model_id'),
            'b' =>$r->input('color'),
            'c' =>$r->input('engine_type'),
            'd' =>$r->input('transmission_type'),
            'e' =>$r->input('is_diesel'),
            'f'  =>$r->input('price'),
            'g' =>$r->input('availability'),
            'h' =>$r->input ('id')
        ]);
    }

    public function delete_vehicles(Request $r)
    {
        DB::delete('DELETE FROM production.VEHICLE WHERE vehicle_id = :a',[
            'a' => $r->input('id'),
        ]);
        return 'Deleted Successfully!';
    }



    

}
