<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ColorController extends Controller
{
    public function generate_color ()
    {   
        DB::select ('SELECT * FROM production.colors');
    }

    public function insert_color (Request $r) 
    {
        DB::insert ('INSERT INTO production.COLORS (color_id, color_name) VALUES (:a, :b)', [
            'a' =>$r->input('color_id'),
            'b' =>$r->input('color_name')
        ]);
    }

    public function update_color (Request $r) 
    {
        DB::update ('UPDATE production.COMPANIES SET color_name = :a WHERE color_id= :b', [
            'a' =>$r->input('color_name'),
            'b' =>$r->input('id')
        ]);
    }

    public function delete_color(Request $r)
    {
        DB::delete('DELETE FROM production.COLORS WHERE color_id = :a',[
            'a' => $r->input('id'),
        ]);
        return 'Deleted Successfully!';
    }


}
