<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VehicleTypeController extends Controller
{
    public function generate_vehicle_type () {
        try {
            $vehicleTypes = DB::select('SELECT * FROM production.VEHICLE_TYPES');
            return response()->json($vehicleTypes);
        } catch (\Exception $e) {
            // Log the exception
            \Log::error('Error fetching vehicle types: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
    public function insert_vehicle_type (Request $r) 
    {
        DB::insert ('INSERT INTO production.VEHICLE_TYPES (vehicle_type, image_path) VALUES (:a, :b)', [
            'a' =>$r->input('vehicle_type'),
            'b' =>$r->input('image_path'),
        ]);
    }

    public function update_vehicle_type (Request $r) 
    {
        DB::update ('UPDATE production.VEHICLE_TYPES SET vehicle_type = :a, image_path= :b WHERE vehicle_id= :c', [
            'a' =>$r->input('vehicle_type'),
            'b' =>$r->input ('image_path'),
            'c' =>$r->input('id')
        ]);
    }

    public function delete_vehicle_type(Request $r)
    {
        DB::delete('DELETE FROM production.VEHICLE_TYPES WHERE vehicle_id = :a',[
            'a' => $r->input('id'),
        ]);
        return 'Deleted Successfully!';
    }

}
