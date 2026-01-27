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
        Schema::create('cursos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
             $table->unsignedBigInteger('area');
             $table->foreign('area')->references('id')->on('categorias')->onDelete('cascade');
             $table->string('duracao');
             $table->text('descricao');
             $table->enum('nivel', ['iniciante', 'intermedio', 'avancado'])->default('iniciante');
             $table->unsignedBigInteger('formadores');
             $table->foreign('formadores')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cursos');
    }
};
