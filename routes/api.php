<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\ModelsController;
use App\Http\Controllers\Api\OptionController;
use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\DealerController;
use App\Http\Controllers\Api\SupplierController;
use App\Http\Controllers\Api\PartController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\TransactionDetailsController;
use App\Http\Controllers\Api\SaleController;
use App\Http\Controllers\Api\UserRoleController;
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
Route::post('/user', [UserController::class, 'store'])->name('user.store');

Route::get('company/select', [CompanyController::class, 'generate_results']);
Route::post('company/insert', [CompanyController::class, 'insert_company']);
Route::post('company/update/{id}', [CompanyController::class, 'update_company']);
Route::post('company/delete/{id}', [CompanyController::class, 'delete_company']);


Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    //Admin Routes
    Route::controller(CompanyController::class)->group(function(){
        Route::get('/company',                   'index');
        Route::get('/company/{id}',              'show');
        Route::post('/company',                  'store');
        Route::put('/company/{id}',              'update');
        Route::delete('/company/{id}',           'destroy' );
    });
    
    Route::controller(BrandController::class)->group(function(){
        Route::get('/brand',                   'index');
        Route::get('/brand/{id}',              'show');
        Route::post('/brand',                  'store');
        Route::put('/brand/{id}',              'update');
        Route::delete('/brand/{id}',           'destroy' );
    });
    
    Route::controller(ModelsController::class)->group(function(){
        Route::get('/models',                   'index');
        Route::get('/models/{id}',              'show');
        Route::post('/models',                  'store');
        Route::put('/models/{id}',              'update');
        Route::delete('/models/{id}',           'destroy' );
    });
    
    Route::controller(OptionController::class)->group(function(){
        Route::get('/option',                   'index');
        Route::get('/option/{id}',              'show');
        Route::post('/option',                  'store');
        Route::put('/option/{id}',              'update');
        Route::delete('/option/{id}',           'destroy' );
    });
    
    
    Route::controller(VehicleController::class)->group(function(){
        Route::get('/vehicle',                   'index');
        Route::get('/vehicle/{id}',              'show');
        Route::post('/vehicle',                  'store');
        Route::put('/vehicle/{id}',              'update');
        Route::delete('/vehicle/{id}',           'destroy' );
    });
    
    Route::controller(CustomerController::class)->group(function(){
        Route::get('/customer',                   'index');
        Route::get('/customer/{id}',              'show');
        Route::post('/customer',                  'store');
        Route::put('/customer/{id}',              'update');
        Route::delete('/customer/{id}',           'destroy' );
    });
    
    Route::controller(DealerController::class)->group(function(){
        Route::get('/dealer',                   'index');
        Route::get('/dealer/{id}',              'show');
        Route::post('/dealer',                  'store');
        Route::put('/dealer/{id}',              'update');
        Route::delete('/dealer/{id}',           'destroy' );
    });
    
    Route::controller(SupplierController::class)->group(function(){
        Route::get('/supplier',                   'index');
        Route::get('/supplier/{id}',              'show');
        Route::post('/supplier',                  'store');
        Route::put('/supplier/{id}',              'update');
        Route::delete('/supplier/{id}',           'destroy' );
    });
    
    Route::controller(PartController::class)->group(function(){
        Route::get('/part',                   'index');
        Route::get('/part/{id}',              'show');
        Route::post('/part',                  'store');
        Route::put('/part/{id}',              'update');
        Route::delete('/part/{id}',           'destroy' );
    });
    
    
    Route::controller(TransactionController::class)->group(function(){
        Route::get('/transaction',                   'index');
        Route::get('/transaction/{id}',              'show');
        Route::post('/transaction',                  'store');
        Route::put('/transaction/{id}',              'update');
        Route::delete('/transaction/{id}',           'destroy' );
    });
    
    Route::controller(SaleController::class)->group(function(){
        Route::get('/sale',                   'index');
        Route::get('/sale/{id}',              'show');
        Route::post('/sale',                  'store');
        Route::put('/sale/{id}',              'update');
        Route::delete('/sale/{id}',           'destroy' );
    });
    
    
    Route::controller(UserRoleController::class)->group(function(){
        Route::get('/role',                   'index');
        Route::get('/role/{id}',              'show');
        Route::post('/role',                  'store');
        Route::put('/role/{id}',              'update');
        Route::delete('/role/{id}',           'destroy' );
    });

});

