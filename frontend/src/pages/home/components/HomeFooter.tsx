import React from "react";
import {
  Container,
  Group,
  Text,
  ThemeIcon,
  ActionIcon,
  rem,
} from "@mantine/core";
import {
  IconListCheck,
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";

export const HomeFooter = () => {
  return (
    <footer
      style={{ borderTop: "1px solid #e9ecef", backgroundColor: "#f8f9fa" }}
    >
      <Container size="lg" py={60}>
        <Group justify="space-between" align="start">
          {/* Brand Column */}
          <div style={{ maxWidth: 300 }}>
            <Group gap={5} mb="md">
              <ThemeIcon
                size="md"
                radius="sm"
                variant="gradient"
                gradient={{ from: "blue", to: "cyan" }}
              >
                <IconListCheck style={{ width: rem(16), height: rem(16) }} />
              </ThemeIcon>
              <Text fw={700} size="lg">
                WorkManager.
              </Text>
            </Group>
            <Text size="sm" c="dimmed">
              The #1 platform for modern HR teams. Built for speed, security,
              and scale.
            </Text>
          </div>

          {/* Links Columns */}
          <div style={{ display: "flex", gap: 50 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Text fw={700} mb={5}>
                Product
              </Text>
              <Text size="sm" c="dimmed" component="a" href="#">
                Features
              </Text>
              <Text size="sm" c="dimmed" component="a" href="#">
                Pricing
              </Text>
              <Text size="sm" c="dimmed" component="a" href="#">
                Integrations
              </Text>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Text fw={700} mb={5}>
                Company
              </Text>
              <Text size="sm" c="dimmed" component="a" href="#">
                About
              </Text>
              <Text size="sm" c="dimmed" component="a" href="#">
                Careers
              </Text>
              <Text size="sm" c="dimmed" component="a" href="#">
                Contact
              </Text>
            </div>
          </div>
        </Group>

        <div
          style={{
            borderTop: "1px solid #dee2e6",
            marginTop: 40,
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Text c="dimmed" size="sm">
            © 2024 WorkManager Inc. All rights reserved.
          </Text>
          <Group gap="xs">
            <ActionIcon size="lg" variant="subtle" color="gray">
              <IconBrandTwitter size={18} />
            </ActionIcon>
            <ActionIcon size="lg" variant="subtle" color="gray">
              <IconBrandYoutube size={18} />
            </ActionIcon>
            <ActionIcon size="lg" variant="subtle" color="gray">
              <IconBrandInstagram size={18} />
            </ActionIcon>
          </Group>
        </div>
      </Container>
    </footer>
  );
};
