<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EncounterRequest extends FormRequest
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
            'patient_id' => ['required', 'exists:patients,id'],
            'practioner_id' => ['required', 'exists:practioners,id'],
            'location_id' => ['required', 'exists:locations,id'],
            'payment_assurance_id' => ['required', 'exists:payment_assurances,id'],
            'send_questionnaire' => ['required', 'boolean'],
        ];
    }
}
