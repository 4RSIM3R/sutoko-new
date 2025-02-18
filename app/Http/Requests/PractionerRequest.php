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
            'nip' => ['required', 'string', 'max:255'],
            'prefix' => ['nullable', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'suffix' => ['nullable', 'string', 'max:255'],
            'birth_place' => ['required', 'string', 'max:255'],
            'birth_date' => ['required', 'date'],
            'gender' => ['required', 'in:male,female'],
            'religion' => ['required', 'string', 'max:255'],
            'occupation' => ['required', 'string', 'max:255'],
            'specialty' => ['required', 'string', 'max:255'],
        ];
    }
}
