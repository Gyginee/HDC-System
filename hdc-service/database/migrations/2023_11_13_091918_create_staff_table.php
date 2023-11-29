<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('staffs', function (Blueprint $table) {
            $table->id();
            $table->string('staff_id');
            $table->string('fullname');
            $table->string('phone'); // Change to string if non-numeric characters are allowed
            $table->string('email')->unique();
            $table->unsignedBigInteger('role_id'); // Adjust according to your Role model
            $table->string('password');
            $table->timestamps();

        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staffs');
    }
};
