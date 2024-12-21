import { BoxProps, ElementProps, Group, Text, UnstyledButton } from "@mantine/core";
import cx from "clsx";
import { SearchIcon } from "lucide-react";
import classes from "./search-control.module.css";

interface SearchControlProps extends BoxProps, ElementProps<"button"> {}

export function SearchControl({ className, ...others }: SearchControlProps) {
    return (
        <UnstyledButton {...others} className={cx(classes.root, className)}>
            <Group gap="xs">
                <SearchIcon className="size-5" />
                <Text fz="sm" c="dimmed" pr={80}>
                    Search
                </Text>
                <Text fw={700} className={classes.shortcut}>
                    Ctrl + K
                </Text>
            </Group>
        </UnstyledButton>
    );
}
