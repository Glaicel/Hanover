<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
  public function search(Request $request)
    {
        $searchTerm = $request->input('brand_name');

        $results = DB::table('production.brands') // Remove the 'production.' schema prefix
            ->where('brand_name', 'ilike', "%{$searchTerm}%")
            ->get();

        return response()->json(['results' => $results]);
    }
}
