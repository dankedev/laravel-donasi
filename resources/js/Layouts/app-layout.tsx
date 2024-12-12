import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PropsWithChildren, ReactNode } from 'react';
// import { MantineLogo } from '@mantinex/mantine-logo';

export default function AppLayout({
    children,
    header,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: { base: 60, md: 70, lg: 80 } }}
            navbar={{
                width: { base: 200, md: 300 },
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <span>Donasi</span>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                Navbar
                {Array(15)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} h={28} mt="sm" animate={false} />
                    ))}
            </AppShell.Navbar>
            <AppShell.Main>
                {header}
                {children}
            </AppShell.Main>
        </AppShell>
    );
}
