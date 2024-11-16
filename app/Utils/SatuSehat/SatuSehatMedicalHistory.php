<?php

namespace App\Utils\SatuSehat;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;

class SatuSehatMedicalHistory
{

    /**
     * Compose a condition payload.
     *
     * @param array{
     *     active: bool,
     *     code: string,
     *     display: string,
     *     patient_id: string,
     *     patient_name: string,
     *     encounter_id: string,
     *     onset_start: string,
     *     onset_end: string,
     *     practioner_id: string,
     *     practioner_name: string,
     *     notes: string
     * } $payload
     * @return array
     */
    public function compose(array $payload): array
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
            "onsetPeriod" => [
                "start" => Carbon::parse($payload["onset_start"])->toIso8601String(),
                "end" => Carbon::parse($payload["onset_end"])->toIso8601String(),
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
