<?php

namespace App\Http\Requests\SatuSehat;

use Illuminate\Foundation\Http\FormRequest;

class VitalSignRequest extends FormRequest
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
            'systolic' => ['required', 'numeric'],
            'diastolic' => ['required', 'numeric'],
            'body_temperature' => ['required', 'numeric'],
            'heart_rate' => ['required', 'numeric'],
            'breathing_rate' => ['required', 'numeric'],
            'consciousness_code' => ['required', 'string'],
            'consciousness_display' => ['required', 'string'],
            'weight' => ['required', 'numeric'],
            'height' => ['required', 'numeric'],
        ];
    }
}
