import React from "react";
import { Container, Title, Accordion } from "@mantine/core";

export const FaqSection = () => {
  return (
    <Container size="sm" py={100}>
      <Title order={2} ta="center" mb={50}>
        Frequently Asked Questions
      </Title>

      <Accordion variant="separated" radius="md">
        <Accordion.Item value="item-1">
          <Accordion.Control>Is there a free trial?</Accordion.Control>
          <Accordion.Panel>
            Yes! You can try WorkManager Pro for 14 days with no credit card
            required.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="item-2">
          <Accordion.Control>Can I manage remote teams?</Accordion.Control>
          <Accordion.Panel>
            Absolutely. We have specific features for time-zone management and
            async communication.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="item-3">
          <Accordion.Control>How secure is my data?</Accordion.Control>
          <Accordion.Panel>
            We are SOC2 compliant and use AES-256 encryption for all data at
            rest and in transit.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};
