<?php

namespace App\Utils\SatuSehat;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;

class SatuSehatComplaint
{

    public function composer_primary($payload)
    {

        return [
            "resourceType" => "Condition",
            "clinicalStatus" => [
                "coding" => [
                    [
                        "system" => "http://terminology.hl7.org/CodeSystem/condition-clinical",
                        "code" => "active",
                        "display" => "Active",
                    ]
                ]
            ],
            "category" => [
                "coding" => [
                    [
                        "system" => "http://terminology.kemkes.go.id",
                        "code" => "chief-complaint",
                        "display" => "Chief Complaint",
                    ]
                ]
            ],
            "code" => [
                "coding" => [
                    [
                        "system" => "http://snomed.info/sct",
                        "code" => $payload["primary_code"],
                        "display" => $payload["primary_display"],
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
            "onsetDateTime" => Carbon::now()->toIso8601String(),
            "recordedDate" => Carbon::now()->toIso8601String(),
            "recorder" => [
                "reference" => sprintf("Practitioner/%s", $payload["practioner_id"]),
                "display" => $payload["practioner_name"],
            ],
            "note" => [
                "text" => $payload["notes"],
            ],
        ];
    }

    public function composer_secondary($payload)
    {
        return [
            "resourceType" => "Condition",
            "clinicalStatus" => [
                "coding" => [
                    [
                        "system" => "http://terminology.hl7.org/CodeSystem/condition-clinical",
                        "code" => "active",
                        "display" => "Active",
                    ]
                ]
            ],
            "category" => [
                "coding" => [
                    [
                        "system" => "http://terminology.hl7.org/CodeSystem/condition-category",
                        "code" => "problem-list-item",
                        "display" => "Problem List Item",
                    ]
                ]
            ],
            "code" => [
                "coding" => [
                    [
                        "system" => "http://snomed.info/sct",
                        "code" => $payload["secondary_code"],
                        "display" => $payload["secondary_display"],
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
            "onsetDateTime" => Carbon::now()->toIso8601String(),
            "recordedDate" => Carbon::now()->toIso8601String(),
            "recorder" => [
                "reference" => sprintf("Practitioner/%s", $payload["practioner_id"]),
                "display" => $payload["practioner_name"],
            ],
            "note" => [
                "text" => $payload["notes"],
            ],
        ];
    }

    public function create($token, $payload)
    {
        $response = Http::withHeaders([
            "Content-Type" => "application/json",
            "Authorization" => "Bearer $token",
        ])->put(sprintf("%s/Condition", config('satu_sehat.base_url')), $payload);

        return $response->json()["id"];
    }
}
