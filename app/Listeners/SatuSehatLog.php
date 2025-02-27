<?php

namespace App\Listeners;

use App\Events\SatuSehatRequest;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SatuSehatLog
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(SatuSehatRequest $event): void
    {
        //
    }
}
