<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;
    protected $table = 'production.BRANDS'; // Specify the actual table name

    protected $primaryKey = 'brand_id'; // Specify the primary key if different from 'id'
}
