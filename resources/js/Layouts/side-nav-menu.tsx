import { Code, ScrollArea } from "@mantine/core";
import { LinksGroup } from "./links-group";
import { navLinks } from "./nav-links";
import classes from "./side-nav-menu..module.css";
import { UserButton } from "./user-button";

export function SideNavMenu() {
    const links = navLinks.map((item) => <LinksGroup {...item} key={item.label} />);

    return (
        <nav className="flex h-full w-full flex-col">
            <div className="border-b border-stone-300 bg-stone-100 px-6 py-6">
                <div className="flex w-full justify-between">
                    <span className="text-2xl font-bold">Donasi</span>
                    <Code fw={700}>v0.1.2</Code>
                </div>
            </div>

            <div className="h-full w-full flex-grow px-6">
                <ScrollArea className={`${classes.links} `}>
                    <div className={classes.linksInner}>{links}</div>
                </ScrollArea>
            </div>

            <div className="flex-grow-0 border-t px-6">
                <UserButton />
            </div>
        </nav>
    );
}
