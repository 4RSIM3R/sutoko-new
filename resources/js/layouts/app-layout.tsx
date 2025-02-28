import {
    Avatar, Button, Link, Menu, Sidebar, SidebarContent,
    SidebarDisclosure,
    SidebarDisclosureGroup,
    SidebarDisclosurePanel,
    SidebarDisclosureTrigger,
    SidebarFooter, SidebarHeader, SidebarInset, SidebarItem,
    SidebarLabel,
    SidebarNav,
    SidebarProvider, SidebarTrigger
} from "@/components/ui";
import { PagePropsData } from "@/types";
import { FormResponse } from "@/utils/constant/system";
import { useForm, usePage } from "@inertiajs/react";
import {
    IconBrandHetzner,
    IconCallIncoming,
    IconChevronLgDown,

    IconDashboard,

    IconEnvelope,
    IconLogout,
    IconPencilBox,
    IconPerson,
    IconPlus,
    IconSettings,
    IconWindow
} from "justd-icons";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";

type MenuItem = {
    label: string;
    icon: any;
    items: {
        label: string;
        href: string;
        icon: any;
    }[],
}

export function AppLayout({ children }: PropsWithChildren) {

    const { post } = useForm();

    const page = usePage<PagePropsData>().props;

    const onLogout = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        post(route('auth.logout'), FormResponse);
    };

    const menus: MenuItem[] = [
        {
            label: 'Master Data',
            icon: IconPencilBox,
            items: [
                {
                    label: 'Patient',
                    href: route('backoffice.patient.index'),
                    icon: IconPencilBox,
                },
                {
                    label: 'Practioner',
                    href: route('backoffice.practioner.index'),
                    icon: IconPencilBox,
                },
                {
                    label: 'Assurance',
                    href: route('backoffice.assurance.index'),
                    icon: IconPencilBox,
                },
                {
                    label: 'Charge',
                    href: route('backoffice.charge.index'),
                    icon: IconPencilBox,
                },
                {
                    label: 'Location',
                    href: route('backoffice.location.index'),
                    icon: IconPencilBox,
                },
                {
                    label: 'Medicine',
                    href: route('backoffice.medicine.index'),
                    icon: IconPencilBox,
                },
            ],
        },
        {
            label: 'Operational',
            icon: IconWindow,
            items: [
                {
                    label: 'Encounter',
                    href: route('backoffice.encounter.index'),
                    icon: IconWindow,
                },
            ],
        },
        {
            label: 'Setting',
            icon: IconSettings,
            items: [
                {
                    label: 'Profile',
                    href: route('backoffice.setting.profile.index'),
                    icon: IconSettings,
                },
                {
                    label: 'Application',
                    href: route('backoffice.setting.application.index'),
                    icon: IconSettings,
                },
            ],
        },
        {
            label: 'Plugin',
            icon: IconPlus,
            items: [
                {
                    label: 'Schedule',
                    href: '',
                    icon: IconPlus,
                },
                {
                    label: 'Appointment',
                    href: '',
                    icon: IconPlus,
                },
            ],
        },
    ];

    return (
        <SidebarProvider className="bg-white" >
            <Sidebar intent="default" collapsible="dock" className="bg-white" >
                <SidebarHeader>
                    <Link
                        className="flex items-center gap-x-2 group-data-[collapsible=dock]:size-10 group-data-[collapsible=dock]:justify-center"
                        href={route('backoffice.index')}
                    >
                        <IconBrandHetzner className="text-blue-800 size-4.5" />
                        <SidebarLabel className="font-medium">SUTOKO</SidebarLabel>
                    </Link>
                </SidebarHeader>

                <SidebarContent>
                    {menus.map((section, sectionIndex) => (
                        <SidebarDisclosureGroup key={sectionIndex}>
                            <SidebarDisclosure id={sectionIndex + 1}>
                                <SidebarDisclosureTrigger>
                                    <section.icon className="text-black size-4" />
                                    <SidebarLabel className="font-medium text-black" > {section.label}</SidebarLabel>
                                </SidebarDisclosureTrigger>
                                <SidebarDisclosurePanel>
                                    {section.items.map((item, itemIndex) => (
                                        <SidebarItem key={itemIndex} href={item.href}>
                                            {() => (
                                                <>
                                                    <item.icon className="hover:text-black size-4" />
                                                    <SidebarLabel className="hover:text-black" >{item.label}</SidebarLabel>
                                                </>
                                            )}
                                        </SidebarItem>
                                    ))}
                                </SidebarDisclosurePanel>
                            </SidebarDisclosure>
                        </SidebarDisclosureGroup>
                    ))}
                </SidebarContent>

                <SidebarFooter>
                    <Menu>
                        <Menu.Trigger aria-label="Profile" data-slot="menu-trigger">
                            <Avatar shape="square" src="" />
                            <div className="text-sm group-data-[collapsible=dock]:hidden">
                                {page.auth?.user?.name ?? '-'}
                                <span className="block -mt-0.5 text-muted-fg">{page.auth?.user?.email ?? '-'}</span>
                            </div>
                            <IconChevronLgDown className="absolute right-3 transition-transform size-4 group-pressed:rotate-180" />
                        </Menu.Trigger>
                        <Menu.Content placement="bottom right" className="sm:min-w-(--trigger-width)">
                            <Menu.Section>
                                <Menu.Header separator>
                                    <span className="block">{page.auth?.user?.name ?? '-'}</span>
                                </Menu.Header>
                            </Menu.Section>

                            <Menu.Item>
                                <form onSubmit={onLogout} className="flex w-full items-center gap-x-2">
                                    <IconLogout />
                                    <button type="submit" className="flex w-full">
                                        Log out
                                    </button>
                                </form>
                            </Menu.Item>
                        </Menu.Content>
                    </Menu>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset className="overflow-hidden bg-white" >
                <SidebarNav className="flex justify-between w-full" >
                    <span className="flex gap-x-4 items-center justify-between w-full">
                        <SidebarTrigger className="-mx-2" />
                        <Button appearance="outline" size="extra-small" >
                            <IconCallIncoming />
                        </Button>
                    </span>
                </SidebarNav>
                <div className="p-5 overflow-x-hidden h-full">
                    <Toaster />
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}