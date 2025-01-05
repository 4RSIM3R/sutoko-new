import { IconTrash } from "justd-icons";
import { Button, Modal } from "./ui"

type ConfirmationDialogProps = {
    isOpen: any;
    onClose: () => void;
    onDelete: (e: {preventDefault: () => void}) => void;
    title?: string;
    description?: string;
}

export const ConfirmationDialog = ({ isOpen, onClose, onDelete, title, description }: ConfirmationDialogProps) => {
    return (
        <Modal.Content isOpen={isOpen} onOpenChange={() => onClose()} >
            <Modal.Header>
                <Modal.Title>{title ?? "Confirmation"}</Modal.Title>
                <Modal.Description>
                    {
                        description ?? "Are you sure you want to delete this item?"
                    }
                </Modal.Description>
            </Modal.Header>
            <Modal.Footer>
                {
                    <form onSubmit={onDelete} >
                        <input type="hidden" name="_method" value="DELETE" />
                        <Button intent="danger" type="submit">
                            <IconTrash />
                            Submit
                        </Button>
                    </form>
                }
            </Modal.Footer>
        </Modal.Content>
    )
}