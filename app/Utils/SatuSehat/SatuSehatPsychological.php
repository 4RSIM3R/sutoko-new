<?php

namespace App\Utils\SatuSehat;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;

class SatuSehatPsychological
{

    public function compose(array $payload): array
    {
        return [
            "resourceType" => "Observation",
            "status" => "final",
            "category" => [
                [
                    "coding" => [
                        [
                            "system" => "http://terminology.hl7.org/CodeSystem/observation-category",
                            "code" => "survey",
                            "display" => "Survey"
                        ]
                    ]
                ]
            ],
            "code" => [
                "coding" => [
                    [
                        "system" => "http://loinc.org",
                        "code" => "8693-4",
                        "display" => "Mental Status"
                    ]
                ]
            ],
            "subject" => [
                "reference" => "Patient/{{Patient_id}}",
                "display" => "{{Patient_Name}}"
            ],
            "encounter" => [
                "reference" => "Encounter/{{Encounter_id}}"
            ],
            "effectiveDateTime" => Carbon::now()->toIso8601String(),
            "issued" => Carbon::now()->toIso8601String(),
            "performer" => [
                [
                    "reference" => "Practitioner/{{Practitioner_id}}",
                    "display" => "{{Practitioner_Name}}"
                ]
            ],
            "valueCodeableConcept" => [
                "coding" => [
                    [
                        "system" => "http://snomed.info/sct",
                        "code" => "48694002",
                        "display" => "Feeling anxious"
                    ]
                ]
            ]
        ];
    }

    public function create($token, $payload)
    {
        $response = Http::withHeaders([
            "Content-Type" => "application/json",
            "Authorization" => "Bearer $token",
        ])->post(sprintf("%s/Observation", config('satu_sehat.base_url')), $payload);

        return $response->json()["id"];
    }
}
