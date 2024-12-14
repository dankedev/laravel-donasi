import { usePage } from "@inertiajs/react";
import { Avatar, Flex, Text, UnstyledButton } from "@mantine/core";
import classes from "./user-button.module.css";
// import { useGetAuth } from "@/helpers";

export function UserButton() {
    const user = usePage().props.auth.user;

    return (
        <UnstyledButton className={classes.user}>
            <Flex direction="row" gap={8}>
                <Avatar src={user?.name} radius="xl" />

                <div style={{ flex: 1 }}>
                    <Text size="sm" w={500}>
                        {user?.name}
                        {}
                    </Text>

                    <Text c="dimmed" size="xs">
                        {user?.email}
                    </Text>
                </div>
            </Flex>
        </UnstyledButton>
    );
}
