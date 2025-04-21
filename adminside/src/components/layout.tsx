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

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer 
  offset={8}
  opened={opened}
  onClose={close}
  size="md" // Увеличиваем базовую ширину (можно использовать 'xl', 'sm' или число в px)
  styles={{
    content: {
      backgroundColor: '#FF4A01',
      height: '300px', // Уменьшаем высоту Drawer (было 300px)
      top: 60,
      position: 'fixed',
      width: '250px' // Увеличиваем ширину (было 250)
    },
    header: {
      backgroundColor: '#FF4A01',
      color: 'white',
      height: '40px', // Уменьшаем высоту header (было 50px)
      minHeight: '30px', // Добавляем минимальную высоту
      padding: '8px 16px' // Уменьшаем отступы внутри header
    },
    body: {
      paddingTop: 0
    }
  }}
>
  <NavigationMenu />
</Drawer>

      <Button
        variant="filled"
        styles={{
          root: {
            backgroundColor: '#FF4A01',
            '&:hover': {
              backgroundColor: '#E54300',
            },
          }
        }}
        h={40}
        w={40}
        onClick={open}
        p={0}
      >
        <Image
          h={31}
          w={31}
          fit="contain"
          src="./public/menubutton.svg"
        />
      </Button>
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