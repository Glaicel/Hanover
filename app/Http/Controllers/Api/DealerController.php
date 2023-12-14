<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth; 


class DealerController extends Controller
{


    public function dealer_customer_profile($dealerId)
    {
        try {
            $dealer = DB::table('users as u')
                ->join('sales.dealer_products as c', 'u.id', '=', 'c.dealer_id')
                ->where('u.id', $dealerId) // Add a condition to filter by dealer ID
                ->select(
                    'u.id AS dealer_id',
                    'u.name AS dealer_name',
                    'u.email AS dealer_email',
                    'u.address AS dealer_address',
                    'u.phone_number AS dealer_phone_number'
                )
                ->first(); // Use first() to get a single result
    
            if ($dealer) {
                return response()->json($dealer);
            } else {
                return response()->json(['error' => 'Dealer not found'], 404);
            }
        } catch (\Exception $e) {
            // Handle other exceptions, if any
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
    

    public function dealer_customers(Request $r){
        
        $dealerCount = DB::select('SELECT COUNT(*) AS dealer_count FROM users WHERE role = ?', ['dealer']);

        return response()->json(['dealer_count' => $dealerCount[0]->dealer_count]);
    }

    public function showSold(){
        try{
            $user_id = Auth::user()->id;
            $purchases = DB::select('SELECT * FROM sales.customer_transaction WHERE dealer_id = :dealer_id', ['dealer_id'=> $user_id]);
            return response()->json($purchases);
        } catch(\Exception $e) {
            \Log::error('Error fetching transactions: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function vinSearch (Request $request) {
        try{
            $user_id = Auth::user()->id;
            $searchTerm = $request->search;
            $query = DB::table('sales.customer_transaction')->where('dealer_id', $user_id);
            if($searchTerm)
            {
                $query->where(function ($query) use ($searchTerm) {
                    $query->where('brand_name', 'ILIKE', "%$searchTerm%")
                        ->orWhere('vin', 'ILIKE', "%$searchTerm%")
                        ->orWhere('model_name', 'ILIKE', "%$searchTerm%");
                });
            }
            $products = $query->get();
            return response()->json($products);
        } catch(\Exception $e) {
            \Log::error('Error fetching transactions: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
    

    public function show_dealers () {

        return DB::select('SELECT * FROM sales.DEALERS');
    }

    public function insert_dealer (Request $r) {

        DB::insert('INSERT INTO sales.DEALERS (dealer_name) VALUES (:a)', [
            'a' => $r->input('dealer_name'),
        ]);
        return 'Successful'; 
    }
    public function update_dealer(Request $r)
    {
        DB::update('UPDATE sales.DEALERS SET dealer_name = :a WHERE dealer_id = :b', [
            'a' => $r->input('dealer_name'),
            'b' => $r->input('id'),
        ]);
    
        return 'Update successful';
    }

    
    public function delete_dealer(Request $r)
    {
        DB::delete('DELETE FROM sales.DEALERS WHERE dealer_id = :a',[
            'a' => $r->input('id'),
        ]);

        return 'Deleted Successfully!';
    }


}
