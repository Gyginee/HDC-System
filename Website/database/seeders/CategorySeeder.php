<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      // Insert default types
      Category::insert([
        ['name' => 'Nông nghiệp'],
        ['name' => 'Thực phẩm'],
        ['name' => 'Y dược'],
        ['name' => 'Công nghệ thông tin'],
        ['name' => 'Dịch vụ'],
        ['name' => 'Giao thông vận tải'],
        ['name' => 'Bất động sản'],
        ['name' => 'Hóa chất'],
        ['name' => 'Năng lượng'],
        ['name' => 'Truyền thông'],
        ['name' => 'Vận tải hàng hóa'],
        ['name' => 'Ngân hàng'],
        ['name' => 'Dầu khí'],
        ['name' => 'Thiết kế'],
        ['name' => 'Giáo dục'],
        ['name' => 'Thể thao'],
        ['name' => 'Du lịch'],
        ['name' => 'Môi trường'],
        ['name' => 'Xây dựng'],
        ['name' => 'Tài chính'],
      // Add more types as needed
    ]);
    }
}
