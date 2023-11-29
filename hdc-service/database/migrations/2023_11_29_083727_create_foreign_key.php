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
        Schema::table('staff_detail', function (Blueprint $table) {
            $table->foreign('staff_id')->references('staff_id')->on('staffs');
        });

        Schema::table('salary', function (Blueprint $table) {
            $table->foreign('staff_id')->references('staff_id')->on('staffs');
        });

        Schema::table('user_permissions', function (Blueprint $table) {
            $table->foreign('staff_id')->references('staff_id')->on('staffs');
            $table->foreign('permission_id')->references('id')->on('permissions');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->foreign('client_id')->references('id')->on('clients');
        });

        Schema::table('project_detail', function (Blueprint $table) {
            $table->foreign('project_id')->references('id')->on('projects');
            $table->foreign('vendor_id')->references('id')->on('vendors');
        });

        Schema::table('project_permission', function (Blueprint $table) {
            $table->foreign('project_id')->references('id')->on('projects');
            $table->foreign('staff_id')->references('staff_id')->on('staffs');
        });
        Schema::table('clients', function (Blueprint $table) {
            $table->foreign('type_id')->references('id')->on('types');
        });

        Schema::table('vendors', function (Blueprint $table) {
            $table->foreign('type_id')->references('id')->on('types');
        });

        Schema::table('staffs', function (Blueprint $table) {
            $table->foreign('role_id')->references('id')->on('roles');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->foreign('client_id')->references('id')->on('clients');
        });

        Schema::table('assets', function (Blueprint $table) {
            $table->foreign('grant_staff')->references('staff_id')->on('staffs');
        });

        Schema::table('project_detail', function (Blueprint $table) {
            $table->foreign('project_id')->references('id')->on('projects');
            $table->foreign('vendor_id')->references('id')->on('vendors');
        });

        Schema::table('project_permission', function (Blueprint $table) {
            $table->foreign('project_id')->references('id')->on('projects');
            $table->foreign('staff_id')->references('staff_id')->on('staffs');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('staff_detail', function (Blueprint $table) {
            $table->dropForeign('staff_detail_staff_id_foreign');
        });

        Schema::table('salary', function (Blueprint $table) {
            $table->dropForeign('salary_staff_id_foreign');
        });

        Schema::table('user_permissions', function (Blueprint $table) {
            $table->dropForeign('user_permissions_staff_id_foreign');
            $table->dropForeign('user_permissions_permission_id_foreign');
        });

        Schema::table('clients', function (Blueprint $table) {
            $table->dropForeign('clients_type_id_foreign');
        });

        Schema::table('vendors', function (Blueprint $table) {
            $table->dropForeign('vendors_type_id_foreign');
        });

        Schema::table('staffs', function (Blueprint $table) {
            $table->dropForeign('staffs_role_id_foreign');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->dropForeign('projects_client_id_foreign');
        });

        Schema::table('assets', function (Blueprint $table) {
            $table->dropForeign('assets_grant_staff_foreign');
        });

        Schema::table('project_detail', function (Blueprint $table) {
            $table->dropForeign('project_detail_project_id_foreign');
            $table->dropForeign('project_detail_vendor_id_foreign');
        });

        Schema::table('project_permission', function (Blueprint $table) {
            $table->dropForeign('project_permission_project_id_foreign');
            $table->dropForeign('project_permission_staff_id_foreign');
        });
    }
};
