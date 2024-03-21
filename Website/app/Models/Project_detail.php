<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project_detail extends Model
{
  use HasFactory;

  protected $fillable = [
    'project_id',
    'vendor_id',
    'name',
    'quantity',
    'unit',
    'type',
    'client_cost',
    'internal_cost',
    'real_cost',
    'status',
  ];

  protected $table = 'project_detail';
}
