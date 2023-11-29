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
        Schema::table('staffs', function (Blueprint $table) {
            $table->foreign('role_id')
                ->references('id')
                ->on('roles')
                ->onDelete('cascade');
        });

        Schema::table('salary', function (Blueprint $table) {

            // Foreign key constraint
            $table->foreign('staff_id')
                ->references('staff_id')
                ->on('staffs')
                ->onDelete('cascade');
        });

        Schema::table('staff_detail', function (Blueprint $table) {

            // Add foreign key constraint
            $table->foreign('staff_id')
                ->references('staff_id')
                ->on('staffs')
                ->onDelete('cascade');
        });

        Schema::table('user_permissions', function (Blueprint $table) {
            $table->foreign('staff_id')
                ->references('staff_id')
                ->on('staffs')
                ->onDelete('cascade');

            $table->foreign('permission_id')
                ->references('id')
                ->on('permissions')
                ->onDelete('cascade');
        });

        Schema::table('project_permission', function (Blueprint $table) {
            // Foreign key constraints
            $table->foreign('staff_id')
                ->references('staff_id')
                ->on('staffs')
                ->onDelete('cascade');

            $table->foreign('project_id')
                ->references('id')
                ->on('projects')
                ->onDelete('cascade');
        });

        Schema::table('project_detail', function (Blueprint $table) {

            // Add foreign key constraint
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
        });

        Schema::table('project_detail', function (Blueprint $table) {

            // Add foreign key constraint
            $table->foreign('vendor_id')->references('id')->on('vendors')->onDelete('cascade');
        });


        Schema::table('assets', function (Blueprint $table) {

            // Add foreign key constraint
            $table->foreign('grant_staff')->references('staff_id')->on('staffs')->onDelete('cascade');
        });

        Schema::table('projects', function (Blueprint $table) {

            // Add foreign key constraint
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('staffs', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
        });

        Schema::table('salary', function (Blueprint $table) {
            $table->dropForeign(['staff_id']);
        });

        Schema::table('staff_detail', function (Blueprint $table) {
            $table->dropForeign(['staff_id']);
        });

        Schema::table('user_permissions', function (Blueprint $table) {
            $table->dropForeign(['staff_id']);
            $table->dropForeign(['permission_id']);
        });

        Schema::table('project_permission', function (Blueprint $table) {
            $table->dropForeign(['staff_id']);
            $table->dropForeign(['project_id']);
        });

        Schema::table('project_detail', function (Blueprint $table) {
            $table->dropForeign(['project_id']);
        });

        Schema::table('assets', function (Blueprint $table) {
            $table->dropForeign(['grant_staff']);
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->dropForeign(['client_id']);
        });
    }
};
