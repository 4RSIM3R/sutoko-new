<?php

namespace App\Utils\SatuSehat;

use Exception;
use Illuminate\Http\Client\Response;

class SatuSehatError
{

    public static function handle(Response $response)
    {

        $status = $response->status();

        switch ($status) {
            case 400:
                return new Exception("Bad Request - {$response->json()['issue'][0]["details"]["text"]}. Status Code: {$status}");
            case 401:
                return new Exception("Unauthorized - Invalid token. Status Code: {$status}");
            case 404:
                return new Exception("Not Found - Resource not found. Status Code: {$status}");
            case 500:
                return new Exception("Internal Server Error - Server error. Status Code: {$status}");
            default:
                return new Exception("HTTP request failed with status code: {$status}");
        }
    }
}
