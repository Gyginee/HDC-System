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
    Schema::create('project_detail', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('project_id');
      $table->unsignedBigInteger('vendor_id');
      $table->string('name');
      $table->integer('quantity');
      $table->string('unit');
      $table->string('type');
      $table->float('client_cost');
      $table->float('internal_cost');
      $table->float('real_cost');
      $table->boolean('status');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('project_detail');
  }
};
