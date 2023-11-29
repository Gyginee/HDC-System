<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'address',
        'type_id',
    ];

    protected $table = 'clients';

    public function type()
    {
        return $this->belongsTo(Type::class, 'type_id');
    }

    // Add any additional relationships or methods as needed
}
