<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Status;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Status::insert([
          ['name' => 'Kết thúc'],
          ['name' => 'Thành Công'],
          ['name' => 'Đang diễn ra'],
          ['name' => 'Tạm dừng'],
        ]);
    }
}
