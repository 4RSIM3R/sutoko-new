import { AppLayout } from 'layouts';
import { Button, Card, Container, Grid, Link } from 'ui';


export default function Home() {
    return (
        <>
            <Container className='h-screen flex flex-col items-center justify-center max-w-5xl mx-auto' >
                <div className='flex flex-col items-center' >
                    <p className='text-3xl font-medium' >Selamat Datangg Di RME Sutoko</p>
                    <p className='' >A Dead Simple RME, satu sehat oriented platform</p>
                </div>
                <div className='grid grid-cols-12 gap-4 mt-8' >
                    <Card className='lg:col-span-4' >
                        <Card.Header>
                            <Card.Title>Login Pegawai</Card.Title>
                            <Card.Description>Login untuk pegawai klinik</Card.Description>
                        </Card.Header>
                        <Card.Content>
                            <Button size='small' className="w-full" appearance='outline'>Login Pegawai</Button>
                        </Card.Content>
                    </Card>
                    <Card className='lg:col-span-4' >
                        <Card.Header>
                            <Card.Title>Login Super-Admin</Card.Title>
                            <Card.Description>login untuk owner klinik</Card.Description>
                        </Card.Header>
                        <Card.Content>
                            <Button size='small' className="w-full" appearance='outline'>Login Super-Admin</Button>
                        </Card.Content>
                    </Card>
                    <Card className='lg:col-span-4' >
                        <Card.Header>
                            <Card.Title>Jadwal Dokter</Card.Title>
                            <Card.Description>Halaman informasi jadwal dokter</Card.Description>
                        </Card.Header>
                        <Card.Content>
                            <Button size='small' className="w-full" appearance='outline'>Check Jadwal</Button>
                        </Card.Content>
                    </Card>
                    <Card className='lg:col-span-4' >
                        <Card.Header>
                            <Card.Title>Antrian Online</Card.Title>
                            <Card.Description>Form booking nomor antrian berkunjung klinik</Card.Description>
                        </Card.Header>
                        <Card.Content>
                            <Button size='small' className="w-full" appearance='outline'>Booking Antrian</Button>
                        </Card.Content>
                    </Card>
                </div>
            </Container>
        </>
    );
}

// Home.layout = (page: any) => <AppLayout children={page} />;
