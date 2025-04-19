import { 
  Title, 
  TextInput, 
  Select, 
  Group, 
  Stack, 
  Button, 
  Container,
  Table,
  Pagination,
  Checkbox,
  Divider,
  Text,
  Box
} from '@mantine/core';
import { IconSearch, IconPlus } from '@tabler/icons-react';
import React from 'react';

const eventsData = [
  { 
    id: '01', 
    name: 'Помощь животным', 
    responsible: '00001', 
    startDate: '01.02.2999', 
    endDate: '02.02.2999', 
    volunteers: '01, 02, 04' 
  },
  // Добавьте больше мероприятий по аналогии
];

const formatOptions = ['Все', 'Онлайн', 'Офлайн'];
const conditionOptions = [
  'Бесплатное питание',
  'Билеты в театр',
  'Благодарности',
  'Верхнешированные часы',
  'Оплата проживания',
  'Персональное обучение',
  'Проезд',
  'Психологическая консультация',
  'Сувенирная продукция',
  'Экипировка',
  'Средства индивидуальной защиты'
];
const featureOptions = [
  'Только с периферированными часами',
  'Младше 18 лет',
  'Идет набор в резерв',
  'Можно как посетитель',
  'Организация работает по стандарту организатора волонтерской деятельности',
  'Победители комиссии обучают президентских грантов',
  'Организации из реестра СО НКО',
  'Адресная помощь',
  'Доступно для людей с инвалидностью',
  'Доступно для серебрянных волонтеров',
  'Можно приходить с детьми',
  'Образовательное мероприятие'
];

export function EventsList() {
  const rows = eventsData.map((event) => (
    <Table.Tr key={event.id}>
      <Table.Td>{event.id}</Table.Td>
      <Table.Td>{event.name}</Table.Td>
      <Table.Td>{event.responsible}</Table.Td>
      <Table.Td>{event.startDate}</Table.Td>
      <Table.Td>{event.endDate}</Table.Td>
      <Table.Td>{event.volunteers}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="xl">
      <Stack gap="lg">
        <Title order={1}>Мероприятия</Title>
        
        <Group gap="md" align="flex-end">
          <TextInput
            placeholder="Поиск..."
            leftSection={<IconSearch size={16} />}
            w={400}
          />
          <Button leftSection={<IconPlus size={16} />}>Создать</Button>
        </Group>

        <Group align="flex-start" gap="xl">
          {/* Фильтры */}
          <Box style={{ width: 300 }}>
            <Stack gap="md">
              <Divider label="Фильтр" />
              
              <Stack gap="xs">
                <Text fw={500}>Направление</Text>
                <Checkbox label="Все направления" />
              </Stack>
              
              <Stack gap="xs">
                <Text fw={500}>Дата</Text>
                <Checkbox label="Любая дата" />
              </Stack>
              
              <Divider label="Формат проведения" />
              {formatOptions.map(option => (
                <Checkbox key={option} label={option} />
              ))}
              
              <Divider label="Условия проведения" />
              {conditionOptions.map(option => (
                <Checkbox key={option} label={option} />
              ))}
              
              <Divider label="Особенности мероприятия" />
              {featureOptions.map(option => (
                <Checkbox key={option} label={option} />
              ))}
            </Stack>
          </Box>

          {/* Таблица и управление */}
          <Box style={{ flex: 1 }}>
            <Stack gap="md">
              <Group justify="space-between">
                <Select
                  label="Количество записей на странице"
                  placeholder="Выберите"
                  data={['10', '25', '50', '100']}
                  style={{ width: 250 }}
                />
                
                <Pagination total={10} />
                
                <Select
                  label="Сортировать"
                  placeholder="Выберите"
                  data={['От А-Я', 'От Я-А', 'Старые', 'Новые']}
                  style={{ width: 250 }}
                />
              </Group>

              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>ID</Table.Th>
                    <Table.Th>Наименование мероприятия</Table.Th>
                    <Table.Th>Ответственное лицо</Table.Th>
                    <Table.Th>Дата начала</Table.Th>
                    <Table.Th>Дата окончания</Table.Th>
                    <Table.Th>Список волонтеров (id)</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>

              <Group justify="space-between">
                <Button leftSection={<IconPlus size={16} />}>Создать</Button>
                <Pagination total={10} />
              </Group>
            </Stack>
          </Box>
        </Group>
      </Stack>
    </Container>
  );
}