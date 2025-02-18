<?php

namespace Database\Seeders;

use App\Models\Profile;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Profile::create([
            'name' => 'PBEC',
            'kode_faskes' => '1234567890',
            'email' => 'admin@admin.com',
            'phone_number' => '081234567890',
            'province_id' => 63420,
            'province_name' => 'Kalimantan Tengah',
            'city_id' => 63421,
            'city_name' => 'Kab. Kotawaringin Barat',
            'district_id' => 63441,
            'district_name' => 'Arut Selatan',
            'village_id' => 63444,
            'village_name' => 'Madurejo',
            'address' => 'Jl. Kebon Jeruk 17',
        ]);
    }
}
