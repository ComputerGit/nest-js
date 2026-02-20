import { Paper, Title, TextInput, Button } from "@mantine/core";

// ❌ REMOVE: export default function LoginPage...
// ✅ ADD: export const
export const LoginPage = () => {
  return (
    <Paper radius="md" p="xl" withBorder>
      <Title order={2} ta="center" mt="md" mb={50}>
        Welcome back to Skyde!
      </Title>
      {/* ... rest of your login form ... */}
    </Paper>
  );
};
