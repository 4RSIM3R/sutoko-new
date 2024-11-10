<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use JeroenZwart\CsvSeeder\CsvSeeder;

class Icd9Seeder extends CsvSeeder
{
   /**
     * Run the database seeds.
     *
     * @return void
     */
    public function __construct(){
        $this->file = base_path().'/database/seeders/csv/icd_9.csv';
        $this->tablename = 'icd9s';
        $this->delimiter = ',';
    }

    public function run()
    {
        // Recommended when importing larger CSVs
		DB::disableQueryLog();

		parent::run();
    }
}
