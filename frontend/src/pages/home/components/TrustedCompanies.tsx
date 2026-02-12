import React from "react";
import { Container, Text, Group } from "@mantine/core";

export const TrustedCompanies = () => {
  return (
    <div style={{ backgroundColor: "#f8f9fa", padding: "60px 0" }}>
      <Container size="lg">
        <Text
          ta="center"
          c="dimmed"
          fw={700}
          mb="xl"
          style={{ textTransform: "uppercase", letterSpacing: 1 }}
        >
          Trusted by industry leaders
        </Text>
        <Group
          justify="center"
          gap={60}
          style={{ opacity: 0.6, filter: "grayscale(100%)" }}
        >
          <Text fw={900} size="xl">
            Google
          </Text>
          <Text fw={900} size="xl">
            Amazon
          </Text>
          <Text fw={900} size="xl">
            Spotify
          </Text>
          <Text fw={900} size="xl">
            Netflix
          </Text>
          <Text fw={900} size="xl">
            Slack
          </Text>
        </Group>
      </Container>
    </div>
  );
};
