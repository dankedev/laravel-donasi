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
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('title')->index();
            $table->string('slug')->index()->unique();
            $table->text('description')->nullable();

            $table->longText('content');
            $table->enum('form_type', ['card', 'list', 'manual', 'package', 'qurban', 'zakat_fitr', 'zakat_mal'])->default('card');
            $table->boolean('publised')->default(false);
            $table->bigInteger("goal")->default(0);
            $table->timestamp('start_date');
            $table->timestamp('finish_date');
            $table->unsignedBigInteger('featured_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};
