import { Button, buttonStyles, Modal, Textarea } from "@/components/ui"
import { Encounter } from "@/types/encounter";
import { useForm } from "@inertiajs/react"
import { IconEye } from "justd-icons";

type SummaryProps = {
    encounter: Encounter
}

type SummaryFormSchema = {
    summary?: string,
    purpose?: string,
};

export const Summary = ({ encounter }: SummaryProps) => {

    const { data, setData, post } = useForm<SummaryFormSchema>();

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
    }

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold">Kesimpulan {encounter.patient?.name}</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Practioner : {encounter.practioner?.name}</p>
                </div>
                <div>
                    <Modal>
                        <Modal.Trigger className={buttonStyles({ appearance: "outline" })}>
                            <IconEye className="text-black" />
                        </Modal.Trigger>
                        <Modal.Content size="4xl" >
                            <Modal.Header>
                                <Modal.Title>Riwayat Alergi {encounter.patient?.name}</Modal.Title>
                                <Modal.Description>
                                    Riwayat Alergi yang terekam oleh sistem
                                </Modal.Description>
                            </Modal.Header>
                            <Modal.Body>
                            </Modal.Body>
                            <Modal.Footer>
                                <Modal.Close appearance="outline">Tutup</Modal.Close>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </div>
            </div>
            <form className="py-2 grid grid-cols-12 gap-4">
                <div className="col-span-12" >
                    <Textarea
                        label="Kesimpulan observasi"
                        placeholder="pasien datang, dengan kondisi ..."
                    />
                </div>
                <div className="col-span-12" >
                    <Textarea
                        label="Tujuan Perawatan"
                        placeholder="perawatan dilakukan untuk ..."
                    />
                </div>
                <div className="col-span-12" >
                    <Button>
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}