<?php

namespace Database\Seeders;

use App\Models\Patient;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $payload = [
            [
                "nik" => "9271060312000001",
                "satu_sehat_id" => "P02478375538",
                "name" => "Ardianto Putra",
                "gender" => "male",
            ],
            [
                "nik" => "9201394901000008",
                "satu_sehat_id" => "P00883356749",
                "name" => "Sonia Herdianti",
                "gender" => "female",
            ],
            [
                "nik" => "9210060207000010",
                "satu_sehat_id" => "P02428473601",
                "name" => "Syarif Muhammad",
                "gender" => "male",
            ],
        ];

        Patient::insert($payload);
    }
}
