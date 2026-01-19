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
        Schema::create('materiais', function (Blueprint $table) {
            $table->id();
             $table->string('nome');
             $table->unsignedBigInteger('id_user');
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('id_curso');
            $table->foreign('id_curso')->references('id')->on('cursos')->onDelete('cascade');
            $table->string('caminho_ficheiro');
            $table->enum('formato', ['mp3', 'mp4', 'pdf', 'jpg', 'png', 'docx']);
            $table->enum('status', ['aprovado', 'pendente', 'rejeitado']);
            $table->unsignedBigInteger('aprovado_por')->nullable();
            $table->foreign('aprovado_por')->references('id')->on('users')->onDelete('set null');
            $table->timestamp('data_aprovacao')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materiais');
    }
};
