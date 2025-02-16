import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PropsWithChildren, ReactNode } from "react";
import { SideNavMenu } from "./side-nav-menu";
// import { MantineLogo } from '@mantinex/mantine-logo';

export default function AppLayout({ children, header }: PropsWithChildren<{ header?: ReactNode }>) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            layout="alt"
            header={{ height: { base: 60, md: 70, lg: 80 } }}
            navbar={{
                width: { base: 200, md: 300 },
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    {header}
                </Group>
            </AppShell.Header>
            <AppShell.Navbar>
                <SideNavMenu />
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
}
