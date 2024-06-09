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
        Schema::create('message_reaction', function (Blueprint $table) {
            $table->foreignid('message_id')->constrained('messages');
            $table->foreignId('reaction_id')->constrained('reactions');
            $table->primary(['message_id', 'reaction_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('message_reaction');
    }
};
