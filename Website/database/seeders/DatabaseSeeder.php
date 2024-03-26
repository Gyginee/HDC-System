<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Call other seeder classes here if needed
        $this->call(TypeSeeder::class);
        $this->call(StaffSeeder::class);
        $this->call(StatusSeeder::class);
        $this->call(CostTypeSeeder::class);
        // Add more seeder classes as needed
    }
}
