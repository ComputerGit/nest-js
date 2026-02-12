import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Badge,
  rem,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <Container size="lg" py={100}>
      <div style={{ textAlign: "center" }}>
        <Badge variant="filled" color="blue" radius="sm" size="lg" mb="md">
          v2.0 is now live
        </Badge>
        <Title
          order={1}
          fw={900}
          style={{ fontSize: rem(54), lineHeight: 1.1 }}
        >
          Manage your <span style={{ color: "#228be6" }}>Team</span> <br />
          without the chaos.
        </Title>
        <Text c="dimmed" mt="md" size="xl" maw={600} mx="auto">
          Track attendance, assign projects, and handle payroll in one secure
          dashboard. Trusted by 500+ companies.
        </Text>
        <Group justify="center" mt="xl">
          <Button size="xl" radius="md" onClick={() => navigate("/register")}>
            Start 14-day Free Trial
          </Button>
          <Button size="xl" radius="md" variant="default">
            Book a Demo
          </Button>
        </Group>
      </div>
    </Container>
  );
};
