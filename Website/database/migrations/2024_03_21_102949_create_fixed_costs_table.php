<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFixedCostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fixed_costs', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('name');
            $table->decimal('amount', 10, 2);
            $table->string('start_date');
            $table->string('end_date')->nullable();
            $table->text('additional_details')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fixed_costs');
    }
}
