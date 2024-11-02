import { AppLayout } from "@/layouts/app-layout";

export default function Backoffice() {

    return (
        <>
            <p>Hello world</p>
        </>
    )

}

Backoffice.layout = (page: any) => <AppLayout children={page} />;