import { Title, TextInput, Select,  Group, Stack, Center, Container  } from '@mantine/core';
import { Table } from '@mantine/core';
import { Pagination } from '@mantine/core';


const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  ];

import { IconAt } from '@tabler/icons-react';
const icon = <IconAt size={16} />;
export function StaffList() {
    const icon = <IconAt size={16} />;
    return <>
        
        <Container size="xl" >
        <Stack
        
        >
        <Title order={1}>Сотрудники</Title>
        
        <TextInput                                 //поиск
            
            leftSectionPointerEvents="none"
            leftSection={icon}
            w={400}                 
            
        />
        
        <Group gap="lg" grow>
         <Select
          label="Your favorite library"
          placeholder="Pick value"
          data={['React', 'Angular', 'Vue', 'Svelte']} 
          />
      
       <Pagination total={10} /> {/*переключние страниц*/}
       </Group>
        <Demo />  {/*Таблица*/}        
        <Pagination total={10} /> {/*переключние страниц....*/}
        </Stack>
        </Container>
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
    <Table>
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