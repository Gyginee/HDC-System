<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'cost',
        'real_cost',
        'status',
        'client_id'
    ];

    protected $table = 'projects';

}
