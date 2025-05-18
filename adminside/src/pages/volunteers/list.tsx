import { Title, TextInput, Select,  Group, Stack, Button, Text  } from '@mantine/core';
import { Table } from '@mantine/core';
import { Pagination, Center } from '@mantine/core';
import { IconSearch, IconPlus } from '@tabler/icons-react';


const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  ];

import { IconAt } from '@tabler/icons-react';
const icon = <IconAt size={16} />;
export function VolunteersList() {
    const icon = <IconAt size={16} />;
    return <>
        
        <Text size="xs">Таблицы/Волонтеры</Text>
      <Stack gap="lg">
        
        <Group justify="space-between">
          <Title order={1}>Волонтеры</Title>
          <TextInput
            placeholder="Поиск..."
            leftSection={<IconSearch size={16} />}
            w={250}
          />
            <Button leftSection={<IconPlus size={16} />}>Добавить</Button>
        </Group>
      </Stack>
        <Group justify="space-between">
         <Select
          label="Количество записей на странице"
          data={['1', '2', '5', '10']} 
          />
          <Select
          label="Сортировать"          
          data={['От А-Я', 'От Я-А', 'Самые молодые', 'Взрослые']} 
          />
          <Group><Button variant="filled">Взрослые</Button>
          <Button variant="filled">Дети</Button>  </Group>
      
       
       
       </Group>
       <Center mt="md"><Pagination  total={10} styles={{control: {width: 30},}}/> {/*переключние страниц*/}</Center>
        <Demo />  {/*Таблица*/}        
        <Stack
                  
          bg="var(--mantine-color-body)"
          align="center"
          justify="center"
          gap="md">
          <Button leftSection={<IconPlus size={16} />} w = '150px' justify="center">Добавить</Button>
          <Pagination total={10} styles={{control: {width: 30},}}       />
        </Stack>
    </>
}


function Demo() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Element position</Table.Th>
          <Table.Th>Element name</Table.Th>
          <Table.Th>Symbol</Table.Th>
          <Table.Th>Atomic mass</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}