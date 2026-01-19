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
        Schema::create('progresso_curso', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_user');
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('id_material');
            $table->foreign('id_material')->references('id')->on('materiais')->onDelete('cascade');
            $table->enum('status', ['para_ver', 'a_ver', 'visto'])->default('para_ver');
            $table->timestamp('completado_em')->nullable();
            $table->timestamps();

            $table->unique(['id_user', 'id_material']);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('progresso_curso');
    }
};
