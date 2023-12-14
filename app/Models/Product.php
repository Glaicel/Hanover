<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'sales.DEALER_PRODUCTS'; // Specify the actual table name

    protected $primaryKey = 'dealer_product_id'; // Specify the primary key if different from 'id'

}
