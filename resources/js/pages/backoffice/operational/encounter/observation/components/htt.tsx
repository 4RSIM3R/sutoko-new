import { Button, buttonStyles, Modal, Select, Textarea } from "@/components/ui"
import { Encounter } from "@/types/encounter"
import { loinc_htt } from "@/utils/constant/loinc"
import { IconEye } from "justd-icons"

type HTTProps = {
    encounter: Encounter
}

export const HTT = ({ encounter }: HTTProps) => {
    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold">HTT {encounter.patient?.name}</h1>
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
                    <Select
                        className="col-span-12"
                        label="Narrative"
                        placeholder="Select narrative"
                        onSelectionChange={(val) => { }}
                    >
                        <Select.Trigger />
                        <Select.List items={loinc_htt}>
                            {
                                loinc_htt.map(e => (
                                    <Select.Option id={e.code} textValue={e.name}>
                                        {e.name}
                                    </Select.Option>
                                ))
                            }
                        </Select.List>
                    </Select>
                </div>
                <div className="col-span-12" >
                    <Textarea
                        label="Keterangan"
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