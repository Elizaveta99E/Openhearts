import { AppShell, Burger, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import '@mantine/core/styles.css';
import { NavLink, rem } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { IconChartBar, IconTable} from '@tabler/icons-react';
import { Drawer, Button } from '@mantine/core';
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
       
      
    </>
  );
}

export function Layout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60}}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      styles={{
        root: {
          position: 'relative', // Добавляем относительное позиционирование
        },
        header: {
          border: 'none', // Убираем границу у header
        },
        navbar: {
          border: 'none', // Убираем границу у navbar
          borderRight: 'none', // Убираем правую границу (если нужно)
          
        },
       
      }}
    >
      <AppShell.Header style={{ position: 'fixed', width: '100%', zIndex: 200 }}>
        
        <div>
          <Image
            h={42}
            w={296}
            fit="contain"
            mt={8}
            src="./public/logo.svg"
          />
        </div>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
      </AppShell.Header>

      <AppShell.Navbar style={{background:'#FF4A01'}}>
        <NavigationMenu />
      </AppShell.Navbar>

      <AppShell.Main style={{ paddingTop: 60 }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}