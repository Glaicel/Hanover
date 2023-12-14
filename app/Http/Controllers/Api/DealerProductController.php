<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth; 
use App\Models\Product;

class DealerProductController extends Controller
{
    public function sellProduct (Request $r) {
        \Log::info('Received request data:', $r->all());
        $dealer_id = Auth::user()->id;
        $dealer_name = Auth::user()->name;

        DB::insert ('INSERT INTO sales.DEALER_PRODUCTS (brand_name, VIN, model_name, color, engine_type, transmission_type, 
        selling_price, transaction_id, image_path, dealer_name, dealer_id) VALUES (:a, :b, :c, :d, :e, :f, :g, :h, :i, :j, :k)', [
            'a' =>$r->input('brand_name'),
            'b' =>$r->input('VIN'),
            'c' =>$r->input('model_name'),
            'd' =>$r->input('color'),
            'e' =>$r->input('engine_type'),
            'f' =>$r->input('transmission_type'),
            'g' =>$r->input('selling_price'),
            'h' =>$r->input('transaction_id'),
            'i' =>$r->input('image_path'),
            'j' =>$dealer_name,
            'k' =>$dealer_id

        ]);
        return 'Inserted Successfully';
    }
    

    public function viewProducts () {
        try {
            $dealer_id = Auth::user()->id;
            $dealer_products = DB::select('SELECT * FROM sales.dealer_products WHERE dealer_id = :dealer_id', ['dealer_id' => $dealer_id]);
            return response()->json($dealer_products);
        } catch (\Exception $e) {
            // Log the exception
            \Log::error('Error fetching products: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function sellTransaction(Request $request)
    {
        // Validate the request data

        // Update the quantity in the 'transactions' table
        DB::table('sales.transactions')
            ->where('transaction_id', $request->input('transaction_id'))
            ->decrement('quantity', $request->input('quantity'));

        // Get the details of the transaction to be sold
        $transactionDetails = DB::table('sales.transactions')
            ->where('transaction_id', $request->input('transaction_id'))
            ->first();

        // Insert the sold transaction into the 'DEALER_PRODUCTS' table
        DB::table('sales.DEALER_PRODUCTS')->insert([
            'brand_name' => $transactionDetails->brand_name,
            'VIN' => $transactionDetails->VIN,
            'model_name' => $transactionDetails->model_name,
            'color' => $transactionDetails->color,
            'engine_type' => $transactionDetails->engine_type,
            'transmission_type' => $transactionDetails->transmission_type,
            'selling_price' => $request->input('selling_price'),
            'dealer_name' => Auth::user()->name, // Assuming dealer name is the name of the authenticated user
            'dealer_id' => Auth::user()->id,
        ]);

        return response()->json(['message' => 'Transaction sold successfully']);
    }

    public function storeSoldTransaction(Request $request)
    {
        // Validate the request data if needed

        // Insert the sold transaction into the 'DEALER_PRODUCTS' table
        DB::table('sales.dealer_products')->insert([
            'VIN' => $request->input('VIN'),
            'brand_name' => $request->input('brand_name'),
            'model_name' => $request->input('model_name'),
            'color' => $request->input('color'),
            'engine_type' => $request->input('engine_type'),
            'transmission_type' => $request->input('transmission_type'),
            'selling_price' => $request->input('selling_price'),
            'dealer_name' => $request->input('dealer_name'),
            'dealer_id' => $request->input('dealer_id'),
        ]);

        return response()->json(['message' => 'Sold transaction stored successfully']);
    }

    public function showProducts(Request $request)
    {
        $searchTerm = $request->search;
        $query = DB::table('sales.dealer_products');
        if($searchTerm)
        {
            $query->where(function ($query) use ($searchTerm) {
                $query->where('brand_name', 'ILIKE', "%$searchTerm%")
                    ->orWhere('dealer_name', 'ILIKE', "%$searchTerm%")
                    ->orWhere('model_name', 'ILIKE', "%$searchTerm%");
            });
        }

        $products = $query->get();
        return response()->json($products);
    }


    public function showProduct($id)
    {
        $product = DB::table('sales.dealer_products')
        ->where('dealer_product_id', $id)
        ->first();

        return response()->json($product);
    }

}
