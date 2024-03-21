<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CostType;

class CostTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CostType::create(['name' => 'Thuê đất/văn phòng']);
        CostType::create(['name' => 'Lương']);
        CostType::create(['name' => 'Vận hành']);
        CostType::create(['name' => 'Marketing']);
        CostType::create(['name' => 'Hợp đồng dài hạn']);
        CostType::create(['name' => 'Chi phí tài chính']);
        // Thêm các loại chi phí khác nếu cần
    }
}
