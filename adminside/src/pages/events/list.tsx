import { 
  Title, TextInput, Select, 
  Group, Stack, Button, Container,
  Table, Pagination, Checkbox, Divider,
  Text,  Box, NativeSelect} from '@mantine/core';
import { IconSearch, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { DatePickerInput } from '@mantine/dates';
import 'dayjs/locale/ru';

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

const formatOptions = ['Онлайн', 'Офлайн'];
const conditionOptions = [
  'Бесплатное питание',
  'Билеты в театр',
  'Благодарности',
  'Верифицированные часы',
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
      <Text size="xs">Таблицы/Мероприятия</Text>
      <Stack gap="lg">
        
        <Group justify="space-between">
          <Title order={1}>Мероприятия</Title>
          <TextInput
            placeholder="Поиск..."
            leftSection={<IconSearch size={16} />}
            w={250}
          />
            <Button leftSection={<IconPlus size={16} />}>Создать</Button>
        </Group>

        <Group align="flex-start" gap="xl">
          {/* Фильтры */}
          <Box style={{ width: 200 }}>
            <Stack gap="md">
              <Divider label="Фильтр" />
              
              <Stack gap="xs">
                <Text fw={500}>Направление</Text>
                <NativeSelect
                  mt="md"
                  data={["Всё",
                          "Дети и молодежь",
                          "Образование",
                          "Поиск пропавших",
                          "СВО",
                          "Урбанистика",
                          "Срочная помощь (ЧС)",
                          "Экология",
                          "Животные",
                          "Ветераны и историческая память",
                          "Спорт и события",
                          "Здравоохранение",
                          "Права человека",
                          "Помощь лицам с ОВЗ",
                          "Старшее поколение",
                          "Культура и искусство",
                          "Интеллектуальная помощь",
                          "Наука",
                          "Наставничество",
                          "Другое"
                        ]}
                />

              </Stack>
              
              <Stack gap="xs">
                <Text fw={500}>Дата</Text>
                <Date />
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
                
                <Pagination total={10} styles={{control: {width: 30},}}/>
                
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

              <Stack
                  
                  bg="var(--mantine-color-body)"
                  align="center"
                  justify="center"
                  gap="md">
                <Button leftSection={<IconPlus size={16} />} w = '150px' justify="center">Создать</Button>
                <Pagination total={10} styles={{control: {width: 30},}}/>
                </Stack>
            </Stack>
          </Box>
        </Group>
      </Stack>
    </Container>
  );
}


import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

function Date() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <DatePickerInput
      type="range"
      locale="ru"
      size="xs"
      placeholder="Дата"
      value={value}
      onChange={setValue}
      styles={{
        calendarHeaderControl: {
          width: 24, 
          height: 24,
        },
      }}
      nextIcon={<IconChevronRight size={16} />} 
      previousIcon={<IconChevronLeft size={16} />}
    />
  );
}