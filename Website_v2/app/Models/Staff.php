<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Staff extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'staff_id',
        'fullname',
        'phone',
        'email',
        'role_id',
        'password',
    ];

    protected $table = 'staffs';

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    // Add any additional relationships or methods as needed
}
