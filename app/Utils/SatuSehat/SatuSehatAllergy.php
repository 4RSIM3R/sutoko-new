<?php

namespace App\Utils\SatuSehat;

use Illuminate\Support\Facades\Http;

class SatuSehatAllergy
{
    /**
     * Compose an allergy intolerance payload.
     *
     * @param array{
     *     satu_sehat_id: string,
     *     type: string,
     *     code: string,
     *     display: string,
     *     patient_id: string,
     *     patient_name: string,
     *     encounter_id: string,
     *     onset_start: string,
     *     practioner_id: string,
     *     practioner_name: string
     * } $payload The input data for constructing the AllergyIntolerance resource.
     *
     * @return array The formatted AllergyIntolerance resource array.
     */
    public function compose(array $payload): array
    {
        return [
            "resourceType" => "AllergyIntolerance",
            "identifier" => [
                [
                    "system" => sprintf("http://sys-ids.kemkes.go.id/allergy/%s", config('satu_sehat.org_id')),
                    "use" => "official",
                    "value" => $payload["satu_sehat_id"],
                ],
            ],
            "clinicalStatus" => [
                "coding" => [
                    [
                        "system" => "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
                        "code" => "active",
                        "display" => "Active",
                    ],
                ],
            ],
            "verificationStatus" => [
                "coding" => [
                    [
                        "system" => "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
                        "code" => "confirmed",
                        "display" => "Confirmed",
                    ],
                ],
            ],
            "category" => [
                $payload["type"],
            ],
            "code" => [
                "coding" => [
                    [
                        "system" => "http://snomed.info/sct",
                        "code" => $payload["code"],
                        "display" => $payload["display"],
                    ],
                ],
                'text' => $payload["notes"],
            ],
            "patient" => [
                "reference" => sprintf("Patient/%s", $payload["patient_id"]),
                "display" => $payload["patient_name"],
            ],
            "encounter" => [
                "reference" => sprintf("Encounter/%s", $payload["encounter_id"]),
            ],
            "recordedDate" => $payload["onset_start"],
            "recorder" => [
                "reference" => sprintf("Practitioner/%s", $payload["practioner_id"]),
                "display" => $payload["practioner_name"],
            ],
        ];
    }

    public function create($token, $payload)
    {
        $response = Http::withHeaders([
            "Content-Type" => "application/json",
            "Authorization" => "Bearer $token",
        ])->post(sprintf("%s/AllergyIntolerance", config('satu_sehat.base_url')), $payload);

        return $response->json()["id"];
    }
}
