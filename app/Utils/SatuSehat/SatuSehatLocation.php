<?php

namespace App\Utils\SatuSehat;

use App\Models\Profile;
use Exception;
use Illuminate\Support\Facades\Http;

class SatuSehatLocation
{

    public $body = [
        "resourceType" => "Location",
        "status" => "active",
        "mode" => "instance",
    ];

    public function compose($payload)
    {

        $profile = Profile::query()->first();

        if (!$profile) throw new Exception("please set profile first");

        $this->body["managingOrganization"] = [
            "reference" => sprintf("Organization/%s", config('satu_sehat.org_id'))
        ];

        $this->body["identifier"] = [
            [
                "system" => sprintf("http://sys-ids.kemkes.go.id/location/%s", config('satu_sehat.org_id')),
                "value" => $payload["satu_sehat_id"],
            ]
        ];

        $this->body["name"] = $payload["name"];

        $this->body["description"] = $payload["description"];

        $this->body["telecom"] = [
            [
                "system" => "phone",
                "value" => $profile->phone_number,
                "use" => "work",
            ]
        ];

        $this->body["address"] = [
            "use" => "work",
            "line" => [
                $profile->address,
            ],
            "city" => $profile->city_name,
            "country" => "ID"
        ];

        $this->body["physicalType"] = [
            "coding" => [
                [
                    "system" => "http://terminology.hl7.org/CodeSystem/location-physical-type",
                    "code" => $payload["physical_type_code"],
                    "display" =>  $payload["physical_type_name"],
                ]
            ]
        ];

        return $this->body;
    }

    public function create($token, $payload)
    {
        $response = Http::withHeaders([
            "Content-Type" => "application/json",
            "Authorization" => "Bearer $token",
        ])->post(sprintf("%s/Location", config('satu_sehat.base_url')), $payload);

        return $response->json()["id"];
    }
}
