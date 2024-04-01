<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('vendors', function (Blueprint $table) {
      $table->id(); // This creates an auto-incrementing primary key column 'id'
      $table->string('name');
      $table->string('phone');
      $table->string('address');
      $table->unsignedBigInteger('type_id');
      $table->string('tax_code');
      $table->string('contract_duration');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('vendors');
  }
};
