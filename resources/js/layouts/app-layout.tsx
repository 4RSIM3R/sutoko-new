import { Avatar, Button, Link, Menu, Separator, Sidebar, TextField } from "@/components/ui";
import { IconBrandApple, IconCalendar, IconChevronLgDown, IconCirclePerson, IconCirclePlus, IconDevicePhone, IconDocumentChart, IconHome2, IconHome2Fill, IconLogout, IconMoneybag, IconMoneybagFill, IconPeople, IconSearch, IconSettings, IconShield, IconSquarePlus } from "justd-icons";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";

export function AppLayout({ children }: PropsWithChildren) {
    return (
        <Sidebar.Provider>
            <Sidebar collapsible="dock">
                <Sidebar.Header>
                    <Link
                        className="flex items-center group-data-[collapsible=dock]:size-10 group-data-[collapsible=dock]:justify-center gap-x-2"
                        href="/docs/components/layouts/sidebar"
                    >
                        <IconBrandApple className="size-5" />
                        <strong className="font-medium group-data-[collapsible=dock]:hidden">SUTOKO</strong>
                    </Link>
                </Sidebar.Header>
                <Sidebar.Content  >
                    <Sidebar.Section collapsible title="Master Data" className="text-black" >
                        <Sidebar.Item icon={IconPeople} href={route('backoffice.patient.index')}>
                            Pasien
                        </Sidebar.Item>
                        <Sidebar.Item icon={IconCirclePlus} href={route('backoffice.practioner.index')}>
                            Tenaga Kesehatan
                        </Sidebar.Item>
                        <Sidebar.Item icon={IconMoneybag} href={route('backoffice.charge.index')}>
                            Tindakan
                        </Sidebar.Item>
                        <Sidebar.Item icon={IconHome2} href={route('backoffice.location.index')}>
                            Ruangan
                        </Sidebar.Item>
                        <Sidebar.Item icon={IconSquarePlus} href={route('backoffice.medicine.index')}>
                            Farmasi & Alkes
                        </Sidebar.Item>
                    </Sidebar.Section>
                    <Sidebar.Section collapsible title="Operasional" className="text-black" >
                        <Sidebar.Item icon={IconDocumentChart} href="#">
                            Kunjungan Pasien
                        </Sidebar.Item>
                        <Sidebar.Item icon={IconDocumentChart} href="#">
                            Rekam Medis
                        </Sidebar.Item>
                        <Sidebar.Item icon={IconDocumentChart} href="#">
                            Farmasi
                        </Sidebar.Item>
                        <Sidebar.Item icon={IconMoneybag} href="#">
                            Kasir
                        </Sidebar.Item>
                    </Sidebar.Section>
                    <Sidebar.Section collapsible title="Plugns" className="text-black" >
                        <Sidebar.Item icon={IconCalendar} href="#">
                            Jadwal Dokter
                        </Sidebar.Item>
                        <Sidebar.Item icon={IconDevicePhone} href="#">
                            Antrian Online
                        </Sidebar.Item>
                    </Sidebar.Section>
                </Sidebar.Content>
                <Sidebar.Footer className="lg:flex lg:flex-row hidden items-center">
                    <Menu>
                        <Button appearance="plain" aria-label="Profile" slot="menu-trigger" className="group">
                            <Avatar size="small" shape="square" src="/images/sidebar/profile-slash.jpg" />
                            <span className="group-data-[collapsible=dock]:hidden flex items-center justify-center">
                                Saul Hudson
                                <IconChevronLgDown className="right-3 size-4 absolute group-pressed:rotate-180 transition-transform" />
                            </span>
                        </Button>
                        <Menu.Content className="min-w-[--trigger-width]">
                            <Menu.Item href="#">
                                <IconCirclePerson />
                                Profile
                            </Menu.Item>
                            <Menu.Item href="#">
                                <IconSettings />
                                Settings
                            </Menu.Item>
                            <Menu.Separator />
                            <Menu.Item href="#">
                                <IconLogout />
                                Log out
                            </Menu.Item>
                        </Menu.Content>
                    </Menu>
                </Sidebar.Footer>
                <Sidebar.Rail />
            </Sidebar>
            <Sidebar.Inset>
                <header className="sticky justify-between sm:justify-start top-0 bg-bg h-[3.57rem] px-4 border-b flex items-center gap-x-2 bg-white">
                    <span className="flex items-center gap-x-3">
                        <Sidebar.Trigger className="-mx-2" />
                        <Separator className="h-6 sm:block hidden" orientation="vertical" />
                    </span>
                    <TextField placeholder="Cari pasien" className="w-full sm:max-w-[20rem] sm:w-auto" />
                    <div className="flex sm:hidden items-center gap-x-2">
                        <Button appearance="plain" aria-label="Search..." size="square-petite">
                            <IconSearch />
                        </Button>
                        <Menu>
                            <Menu.Trigger aria-label="Profile" className="flex items-center gap-x-2 group">
                                <Avatar size="small" shape="circle" src="/images/sidebar/profile-slash.jpg" />
                                <IconChevronLgDown className="size-4 group-pressed:rotate-180 transition-transform" />
                            </Menu.Trigger>
                            <Menu.Content className="min-w-[--trigger-width]">
                                <Menu.Item href="#">
                                    <IconCirclePerson />
                                    Profile
                                </Menu.Item>
                                <Menu.Item href="#">
                                    <IconSettings />
                                    Settings
                                </Menu.Item>
                                <Menu.Item href="#">
                                    <IconShield />
                                    Security
                                </Menu.Item>
                                <Menu.Item href="#">
                                    <IconLogout />
                                    Log out
                                </Menu.Item>
                            </Menu.Content>
                        </Menu>
                    </div>
                </header>
                <div className="p-4 lg:p-6">
                    <Toaster />
                    {children}
                </div>
            </Sidebar.Inset>
        </Sidebar.Provider>
    );
}