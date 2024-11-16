<?php

namespace App\Utils\SatuSehat;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;

class SatuSehatMedicalHistory
{

    public function compose($payload)
    {
        return [
            "resourceType" => "Condition",
            "clinicalStatus" => [
                "coding" => [
                    [
                        "system" => "http://terminology.hl7.org/CodeSystem/condition-clinical",
                        "code" => $payload["active"] ? "active" : "inactive",
                        "display" => $payload["active"] ? "Active" : "Inactive",
                    ]
                ]
            ],
            "category" => [
                [
                    "coding" => [
                        [
                            "system" => "http://terminology.kemkes.go.id",
                            "code" => "previous-condition",
                            "display" => "Previous Condition"
                        ]
                    ]
                ]
            ],
            "code" => [
                "coding" => [
                    [
                        "system" => "http://snomed.info/sct",
                        "code" => $payload["code"],
                        "display" => $payload["display"]
                    ]
                ]
            ],
            "subject" => [
                "reference" => sprintf("Patient/%s", $payload["patient_id"]),
                "display" => $payload["patient_name"],
            ],
            "encounter" => [
                "reference" => sprintf("Encounter/%s", $payload["encounter_id"]),
            ],
            "onSetPeriod" => [
                "start" => $payload["onset_start"],
                "end" => $payload["onset_end"],
            ],
            "recordedDate" => Carbon::now()->toIso8601String(),
            "recorder" => [
                "reference" => sprintf("Practitioner/%s", $payload["practioner_id"]),
                "display" => $payload["practioner_name"],
            ],
            "note" => [
                [
                    "text" => $payload["notes"],
                ]
            ],
        ];
    }

    public function create($token, $payload)
    {
        $response = Http::withHeaders([
            "Content-Type" => "application/json",
            "Authorization" => "Bearer $token",
        ])->post(sprintf("%s/Condition", config('satu_sehat.base_url')), $payload);

        return $response->json()["id"];
    }
}
