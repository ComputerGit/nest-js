import {
  Container,
  Title,
  SimpleGrid,
  Card,
  ThemeIcon,
  Text,
} from "@mantine/core";
import { IconUser, IconListCheck, IconShieldLock } from "@tabler/icons-react";

export const FeaturesGrid = () => {
  return (
    <Container size="lg" py={100}>
      <Title order={2} ta="center" mb="xl">
        Everything you need to scale
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50} mt={50}>
        <FeatureCard
          icon={<IconUser size={26} />}
          title="Employee Profiles"
          description="Store documents, contact info, and role history."
        />
        <FeatureCard
          icon={<IconListCheck size={26} />}
          title="Project Tracking"
          description="Kanban boards and Gantt charts to keep your team aligned."
        />
        <FeatureCard
          icon={<IconShieldLock size={26} />}
          title="Bank-Grade Security"
          description="We use 256-bit encryption and strict RBAC."
        />
      </SimpleGrid>
    </Container>
  );
};

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <ThemeIcon size="xl" radius="md" variant="light">
        {icon}
      </ThemeIcon>
      <Text mt="md" fw={500} size="lg">
        {title}
      </Text>
      <Text size="sm" c="dimmed" mt="sm">
        {description}
      </Text>
    </Card>
  );
}
