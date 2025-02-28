<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LocationRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'physical_type_code' => ['required', Rule::in(['bu', 'wi', 'co', 'ro', 've', 'ho', 'ca', 'rd', 'area'])],
            'capacity' => ['required', 'integer', 'min:1'],
            'encounter_type' => ['required', Rule::in(['outpatient', 'inpatient'])],
            'administration_fee' => ['required', 'numeric'],
        ];
    }
}
