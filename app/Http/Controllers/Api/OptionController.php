<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OptionController extends Controller
{

    public function showColors (Request $r){

            DB::select ('SELECT * FROM production.COLORS');
    }

    public function showEngine( Request $r){

        DB::select ('SELECT * FROM production.MODEL_ENGINE_TYPE');
    }

    public function showTransmission (Request $r){
        
    }
}
