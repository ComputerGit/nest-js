import { useForm } from "@mantine/form"; // Only import useForm here
import { zodResolver } from "mantine-form-zod-resolver"; // Import resolver from the new package
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Text,
} from "@mantine/core";
import { useLogin } from "./useLogin";
import { loginSchema } from "./types";
import type { LoginDTO } from "./types";

export const LoginForm = () => {
  const { mutate: login, isPending, error } = useLogin();

  // 1. Pass the <LoginDTO> generic to useForm
  // This tells TypeScript: "This form MUST match the LoginDTO shape"
  const form = useForm<LoginDTO>({
    mode: "uncontrolled", // Better performance for login forms
    initialValues: {
      email: "",
      password: "",
    },
    // 2. Use the resolver from the new package
    validate: zodResolver(loginSchema),
  });

  const handleSubmit = (values: LoginDTO) => {
    login(values);
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className="font-sans">
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Sign in to manage employees and projects
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {/* Error Notification */}
        {error && (
          <Text c="red" size="sm" mb="md" ta="center" fw={500}>
            Login failed. Please check your credentials.
          </Text>
        )}

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="admin@company.com"
            required
            key={form.key("email")} // specific to Mantine v7
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            key={form.key("password")} // specific to Mantine v7
            {...form.getInputProps("password")}
          />

          <Button fullWidth mt="xl" type="submit" loading={isPending}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
