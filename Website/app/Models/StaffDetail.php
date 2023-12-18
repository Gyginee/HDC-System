<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'staff_id',
        'bank_number',
        'bank_name',
        'social_insurance',
        'join_date',
    ];

    protected $table = 'staff_detail';

    public function staff()
    {
        return $this->belongsTo(Staff::class, 'staff_id');
    }
}
