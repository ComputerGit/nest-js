import {
  AppShell,
  Burger,
  Group,
  Text,
  NavLink,
  Stack,
  ThemeIcon,
  Avatar,
  Menu,
  Badge,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLayoutDashboard,
  IconUsers,
  IconCalendar,
  IconSettings,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

// 1. CONFIGURATION (Backend Style)
// distinct visual identities for each role
const ROLE_THEMES = {
  admin: {
    primary: "blue",
    bg: "blue.0",
    label: "ADMIN PORTAL",
    gradient: { from: "blue", to: "cyan", deg: 90 },
  },
  employee: {
    primary: "teal",
    bg: "teal.0",
    label: "EMPLOYEE WORKSPACE",
    gradient: { from: "teal", to: "lime", deg: 90 },
  },
};

export function MainLayout() {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();

  // 2. DYNAMIC ROLE (In real app, this comes from your AuthContext)
  // TRY CHANGING THIS TO 'employee' TO SEE THE MAGIC!
  const userRole = "employee";

  const config = ROLE_THEMES[userRole];

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{ width: 260, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
      layout="alt" // 'alt' style floats the header, looking more modern
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />

            {/* Dynamic Brand Logo */}
            <Group gap="xs">
              <ThemeIcon
                size="lg"
                variant="gradient"
                gradient={config.gradient}
                radius="md"
              >
                <IconLayoutDashboard size={20} />
              </ThemeIcon>
              <div>
                <Text fw={700} size="lg" lh={1}>
                  Skyde Suite
                </Text>
                <Badge size="xs" variant="light" color={config.primary}>
                  {config.label}
                </Badge>
              </div>
            </Group>
          </Group>

          {/* User Profile - Changes color based on role */}
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Group gap="xs" style={{ cursor: "pointer" }}>
                <Avatar color={config.primary} radius="xl">
                  AD
                </Avatar>
                <div style={{ flex: 1 }}>
                  <Text size="sm" fw={500}>
                    Admin User
                  </Text>
                  <Text c="dimmed" size="xs">
                    admin@skyde.com
                  </Text>
                </div>
              </Group>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<IconUserCircle size={14} />}>
                Profile
              </Menu.Item>
              <Menu.Item leftSection={<IconSettings size={14} />}>
                Settings
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item color="red" leftSection={<IconLogout size={14} />}>
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack gap="xs">
          {/* 3. DYNAMIC NAVIGATION LINKS */}
          {/* We use the 'color' prop to pass our role color to the active link */}
          <NavLink
            label="Dashboard"
            leftSection={<IconLayoutDashboard size="1rem" stroke={1.5} />}
            active={location.pathname === "/admin"}
            onClick={() => navigate("/admin")}
            variant="filled"
            color={config.primary} // <--- The Magic
          />
          <NavLink
            label="Employees"
            leftSection={<IconUsers size="1rem" stroke={1.5} />}
            active={location.pathname.startsWith("/admin/employees")}
            onClick={() => navigate("/admin/employees")}
            variant="filled"
            color={config.primary}
          />
          <NavLink
            label="Calendar"
            leftSection={<IconCalendar size="1rem" stroke={1.5} />}
            active={location.pathname === "/admin/calendar"}
            onClick={() => navigate("/admin/calendar")}
            variant="filled"
            color={config.primary}
          />
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main bg="gray.0">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
