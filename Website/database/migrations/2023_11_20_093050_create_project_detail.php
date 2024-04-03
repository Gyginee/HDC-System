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
      $table->string('staff_id');
      $table->string('name');
      $table->integer('quantity');
      $table->string('unit');
      $table->integer('type');
      $table->bigInteger('client_cost');
      $table->bigInteger('internal_cost');
      $table->bigInteger('real_client_cost');
      $table->bigInteger('real_internal_cost');
      $table->integer('status');
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
