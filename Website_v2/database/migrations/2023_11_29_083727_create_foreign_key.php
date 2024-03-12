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
            $table->foreign('staff_id')->references('staff_id')->on('staffs')->name('fk_staff_detail_staffs');
        });

        Schema::table('salary', function (Blueprint $table) {
            $table->foreign('staff_id')->references('staff_id')->on('staffs')->name('fk_salary_staffs');
        });

        Schema::table('user_permissions', function (Blueprint $table) {
            $table->foreign('staff_id')->references('staff_id')->on('staffs')->name('fk_user_permissions_staffs');
            $table->foreign('permission_id')->references('id')->on('permissions')->name('fk_user_permissions_permissions');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->foreign('client_id')->references('id')->on('clients')->name('fk_projects_clients');
        });

        Schema::table('project_detail', function (Blueprint $table) {
            $table->foreign('project_id')->references('id')->on('projects')->name('fk_project_detail_projects');
            $table->foreign('vendor_id')->references('id')->on('vendors')->name('fk_project_detail_vendors');
        });

        Schema::table('project_permission', function (Blueprint $table) {
            $table->foreign('project_id')->references('id')->on('projects')->name('fk_project_permission_projects');
            $table->foreign('staff_id')->references('staff_id')->on('staffs')->name('fk_project_permission_staffs');
        });

        Schema::table('vendors', function (Blueprint $table) {
            $table->foreign('type_id')->references('id')->on('types')->name('fk_vendors_types');
        });

        Schema::table('staffs', function (Blueprint $table) {
            $table->foreign('role_id')->references('id')->on('roles')->name('fk_staffs_roles');
        });

        Schema::table('assets', function (Blueprint $table) {
            $table->foreign('grant_staff')->references('staff_id')->on('staffs')->name('fk_assets_staffs');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('staff_detail', function (Blueprint $table) {
            $table->dropForeign('fk_staff_detail_staffs');
        });

        Schema::table('salary', function (Blueprint $table) {
            $table->dropForeign('fk_salary_staffs');
        });

        Schema::table('user_permissions', function (Blueprint $table) {
            $table->dropForeign('fk_user_permissions_staffs');
            $table->dropForeign('fk_user_permissions_permissions');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->dropForeign('fk_projects_clients');
        });

        Schema::table('project_detail', function (Blueprint $table) {
            $table->dropForeign('fk_project_detail_projects');
            $table->dropForeign('fk_project_detail_vendors');
        });

        Schema::table('project_permission', function (Blueprint $table) {
            $table->dropForeign('fk_project_permission_projects');
            $table->dropForeign('fk_project_permission_staffs');
        });

        Schema::table('vendors', function (Blueprint $table) {
            $table->dropForeign('fk_vendors_types');
        });

        Schema::table('staffs', function (Blueprint $table) {
            $table->dropForeign('fk_staffs_roles');
        });

        Schema::table('assets', function (Blueprint $table) {
            $table->dropForeign('fk_assets_staffs');
        });
    }
};
