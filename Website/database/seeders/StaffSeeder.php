<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Staff;
use Illuminate\Support\Facades\Hash;

class StaffSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    // Insert default staff account
    Staff::create([
      'staff_id' => 'admin',
      'fullname' => 'Administrator',
      'phone' => '0123456789',
      'email' => 'admin@hdc.vn',
      'role_id' => 1, // Assuming role_id 1 corresponds to the admin role
      'password' => Hash::make('@123456'),
    ]);
  }
}
