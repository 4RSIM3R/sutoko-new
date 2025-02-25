import { CustomSelect } from "@/components/custom-select";
import { Card } from "@/components/ui";

export default function ScheduleIndex() {

    return (
        <div className="h-screen w-full bg-white" >
            <div className="max-w-sm sm:max-w-md mx-auto bg-white h-screen w-full p-6" >
                <p className="text-lg font-semibold" >Jadwal Dokter</p>
                <p className="text-sm" >
                    Silahkan pilih dokter untuk check jadwal
                </p>
                <div className="mt-4 grid grid-cols-12 gap-4" >
                    <CustomSelect
                        className="col-span-12"
                        label="Dokter"
                        name="patient_id"
                        placeholder="Pilih Dokter"
                        defaultValue={null}
                        onChange={(value) => { }}
                        loadOptions={async () => {
                            return [];
                        }}
                        isRequired
                    />
                    <Card className="col-span-12" >
                        <Card.Header>
                            <Card.Title>Minggu - Libur</Card.Title>
                            <Card.Description>07.00 - 12.00</Card.Description>
                        </Card.Header>
                    </Card>
                    <Card className="col-span-12" >
                        <Card.Header>
                            <Card.Title>Senin - Operasional</Card.Title>
                            <Card.Description>07.00 - 12.00</Card.Description>
                        </Card.Header>
                        <Card.Content>
                            <ol className="relative border-s border-gray-200">
                                <li className="mb-10 ms-4">
                                    <div
                                        className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700">
                                    </div>
                                    <time className="mb-1 font-normal leading-none">07:00 - 10:00</time>
                                    <p className="text-sm">
                                        Operasional Jam Pertama
                                    </p>
                                </li>
                                <li className="mb-10 ms-4">
                                    <div
                                        className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700">
                                    </div>
                                    <time className="mb-1 font-normal leading-none">10:00 - 12:00</time>
                                    <p className="text-sm">
                                        Istirahat
                                    </p>
                                </li>
                            </ol>
                        </Card.Content>
                    </Card>
                </div>
            </div>
        </div>
    )

}