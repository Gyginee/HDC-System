<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Type;

class TypeSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    // Insert default types
    Type::insert([
      ['name' => 'Design'],
      ['name' => 'IT'],
      ['name' => 'Visual'],
      ['name' => 'Production'],
      ['name' => 'Sound'],
      ['name' => 'Account'],
      ['name' => 'Planner'],
      ['name' => 'Operation'],
      // Add more types as needed
    ]);
  }
}
