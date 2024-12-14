import { Link, router, usePage } from "@inertiajs/react";
import {
    ActionIcon,
    AppShell,
    Avatar,
    Button,
    Group,
    Menu,
    useMantineColorScheme,
} from "@mantine/core";
import { ChevronDown, LogOut, MoonIcon, Search, SunIcon, UserPen } from "lucide-react";
// import { useGetAuth } from "@/helpers";

export function UserButton() {
    const user = usePage().props.auth.user;
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const toggleColorScheme = () => {
        setColorScheme(colorScheme === "dark" ? "light" : "dark");
    };

    // const IconColor = () => (
    //   <Fragment>

    //     <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
    //   </Fragment>
    // );

    return (
        <AppShell.Section px={0} py="sm">
            <Group justify="space-between" wrap="nowrap" w="full">
                <Menu position="bottom-start" withArrow withinPortal>
                    <Menu.Target>
                        <Button
                            fullWidth
                            size="sm"
                            px={6}
                            variant="subtle"
                            justify="space-between"
                            color="gray"
                            styles={{
                                label: {
                                    display: "flex",
                                    gap: 6,
                                },
                            }}
                            rightSection={<ChevronDown className="text-xl" />}
                        >
                            <Avatar src={user?.avatar} size="sm" />
                            <span className="text-sm"> {user?.name}</span>
                        </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item
                            component={Link}
                            href={route("profile.edit")}
                            leftSection={<UserPen className="size-3" />}
                        >
                            Akun Saya
                        </Menu.Item>
                        <Menu.Item
                            onClick={toggleColorScheme}
                            leftSection={
                                colorScheme ? (
                                    <SunIcon className="size-3" />
                                ) : (
                                    <MoonIcon className="size-3" />
                                )
                            }
                            // leftSection={
                            //     <Icon
                            //         icon={
                            //             colorScheme === "dark" ? "heroicons:sun" : "heroicons:moon"
                            //         }
                            //     />
                            // }
                        >
                            Ganti Tema
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item>Komunitas</Menu.Item>
                        <Menu.Item>Roadmap</Menu.Item>
                        <Menu.Item>Bantuan</Menu.Item> <Menu.Divider />
                        <Menu.Item
                            leftSection={<LogOut className="size-3" />}
                            onClick={() => router.post(route("logout"))}
                        >
                            Sign out
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>

                <ActionIcon variant="subtle">
                    <Search className="size-3" />
                </ActionIcon>
            </Group>
        </AppShell.Section>
    );
}
