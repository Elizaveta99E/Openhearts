import { IconChevronRight } from '@tabler/icons-react';
import { AppShell, Burger, Grid, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import '@mantine/core/styles.css';
import { NavLink, rem } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { IconChartBar, IconTable } from '@tabler/icons-react';
import { Group, Avatar, Text, Menu } from '@mantine/core';
import {
  IconPencil, IconLogout
} from '@tabler/icons-react';

function NavigationMenu() {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  const isStaffActive = () => location.pathname.startsWith('/staff');
  const isEventsActive = () => location.pathname.startsWith('/events');
  const isVolunteersActive = () => location.pathname.startsWith('/volunteers');

  return (
    <>
      <NavLink
        label="Аналитика"  
        component={Link}
        to="/"
        leftSection={<IconChartBar style={{ width: rem(20), height: rem(20) }} />}
        style={{ 
          marginBottom: 8,
          borderRadius: 4,
          color: isActive('/') ? 'black' : 'white',
          backgroundColor: isActive('/') ? '#FF4A01' : 'transparent'
        }}
        onClick={toggle}
      />
      
      <NavLink
        label="Таблицы"
        leftSection={<IconTable style={{ width: rem(20), height: rem(20) }} />}
        style={{ 
          marginBottom: 8,
          borderRadius: 4,
          color: isStaffActive() || isEventsActive() || isVolunteersActive() ? 'black' : 'white',
          backgroundColor: isStaffActive() || isEventsActive() || isVolunteersActive() ? '#FF4A01' : 'transparent'
        }}
        childrenOffset={28}
      >
        <NavLink 
          label="Сотрудники" 
          component={Link} 
          to="/staff"
          style={{ 
            color: isStaffActive() ? 'black' : 'white', 
            backgroundColor: isStaffActive() ? '#FF4A01' : 'transparent'
          }}
          onClick={toggle}
        />
        <NavLink 
          label="Мероприятия" 
          component={Link} 
          to="/events"
          style={{ 
            color: isEventsActive() ? 'black' : 'white',  
            backgroundColor: isEventsActive() ? '#FF4A01' : 'transparent' 
          }}
          onClick={toggle}
        />
        <NavLink 
          label="Волонтеры" 
          component={Link} 
          to="/volunteers"
          style={{ 
            color: isVolunteersActive() ? 'black' : 'white',  
            backgroundColor: isVolunteersActive() ? '#FF4A01' : 'transparent' 
          }}
          onClick={toggle}
        />
      </NavLink>
    </>
  );
}

export function Layout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      styles={{
        root: {
          position: 'relative',
        },
        header: {
          border: 'none',
          
        },
        navbar: {
          border: 'none',
          backgroundColor: '#FF4A01',
        },
      }}
    >
      <AppShell.Header style={{ position: 'fixed', width: '100%', zIndex: 200 }}>
        <Grid justify="space-between" align="center" style={{ height: '100%' }}>
          <Grid.Col span={6}>
            <Image
              h={42}
              w={296}
              fit="contain"
              ml={15}
              src="./logo.svg"
            />
          </Grid.Col>
          <Grid.Col span={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              color="black"
            />
            <Menu withArrow>
              <Menu.Target>
                <div style={{ 
                  padding: '8px 16px',
                  cursor: 'pointer',
                  
                }}>
                  <Group gap="sm" style={{ pointerEvents: 'none' }}>
                    <Avatar 
                      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png" 
                      radius="xl" 
                    />
                    <div>
                      <Text size="sm" fw={500} >
                        Harriette Spoonlicker
                      </Text>
                      <Text size="xs" >
                        hspoonlicker@outlook.com
                      </Text>
                    </div>
                    <IconChevronRight size={16} style={{ marginLeft: 8 }} />
                  </Group>
                  
                </div>
              </Menu.Target>
              <Menu.Dropdown>
                <Group>
              <Avatar 
                      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png" 
                      radius="xl" 
                    />
          
            <Text size="sm">Фамилия Имя Отчество</Text>   </Group>         
         
          
          <Menu.Divider />
          
          <Menu.Item 
            leftSection={<IconPencil size={14} />}
            style={{
              backgroundColor: 'white'
          }}
          >
            Редактировать
          </Menu.Item>
          <Menu.Item 
            leftSection={<IconLogout size={14} />}
            color="red"
            style={{ backgroundColor: 'white'}}
          >
            Выйти
          </Menu.Item>
        </Menu.Dropdown>
            </Menu>
          </Grid.Col>
        </Grid>
      </AppShell.Header>

      <AppShell.Navbar style={{ background: '#FF4A01', paddingTop: '60px' }}>
        <NavigationMenu />
      </AppShell.Navbar>

      <AppShell.Main style={{ paddingTop: '60px' }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}