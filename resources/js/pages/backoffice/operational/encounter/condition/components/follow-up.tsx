import { Button, buttonStyles, Modal } from "@/components/ui"
import { Encounter } from "@/types/encounter"
import { IconEye } from "justd-icons"

type FollowUpProps = {
    encounter: Encounter
}

export const FollowUp = ({ encounter }: FollowUpProps) => {

    return (
        <div className="w-full" >
<div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold">Follow Up {encounter.patient?.name}</h1>
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
                    <Button type="submit" >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )

}