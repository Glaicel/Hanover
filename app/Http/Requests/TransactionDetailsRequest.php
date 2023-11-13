<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest; 

class TransactionDetailsRequest extends FormRequest
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
            'transaction_id' => 'required|exists:transactions,transaction_id',
            'vin' => 'required|exists:vehicles,vin',
            'dealer_id' => 'required|exists:dealers,dealer_id',
            'parts_id' => 'required|exists:parts,parts_id',
            'supplier_id' => 'required|exists:suppliers,supplier_id',
            'customer_id' => 'required|exists:customers,customer_id',
            'quantity' => 'required|integer|min:1',
        ];
    }
}
