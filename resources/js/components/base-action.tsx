import { IconEye, IconTrash } from "justd-icons"
import { Button, Menu } from "./ui"

type BaseActionProps = {
    url: any,
    id: any,
    onDelete: (id: any) => void,
    setId: (id: any) => void,
}

export const BaseAction = ({ url, id, onDelete, setId }: BaseActionProps) => {
    return (
        <Menu>
            <Button size="extra-small" appearance="outline">Action</Button>
            <Menu.Content>
                <Menu.Item className="flex flex-row gap-1" href={`${route(url, id)}`}>
                    <IconEye />
                    Detail
                </Menu.Item>
                <Menu.Item className="flex flex-row gap-1" onAction={() => setId(id)}>
                    <IconTrash />
                    Delete
                </Menu.Item>
            </Menu.Content>
        </Menu>
    )
}
