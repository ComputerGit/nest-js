import { Container, Group, Button, Text, ThemeIcon, rem } from "@mantine/core";
import { IconListCheck } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const HomeHeader = () => {
  const navigate = useNavigate();
  return (
    <header style={{ borderBottom: "1px solid #e9ecef" }}>
      <Container size="lg" py="md">
        <Group justify="space-between">
          <Group gap={5}>
            <ThemeIcon
              size="lg"
              radius="md"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
            >
              <IconListCheck style={{ width: rem(20), height: rem(20) }} />
            </ThemeIcon>
            <Text fw={900} size="xl">
              WorkManager.
            </Text>
          </Group>
          <Group visibleFrom="sm">
            <Button variant="subtle" onClick={() => navigate("/login")}>
              Log in
            </Button>
            <Button onClick={() => navigate("/register")}>Get Started</Button>
          </Group>
        </Group>
      </Container>
    </header>
  );
};
