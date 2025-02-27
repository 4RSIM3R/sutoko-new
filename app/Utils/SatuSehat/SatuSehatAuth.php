<?php

namespace App\Utils\SatuSehat;

use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class SatuSehatAuth
{
    public static function token()
    {
        $cacheKey = 'satu_sehat_access_token';
        $cacheDuration = 10;

        if (Cache::store('file')->has($cacheKey)) {
            return Cache::store('file')->get($cacheKey);
        } else {
            $auth_url = config('satu_sehat.auth_url');
            $client_id = config('satu_sehat.client_id');
            $client_secret = config('satu_sehat.client_secret');

            $response = Http::asForm()->post("{$auth_url}/accesstoken?grant_type=client_credentials", [
                'client_id' => $client_id,
                'client_secret' => $client_secret,
            ]);

            if ($response->failed()) throw new Exception("Error getting access token");

            $token = $response->json()["access_token"];

            Cache::store('file')->put($cacheKey, $token, $cacheDuration);

            return $token;
        }
    }
}
