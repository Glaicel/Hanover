<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth; 


class DTransactionController extends Controller
{

    public function generate_transaction_DEALER_ADMIN()
    {
        try {
            $transactions = DB::select('SELECT * FROM sales.transactions' );
            return response()->json($transactions);
        } catch (\Exception $e) {
            // Log the exception
            \Log::error('Error fetching transactions: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
    public function count_transaction()
    {
        try {
            $result = DB::select('SELECT COUNT(*) AS transaction_count FROM sales.transactions');
    
            // Log the result for debugging
            \Log::info('Count Transaction Result:', ['result' => $result]);
    
            // Check if there are any results before accessing the count
            if (!empty($result) && isset($result[0]->transaction_count)) {
                return $result[0]->transaction_count;
            }
    
            // Return 0 if no result or count is not available
            return 0;
        } catch (\Exception $e) {
            // Log any exceptions for debugging
            \Log::error('Error counting transactions:', ['error' => $e->getMessage()]);
    
            // Return 0 in case of an error
            return 0;
        }
    }
    
    
    public function generate_transaction()
    {
        try {
            $user_id = Auth::user()->id;
            $transactions = DB::select('SELECT * FROM sales.transactions WHERE user_id = :user_id', ['user_id' => $user_id]);
            return response()->json($transactions);
        } catch (\Exception $e) {
            // Log the exception
            \Log::error('Error fetching transactions: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }


    public function insert_transaction (Request $r)
    {
        \Log::info('Received request data:', $r->all());

        $user_id = Auth::user()->id;

        DB::insert('INSERT INTO sales.transactions ( VIN, image_path, model_name, 
        brand_name, color, engine_type, transmission_type, price, quantity, amount, user_id) VALUES (:a, :b, :c, :d, :e, :f, :g, :h, :i, :j, :k)',
        [   
            'a' =>$r->input('VIN'),
            'b' =>$r->input('image_path'),
            'c' =>$r->input('model_name'),
            'd' =>$r->input('brand_name'),
            'e' =>$r->input('color'),
            'f' =>$r->input('engine_type'),
            'g' =>$r->input('transmission_type'),
            'h'  =>$r->input('price'),
            'i' =>$r->input('quantity'),
            'j' =>$r->input('amount'),
            'k' =>$user_id
        ]);

        return 'Purchased Successfully';
    }

}
