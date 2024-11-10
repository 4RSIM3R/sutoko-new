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
            'name' => ['required', 'string', 'max:255'],
            'nik' => ['required', 'size:16'],
            'role' => ['required', 'in:doctor,pharmacist,nurse,midwife'],
            'phone_number' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:255'],
        ];
    }
}
