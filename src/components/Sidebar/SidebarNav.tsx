import { Stack } from '@chakra-ui/react';
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from 'react-icons/ri';
import { NavSection } from './NavSection';
import { NavLink } from './NavLink';

export const SidebarNav = () => {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="Geral">
        <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
        <NavLink icon={RiContactsLine} href="/users">Users</NavLink>
      </NavSection>
      <NavSection title="Users">
        <NavLink icon={RiGitMergeLine} href="/forms">Forms</NavLink>
        <NavLink icon={RiInputMethodLine} href="/automation">Automation</NavLink>
      </NavSection>
    </Stack>
  );
};
