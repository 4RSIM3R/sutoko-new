import { Button, buttonStyles, Menu, Pagination, Table } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Base } from "@/types/base";
import { PaymentAssurance } from "@/types/payment-assurance";
import { Link } from "@inertiajs/react";
import { IconPlus } from "justd-icons";

type PaymentAssuranceIndexProps = {
    payment: Base<PaymentAssurance[]>;
}

export default function PaymentAssuranceIndex({ payment }: PaymentAssuranceIndexProps) {

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Payment Method</h1>
                    <p className="text-sm text-gray-500" >Manage all payment method</p>
                </div>
                <div>
                    <Link href={route('backoffice.payment-assurance.create')}>
                        <Button appearance="outline" >
                            <IconPlus />
                            Add New
                        </Button>
                    </Link>
                </div>
            </div>
            <div>
                <Table className="my-4" >
                    <Table.Header className="w-full" >
                        <Table.Column isRowHeader>Nama</Table.Column>
                        <Table.Column>Deskripsi</Table.Column>
                        <Table.Column>ACTION</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {
                            payment.items.map((payment: PaymentAssurance) => (
                                <Table.Row key={payment.name}>
                                    <Table.Cell>{payment.name}</Table.Cell>
                                    <Table.Cell>{payment.description}</Table.Cell>
                                    <Table.Cell>
                                        <Menu>
                                            <Menu.Trigger className={buttonStyles({ appearance: "outline", size: "extra-small" })}>ACTION</Menu.Trigger>
                                            <Menu.Content placement="bottom" className="sm:min-w-48">
                                                <Menu.Item>Edit</Menu.Item>
                                                <Menu.Item>Hapus</Menu.Item>
                                            </Menu.Content>
                                        </Menu>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table>
                <Pagination>
                    <Pagination.List>
                        {
                            payment.prev_page &&
                            <Pagination.Item variant="previous" href={route('backoffice.payment-assurance.index', { page: payment.prev_page })} />
                        }
                        {
                            payment.next_page &&
                            <Pagination.Item variant="next" href={route('backoffice.payment-assurance.index', { page: payment.next_page })} />
                        }
                    </Pagination.List>
                </Pagination>
            </div>
        </div>
    )

}

PaymentAssuranceIndex.layout = (page: any) => <AppLayout children={page} />;