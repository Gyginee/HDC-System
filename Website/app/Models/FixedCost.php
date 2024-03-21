<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FixedCost extends Model
{
  use HasFactory;
  protected $fillable = [
    'type',
    'name',
    'amount',
    'start_date',
    'end_date',
    'additional_details',
];
  protected $table = 'fixed_costs';
}
