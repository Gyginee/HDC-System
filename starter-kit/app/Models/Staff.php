<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Staff extends Model
{
    protected $fillable = [
        'staff_id',
        'fullname',
        'phone',
        'email',
        'role_id',
        'password',
    ];

    // You may need to customize the table name if it's different from the model name in plural form
    protected $table = 'staffs';
    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    // Add any additional relationships or methods as needed
}
