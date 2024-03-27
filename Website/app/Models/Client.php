<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'name',
        'address',
        'imagePath',
        'en_name',
        'owner',
        'address',
        'dif_address',
        'industry_type',
        'category',
        'tax_code',
        'contract_duration',
    ];

    protected $table = 'clients';

    // Add any additional relationships or methods as needed
}
