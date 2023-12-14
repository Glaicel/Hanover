<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth; 

class CustomerController extends Controller
{
    public function insert_customer_transaction (Request $r)
    {
        \Log::info('Received request data:', $r->all());

        $customer_id = Auth::user()->id;
        $customer_name = Auth::user()->name;
        $customer_address = Auth::user()->address;

        DB::insert('INSERT INTO sales.customer_transaction 
        (brand_name, VIN, model_name, color, engine_type, transmission_type, selling_price, dealer_id, dealer_name, customer_name, quantity, amount, image_path, customer_id, address) 
        VALUES 
        (:brand, :VIN, :model, :color, :engine, :transmission, :selling_price, :dealer_id, :dealer_name, :customer_name, :quantity, :amount, :image_path, :customer_id, :address)',
        [   
            'brand' => $r->input('brand_name'),
            'VIN' => $r->input('VIN'),
            'model' => $r->input('model_name'),
            'color' => $r->input('color'),
            'engine' => $r->input('engine_type'),
            'transmission' => $r->input('transmission_type'),
            'selling_price' => $r->input('selling_price'),
            'dealer_id' => $r->input('dealer_id'),
            'dealer_name' => $r->input('dealer_name'),
            'customer_name' => $customer_name,
            'quantity' => $r->input('quantity'),
            'amount' => $r->input('amount'),
            'image_path' => $r->input('image_path'),
            'address' =>$customer_address,
            'customer_id' => $customer_id, 
            
        ]);
    

        return 'Purchased Successfully';
    }

        
    public function generate_customer_transaction()
    {
        try {
            $customer_id = Auth::user()->id;
            $customer_transactions = DB::select('SELECT * FROM sales.customer_transaction WHERE customer_id = :customer_id', ['customer_id' => $customer_id]);
            return response()->json($customer_transactions);
        } catch (\Exception $e) {
            // Log the exception
            \Log::error('Error fetching transactions: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

}
