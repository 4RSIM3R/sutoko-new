<?php

namespace App\Traits;

use Illuminate\Database\Schema\Blueprint;

trait BaseMigration
{

    public function contact_fields(Blueprint $table)
    {
        $table->string('email')->nullable();
        $table->string('phone')->nullable();
    }

    public function address_fields(Blueprint $table)
    {
        $table->string('address')->nullable();
        $table->string('rt')->nullable();
        $table->string('rw')->nullable();
        $table->string('postal_code')->nullable();
        $table->string('village')->nullable();
        $table->string('district')->nullable();
        $table->string('regency')->nullable();
        $table->string('province')->nullable();
    }

    public function satu_sehat_fields(Blueprint $table)
    {
        $table->string('satu_sehat_id')->nullable();
        $table->json('request')->nullable();
        $table->json('response')->nullable();
    }

    public function base_fields(Blueprint $table)
    {
        $table->timestamps();
        $table->softDeletes();
    }
}
