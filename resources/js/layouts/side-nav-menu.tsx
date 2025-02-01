import { AppShell, Code, ScrollArea } from "@mantine/core";
import { LinksGroup } from "./links-group";
// import { navLinks } from "./nav-links";
import { navLinks } from "./nav-links";
import classes from "./side-nav-menu..module.css";
import { UserButton } from "./user-button";

export function SideNavMenu() {
    const links = navLinks.map((item) => <LinksGroup {...item} key={item.label} />);

    return (
        <nav className="flex h-full w-full flex-col">
            <AppShell.Section className="border-b p-6">
                <div className="flex w-full justify-between">
                    <span className="text-2xl font-bold">Donasi</span>
                    <div className="flex items-center">
                        <Code fw={700}>v0.1.2</Code>
                    </div>
                </div>
            </AppShell.Section>

            <AppShell.Section grow component={ScrollArea}>
                <div className={classes.linksInner}>{links}</div>
            </AppShell.Section>
            <div className="grow-0 border-t px-6">
                <UserButton />
            </div>
        </nav>
    );
}
