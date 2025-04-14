import '@mantine/core/styles.css';
import { useDisclosure } from '@mantine/hooks';
import { Burger } from '@mantine/core';
import { Outlet } from 'react-router';


function Demo() {
  const [opened, { toggle }] = useDisclosure();
  return <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />;
}

export function Layout() {
  return (
    <>
      <Demo />
      <Outlet/> {/* Добавьте это для рендеринга дочерних элементов */}
    </>
  );
}