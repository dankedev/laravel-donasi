import { Box, Collapse, Group, ThemeIcon, UnstyledButton } from "@mantine/core";
// import { IconCalendarStats, IconChevronRight } from '@tabler/icons-react';
import { cn } from "@/utils/helper";
import { Link } from "@inertiajs/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import classes from "./links-group.module.css";
import { LinksGroupProps } from "./nav-links";

export function LinksGroup({ icon: Icon, label, initiallyOpened, links, link }: LinksGroupProps) {
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const current = link === route().current() || route().current(link ?? "");

    const items = (hasLinks ? links : []).map((link) => (
        <Link
            className={cn(classes.link, {
                [classes.activeLink]: current,
            })}
            href={link?.link ? route(link?.link ?? "") : "#"}
            key={`${link.label}-${link.link}`}
        >
            {link.label}
        </Link>
    ));

    return (
        <>
            {link ? (
                <Link
                    href={link ? route(link) : "#"}
                    className={cn(classes.control, {
                        ["rounded-md bg-white shadow-sm hover:bg-red-100"]: current,
                    })}
                    // className={`${classes.control} ${current &&  "bg-white shadow-sm rounded-md"}`}
                >
                    <Group gap={0} justify="space-between">
                        <Box style={{ display: "flex", alignItems: "center" }}>
                            <ThemeIcon variant={current ? "filled" : "light"} size={30} radius="md">
                                <Icon className="text-xl" />
                            </ThemeIcon>
                            <Box ml="md">{label} </Box>
                        </Box>
                    </Group>
                </Link>
            ) : (
                <UnstyledButton
                    onClick={() => {
                        if (hasLinks) {
                            setOpened((o) => !o);
                            return;
                        }
                    }}
                    className={classes.control}
                >
                    <Group gap={0} justify="space-between">
                        <Box style={{ display: "flex", alignItems: "center" }}>
                            <ThemeIcon variant="light" size={30}>
                                <Icon className="text-xl" />
                            </ThemeIcon>
                            <Box ml="md">{label}</Box>
                        </Box>
                        {hasLinks && (
                            <ChevronDown
                                className={cn("transition-transform ease-linear", {
                                    ["rotate-180"]: opened,
                                })}
                            />
                        )}
                    </Group>
                </UnstyledButton>
            )}
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
}
