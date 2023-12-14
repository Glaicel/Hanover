<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ModelEngineTypeController extends Controller
{
    public function generate_model_engine_type ()
    {
        DB::select ('SELECT * FROM production.MODEL_ENGINE_TYPE');
    }

    public function insert_model_engine_type (Request $r) 
    {
        DB::insert ('INSERT INTO production.MODEL_ENGINE_TYPE (model_id, engine_name) VALUES (:a, :b)', [
            'a' =>$r->input('model_id'),
            'b' =>$r->input('engine_name')
        ]);
    }

    public function update_model_engine_type (Request $r) 
    {
        DB::update ('UPDATE production.MODEL_ENGINE_TYPE SET model_id= :a, engine_name= :b WHERE met_id= :c', [
            'a' =>$r->input('model_id'),
            'b' =>$r->input('engine_name'),
            'c' =>$r->input('id')
        ]);

        return ('Update Successful');
    }

    public function delete_model_engine_type(Request $r)
    {
        DB::delete('DELETE FROM production.MODEL_ENGINE_TYPE WHERE met_id = :a',[
            'a' => $r->input('id'),
        ]);
        return 'Deleted Successfully!';
    }

}
