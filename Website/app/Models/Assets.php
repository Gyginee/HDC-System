<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assets extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'name',
        'price',
        'buy_date',
        'condition',
        'grant_staff',
        'grant_date',
        'status',
    ];

    protected $table = 'assets';

    // Add any additional relationships or methods as needed
}
