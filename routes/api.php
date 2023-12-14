<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\ModelsController;
use App\Http\Controllers\Api\OptionController;
use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\CompanyPlantsController;
use App\Http\Controllers\Api\DealerController;
use App\Http\Controllers\Api\SupplierController;
use App\Http\Controllers\Api\PartController;
use App\Http\Controllers\Api\TransactionDetailsController;
use App\Http\Controllers\Api\VehicleTypeController;
use App\Http\Controllers\Api\InventoryItemController;
use App\Http\Controllers\Api\PlantController;
use App\Http\Controllers\Api\InventoryController;
use App\Http\Controllers\Api\ColorController;
use App\Http\Controllers\Api\ModelController;
use App\Http\Controllers\Api\ModelColorController;
use App\Http\Controllers\Api\ModelEngineTypeController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\DTransactionController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\DealerProductController;


use App\Http\Controllers\Api\SearchController;



use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AuthController;


/*
|--------------------------------------------------------------------------
| API Routes 
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" midddleware group. Make something great!
|
*/ 


//public APIs
Route::post('/login', [AuthController::class, 'login'])->name('user.login');
Route::post('/register', [UserController::class, 'store'])->name('user.store');


Route::get('/user-index', [UserController::class, 'index']);
//company
Route::get('/vehicle/show/public', [VehicleController::class, 'generate_vehicle_public']);
Route::get('/vehicle/show/public/one', [VehicleController::class, 'generate_vehicle_one']);
Route::get('/brand/select/public', [BrandController::class,    'generate_brands']);
Route::get('/brand/models/{brand_id}', [BrandController::class,    'generateBrandModels']);
Route::get('/search-brand', [SearchController::class, 'search']);

Route::middleware(['auth:sanctum'])->group(function () {

    Route::controller(UserController::class)->group(function(){
        
    Route::get('/user',                         'authenticatedUser');
    Route::get('/username',                     'authenticatedUserName');
    Route::post('/user/upload-image/{user_id}',  'uploadProfileImage');
    Route::get('/dealers',                      'getDealers');
    Route::get('/dealer',                      'searchDealer');
    });

    Route::controller(AuthController::class)->group(function(){
        Route::post('/purchase-vehicle',    'purchaseVehicle');
        Route::post('/logout',              'logout');
    });

    //Admin Routes
    Route::controller(DealerController::class)->group(function(){
        Route::get('/dealer/select',        'show_dealers');
        Route::get('dealer/count',         'dealer_customers');
        Route::get('dealer/sold/products',  'showSold');
        Route::post('/dealer/insert',       'insert_dealer');
        Route::post('/dealer/update/{id}',  'update_dealer');
        Route::post('/dealer/delete/{id}',  'delete_dealer');
        Route::post('dealer/product-show',             'vinSearch');
        Route::get('/dealer/profile/{dealerId}',   'dealer_customer_profile');
    });
    
    Route::controller(CompanyController::class)->group(function(){
        Route::get('/company/select',        'generate_companies');
        Route::get('/company/select/names',    'generate_company_names');
        Route::post('/company/insert',       'insert_company');
        Route::post('/company/update/{id}',  'update_company');
        Route::post('/company/delete/{id}',  'delete_company');
    });

    Route::controller(BrandController::class)->group(function(){
        Route::get('/brand/select',          'generate_brands');
        Route::get('/brand-models/{brandId}',  'generateBrandModels');
        Route::post('/brand/insert',         'insert_brand');
        Route::post('/brand/update/{id}',    'update_brand');
        Route::post('/brand/delete/{id}',    'delete_brand');
    });
    
    Route::controller(VehicleTypeController::class)->group(function(){
        Route::get('/vehicle/type/select',          'generate_vehicle_type');
        Route::post('/vehicle/type/insert',         'insert_vehicle_type');
        Route::post('/vehicle/type/update/{id}',    'update_vehicle_type');
        Route::post('/vehicle/type/delete/{id}',    ' delete_vehicle_type');
    });
    
    Route::controller(ColorController::class)->group(function(){
        Route::get('/color/select',        'generate_color');
        Route::post('/color/insert',       'insert_color');
        Route::post('/color/update/{id}',  'update_color');
        Route::post('/color/delete/{id}',  'delete_color');
    });

    Route::controller(ModelController::class)->group(function(){
        Route::get('/model/select',          'generate_models');
        Route::get('/model/show',          'models');
        Route::post('/model/insert',         'insert_model');
        Route::post('/model/update/{id}',    'update_model');
        Route::post('/model/delete/{id}',    'delete_model');
    });
    
    Route::controller(ModelEngineTypeController::class)->group(function(){
        Route::get('/model/engine/select',        'generate_model_engine_type');
        Route::post('/model/engine/insert',       'insert_model_engine_type');
        Route::post('/model/engine/update/{id}',  'update_model_engine_type');
        Route::post('/model/engine/delete/{id}',  'delete_model_engine_type');
    });


    Route::controller(VehicleController::class)->group(function(){
        Route::get('/vehicle/count',        'countVehicles');
        Route::get('/vehicle/select',        'generate_vehicles');
        Route::get('/vehicle/show',             'generate_specific_vehicle');
         Route::post('/vehicle/show/search',    'generateSpecificVehicle');
        Route::post('/vehicle/insert',       'insert_vehicle');
        Route::post('/vehicle/update/{id}',  'update_vehicle');
        Route::post('/vehicle/delete/{id}',  'delete_vehicle');
    });

    Route::controller(SupplierController::class)->group(function(){
        Route::get('/supplier/select',        'generate_supplier');
        Route::post('/supplier/insert',       'insert_supplier');
        Route::post('/supplier/update/{id}',  'update_supplier');
        Route::post('/supplier/delete/{id}',  'delete_supplier');
    });
    
    Route::controller(PlantController::class)->group(function(){
        Route::get('/plant/select',        'generate_plants');
        Route::post('/plant/insert',       'insert_plants');
        Route::post('/plant/update/{id}',  'update_plants');
        Route::post('/plant/delete/{id}',  'delete_plants');
    });
    
    Route::controller(PartController::class)->group(function(){
        Route::get('/part/select',        'generate_parts');
        Route::get('/part/show',        'parts');
        Route::post('/part/insert',       'insert_parts');
        Route::post('/part/update/{id}',  'update_parts');
        Route::post('/part/delete/{id}',  'delete_parts');
    });

    Route::controller(DTransactionController::class)->group(function(){
        Route::get('dealer-transaction/admin/select',        'generate_transaction_DEALER_ADMIN');
        Route::get('admin/count',                             'count_transaction');
        Route::get('dealer-transaction/select',               'generate_transaction');
        // Route::get('dealer/transaction/details/select',       'generate_dealer_to_company_transaction');
        Route::post('dealer/transaction/details/insert',      'insert_transaction');
    
    });

    Route::controller (DealerProductController::class)->group(function(){
        Route::get('dealer-products', 'viewProducts');
        Route::post('dealer-products-insert', 'sellProduct');
        Route::post('dealer-transaction/sell', 'sellTransaction');
        Route::post('sold-transactions/store', 'storeSoldTransaction');
        Route::post('/product-show',             'showProducts');
        Route::get('/product/{id}',             'showProduct');
    });

    Route::controller (OptionController::class)->group(function(){
        Route::get('option/color', 'showColors');
        Route::get('option/engine', 'showEngine');
    });
    
    Route::controller (CustomerController::class)->group(function(){
        Route::post('customer/checkout', 'insert_customer_transaction');
        Route::get('customer/transactions', 'generate_customer_transaction');
    });

});

