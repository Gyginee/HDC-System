<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'address',
        'imagePath',
        'type_id',
        'tax_code',
        'contract_duration',
    ];

    protected $table = 'vendors';
}
