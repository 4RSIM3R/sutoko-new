<?php

namespace App\Utils\SatuSehat;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;

class SatuSehatFamilyHistory
{

    /**
     * Compose a family member history payload.
     *
     * @param array{
     *     relation_code: string,
     *     relation_display: string,
     *     contributed_to_death: bool,
     *     patient_id: string,
     *     patient_name: string,
     *     disease_code: string,
     *     disease_display: string,
     *     outcome_code: string,
     *     outcome_display: string,
     *     notes: string
     * } $payload
     * @return array
     */
    public function compose(array $payload): array
    {
        return [
            "resourceType" => "FamilyMemberHistory",
            "status" => "completed",
            "relationship" => [
                "coding" => [
                    [
                        "system" => "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
                        "code" => $payload["relation_code"],
                        "display" => $payload["relation_display"],
                    ]
                ]
            ],
            "deceasedBoolean" => $payload["contributed_to_death"],
            "patient" => [
                "reference" => sprintf("Patient/%s", $payload["patient_id"]),
                "display" => $payload["patient_name"],
            ],
            "date" => Carbon::now()->toIso8601String(),
            "condition" => [
                [
                    "code" => [
                        "coding" => [
                            [
                                "system" => "http://snomed.info/sct",
                                "code" => $payload["disease_code"],
                                "display" => $payload["disease_display"]
                            ]
                        ]
                    ],
                    "outcome" => [
                        "coding" => [
                            [
                                "system" => "http://snomed.info/sct",
                                "code" => $payload["outcome_code"],
                                "display" => $payload["outcome_display"]
                            ]
                        ]
                    ],
                    "contributedToDeath" => $payload["contributed_to_death"],
                    "onsetString" => $payload["notes"],
                ]
            ]
        ];
    }

    public function create($token, $payload)
    {
        $response = Http::withHeaders([
            "Content-Type" => "application/json",
            "Authorization" => "Bearer $token",
        ])->post(sprintf("%s/FamilyMemberHistory", config('satu_sehat.base_url')), $payload);

        return $response->json()["id"];
    }
}
