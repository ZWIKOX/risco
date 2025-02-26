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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->integer('bedrooms');
            $table->integer('bathrooms'); 
            $table->integer('square_meter');
            $table->string('address');
            $table->string('city');
            $table->string('state', 2);
            $table->string('zip', 5);
            $table->enum('type', ['house', 'apartment', 'villa']);
            $table->enum('status', ['for_sale', 'for_rent', 'sold', 'rented'])->default('for_sale');
            $table->timestamps();

            $table->foreignId('user_id')->constrained()->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};