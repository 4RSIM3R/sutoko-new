<?php

namespace App\Utils\SatuSehat;

use App\Models\Encounter;
use App\Models\Location;
use App\Models\Patient;
use App\Models\Practioner;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;

class SatuSehatEncounter
{

    public function compose_arrived($payload)
    {

        $patient = Patient::query()->where("id", $payload["patient_id"])->first(['name', 'satu_sehat_id']);
        $location = Location::query()->where("id", $payload["location_id"])->first(['name', 'satu_sehat_id']);
        $practioner = Practioner::query()->where("id", $payload["practioner_id"])->first(['name', 'satu_sehat_id']);

        return [
            "resourceType" => "Encounter",
            "identifier" => [
                "system" => sprintf("http://sys-ids.kemkes.go.id/encounter/%s", config('satu_sehat.org_id')),
                "value" => $payload["satu_sehat_id"],
            ],
            "status" => "arrived",
            "class" => [
                "system" => "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                "code" => "AMB",
                "display" => "ambulatory",
            ],
            "subject" => [
                "reference" => sprintf("Patient/%s", $patient->satu_sehat_id),
                "display" => $patient->name,
            ],
            "participant" => [
                [
                    "type" => [
                        [
                            "coding" => [
                                [
                                    "system" => "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                                    "code" => "ATND",
                                    "display" => "attender"
                                ]
                            ]
                        ]
                    ],
                    "individual" => [
                        "reference" => sprintf("Practitioner/%s", $practioner->satu_sehat_id),
                        "display" => $practioner->name,
                    ]
                ]
            ],
            "period" => [
                "start" => Carbon::now()->toIso8601String(),
            ],
            "location" => [
                [
                    "location" => [
                        "reference" => sprintf("Location/%s", $location->satu_sehat_id),
                        "display" => $location->name,
                    ],
                    "period" => [
                        "start" => Carbon::now()->toIso8601String(),
                    ]
                ]
            ],
            "statusHistory" => [
                [
                    "status" => "arrived",
                    "period" => [
                        "start" => Carbon::now()->toIso8601String(),
                    ],
                ]
            ],
            "serviceProvider" => [
                "reference" => sprintf("Organization/%s", config('satu_sehat.org_id')),
            ],
        ];
    }

    public function create($token, $payload)
    {
        $response = Http::withHeaders([
            "Content-Type" => "application/json",
            "Authorization" => "Bearer $token",
        ])->post(sprintf("%s/Encounter", config('satu_sehat.base_url')), $payload);

        return $response->json()["id"];
    }

    public function update($token, $payload)
    {
        $response = Http::withHeaders([
            "Content-Type" => "application/json",
            "Authorization" => "Bearer $token",
        ])->put(sprintf("%s/Encounter/%s", config('satu_sehat.base_url'), ""), $payload);

        return $response->json()["id"];
    }
}
