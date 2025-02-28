<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePropertyRequest extends FormRequest
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
            'title' => ['string', 'max:255'],
            'description' => ['string'],
            'price' => ['numeric', 'min:0'],
            'bedrooms' => ['integer', 'min:0'],
            'bathrooms' => ['integer', 'min:0'],
            'square_meter' => ['integer', 'min:0'],
            'address' => ['string'],
            'city' => ['string'],
            'state' => ['string', 'size:2'],
            'zip' => ['string', 'size:5','max:5'],
            'type' => ['string', 'in:house,apartment,villa'],
            'status' => ['string', 'in:for_sale,for_rent,sold,rented'],
            'images.*' => ['sometimes', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'delete_images.*' => ['sometimes', 'exists:images,id']
        ];
    }
}
