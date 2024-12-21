import { Collapse, Group, ThemeIcon, UnstyledButton } from "@mantine/core";
// import { IconCalendarStats, IconChevronRight } from '@tabler/icons-react';
import { cn } from "@/utils/helper";
import { Link } from "@inertiajs/react";
import { ChevronDown, LucideProps } from "lucide-react";
import { memo, useState } from "react";
import classes from "./links-group.module.css";
import { LinksGroupProps } from "./nav-links";

// Create a memoized version of the icon component
const MemoizedThemeIcon = memo(
    ({
        variant,
        current,
        Icon,
    }: {
        variant: string;
        current: boolean;
        Icon: React.FC<LucideProps>;
    }) => (
        <ThemeIcon variant={variant} size={30} radius={current ? "md" : undefined}>
            <Icon className="size-6" />
        </ThemeIcon>
    )
);
MemoizedThemeIcon.displayName = "MemoizedThemeIcon";

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
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <MemoizedThemeIcon
                                variant={current ? "filled" : "subtle"}
                                current={current}
                                Icon={Icon}
                            />
                            <div className="ml-2 text-sm">{label} </div>
                        </div>
                    </div>
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
                        <div className="flex items-center">
                            <MemoizedThemeIcon variant="subtle" current={false} Icon={Icon} />
                            <div className="m-2">{label}</div>
                        </div>
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
