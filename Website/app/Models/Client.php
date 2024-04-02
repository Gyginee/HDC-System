<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'name',
        'short_name',
        'imagePath',
        'address',
        'dif_address',
        'category',
        'tax_code',
        'contract_duration',
    ];

    protected $table = 'clients';

    // Add any additional relationships or methods as needed
}
