<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PractionerRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nik' => ['required', 'string', 'min:16', 'max:16'],
            'employee_id' => ['required', 'string', 'max:255'],
            'prefix' => ['required', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'suffix' => ['required', 'string', 'max:255'],
            'birth_place' => ['required', 'string', 'max:255'],
            'birth_date' => ['required', 'date'],
            'gender' => ['required', 'in:male,female'],
            'religion' => ['required', 'string', 'max:255'],
            'occupation' => ['required', 'string', 'max:255'],
            'specialty' => ['required', 'string', 'max:255'],
            'str' => ['required', 'file', 'max:10240', 'mimes:pdf,doc,docx'],
            'str_expired' => ['nullable', 'date'],
            'sip' => ['required', 'file', 'max:10240', 'mimes:pdf,doc,docx'],
            'sip_expired' => ['nullable', 'date'],
        ];
    }
}
