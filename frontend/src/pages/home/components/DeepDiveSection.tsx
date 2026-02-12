import React from "react";
import { Container, Grid, Title, Text, ThemeIcon, Group } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export const DeepDiveSection = () => {
  return (
    <Container size="lg" py={60}>
      <Grid gutter={80} align="center">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={2} mb="md">
            Track time with precision
          </Title>
          <Text c="dimmed" size="lg">
            Stop guessing how long tasks take. Our built-in timer allows
            employees to log hours against specific project codes.
          </Text>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
            <ListItem>Automatic overtime calculation</ListItem>
            <ListItem>GPS location stamping for remote teams</ListItem>
            <ListItem>Integration with QuickBooks & Xero</ListItem>
          </ul>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <div
            style={{
              height: 300,
              background: "#e7f5ff",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text c="blue" fw={700}>
              [ App Screenshot Placeholder ]
            </Text>
          </div>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

// Helper specific to this section
function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <Group align="flex-start" mb="sm" gap="xs">
      <ThemeIcon color="green" size="xs" radius="xl" mt={4}>
        <IconCheck size={12} />
      </ThemeIcon>
      <Text size="sm">{children}</Text>
    </Group>
  );
}
