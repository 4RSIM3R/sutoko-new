import { Button, Textarea } from "@/components/ui"

export const Summary = () => {
    return (
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
    )
}