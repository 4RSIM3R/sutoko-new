<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PatientRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:225'],
            'nik' => ['nullable', 'size:16'],
            'birth_date' => ['nullable', 'date'],
            'religion' => ['nullable', 'string'],
            'blood_group' => ['nullable', 'string'],
            'education' => ['nullable', 'string'],
            'marital_status' => ['nullable', 'string'],
            'occupation' => ['nullable', 'string'],
            'phone_number' => ['nullable', 'string'],
            'address' => ['nullable', 'string'],
        ];
    }
}
