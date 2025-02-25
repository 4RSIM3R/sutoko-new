<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        $this->call([
            PermissionSeeder::class,
            Icd9Seeder::class,
            Icd10Seeder::class,
            RegionSeeder::class,
            UserSeeder::class,
            // PatientSeeder::class,
            ProfileSeeder::class,
        ]);
    }
}
