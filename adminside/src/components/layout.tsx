import '@mantine/core/styles.css';
import { useDisclosure } from '@mantine/hooks';
import { Burger, Box, NavLink, rem } from '@mantine/core';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { IconChartBar, IconTable} from '@tabler/icons-react';

function NavigationMenu() {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();
  
  // Функции для проверки активных маршрутов
  const isActive = (path: string) => location.pathname === path;
  const isStaffActive = () => location.pathname.startsWith('/staff');
  const isEventsActive = () => location.pathname.startsWith('/events');
  const isVolunteersActive = () => location.pathname.startsWith('/volunteers');

  return (
    <>
      <Burger 
        opened={opened} 
        onClick={toggle} 
        aria-label="Toggle navigation"
        style={{ position: 'fixed', top: 20, left: 20, zIndex: 1001 }}
      />
      
      {opened && (
        <Box
          style={{
            position: 'fixed',
            top: 60,
            left: 20,
            width: 250,
            backgroundColor: '#FF4A01',
            padding: '15px',
            borderRadius: '8px',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          <NavLink
            label="Аналитика"  
            component={Link}
            to="/"
            leftSection={<IconChartBar style={{ width: rem(20), height: rem(20) }} />}
            style={{ 
              marginBottom: 8,
              borderRadius: 4,
              color: isActive('/') ? 'black' : 'white',  // Подсветка для корневого пути
              backgroundColor: isActive('/') ? '#FF4A01' : 'transparent' // Задаем фоновый цвет активному элементу
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
              backgroundColor: isActive('/') ? '#FF4A01' : 'transparent' // Задаем фоновый цвет активному элементу
            }}
            childrenOffset={28}
          >
            <NavLink 
              label="Сотрудники" 
              component={Link} 
              to="/staff"
              style={{ color: isStaffActive() ? 'black' : 'white', backgroundColor: isActive('/') ? '#FF4A01' : 'transparent' // Задаем фоновый цвет активному элементу 
                }}

              onClick={toggle}
            />
            <NavLink 
              label="Мероприятия" 
              component={Link} 
              to="/events"
              style={{ color: isEventsActive() ? 'black' : 'white',  backgroundColor: isActive('/') ? '#FF4A01' : 'transparent' }}
              onClick={toggle}
            />
            <NavLink 
              label="Волонтеры" 
              component={Link} 
              to="/volunteers"
              style={{ color: isVolunteersActive() ? 'black' : 'white',  backgroundColor: isActive('/') ? '#FF4A01' : 'transparent' }}
              onClick={toggle}
            />
          </NavLink>
          
          {/* <NavLink
            label="Войти"
            component={Link}
            to="/signin"
            leftSection={<IconLogin style={{ width: rem(20), height: rem(20) }} />}
            style={{ 
              borderRadius: 4,
              color: isActive('/signin') ? 'black' : 'white',
            }}
            onClick={toggle}
          /> */}
        </Box>
      )}
    </>
  );
}

export function Layout() {
  return (
    <>
      <NavigationMenu />
      <Outlet />
    </>
  );
}