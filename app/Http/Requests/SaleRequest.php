<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customer_id' => 'required|exists:customers,customer_id',
            'model_id' => 'required|exists:models,model_id',
            'brand_id' => 'required|exists:brands,brand_id',
            'vin' => 'required|exists:vehicles,vin',
            'dealer_id' => 'required|exists:dealers,dealer_id',
            'total_sales_per_month' => 'required|integer|min:0',
            'transaction_id' => 'required|exists:transactions,transaction_id',
            // Add other rules for additional columns as needed
        ];
    }
}
