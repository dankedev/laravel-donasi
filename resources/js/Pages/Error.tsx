import { Container } from "@mantine/core";

export default function ErrorPage({ status }: { status: number | string }) {
    return <Container>TJ {status.toString()}</Container>;
}
