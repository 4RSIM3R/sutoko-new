<?php

namespace App\Http\Requests\SatuSehat;

use Illuminate\Foundation\Http\FormRequest;

class FamilyHistoryRequest extends FormRequest
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
            'disease_code' => ['required', 'string'],
            'disease_display' => ['required', 'string'],
            'relation_code' => ['required', 'string'],
            'relation_display' => ['required', 'string'],
            'outcome_code' => ['required', 'string'],
            'outcome_display' => ['required', 'string'],
            'contributed_to_death' => ['required', 'boolean'],
            'notes' => ['required', 'string'],
        ];
    }
}
