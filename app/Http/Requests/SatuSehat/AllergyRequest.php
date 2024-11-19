<?php

namespace App\Http\Requests\SatuSehat;

use Illuminate\Foundation\Http\FormRequest;

class AllergyRequest extends FormRequest
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
            'type' => ['required', 'in:food,medicine,environment'],
            'code' => ['required', 'string'],
            'display' => ['required', 'string'],
            'notes' => ['required', 'string'],
        ];
    }
}
