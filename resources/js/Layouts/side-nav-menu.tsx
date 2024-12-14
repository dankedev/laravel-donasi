import { AppShell, Code, ScrollArea } from "@mantine/core";
import { LinksGroup } from "./links-group";
import { navLinks } from "./nav-links";
import classes from "./side-nav-menu..module.css";
import { UserButton } from "./user-button";

export function SideNavMenu() {
    const links = navLinks.map((item) => <LinksGroup {...item} key={item.label} />);

    return (
        <nav className="flex h-full w-full flex-col">
            <AppShell.Section className="border-b border-stone-300 bg-stone-100 p-6 dark:border-gray-800 dark:bg-black">
                <div className="flex w-full justify-between">
                    <span className="text-2xl font-bold">Donasi</span>
                    <Code fw={700}>v0.1.2</Code>
                </div>
            </AppShell.Section>

            <AppShell.Section grow component={ScrollArea}>
                <div className={classes.linksInner}>{links}</div>
            </AppShell.Section>
            <div className="flex-grow-0 border-t px-6">
                <UserButton />
            </div>
        </nav>
    );
}