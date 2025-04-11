import "@mantine/core/styles.css";
import '@mantine/charts/styles.css';
import { BarChart } from '@mantine/charts';
import { Select, Grid, Container, Card, Image, Text, Group, Button, Badge, Paper } from "@mantine/core";
import { AreaChart } from '@mantine/charts';
import { data } from './data';
import { lose as chartData } from './lose';
import React from 'react';
import { events } from './pages/events/list';
import { TooltipProps } from 'recharts';
// TooltipProps для подсказки в  первом чарте
const CustomTooltip = ({ active, payload }: TooltipProps<any, any>) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div style={{
      background: 'white',
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <p style={{ margin: 0, color: 'orange', fontWeight: 'bold' }}>
        {payload[0].value} волонтеров
      </p>
    </div>
  );
};


interface Event {
  id: string;
  name: string;
  pic: string;
  startDate: string;
  endDate: string;
  time: string;
  city: string;
  place: string;
  volunteerslist: string;
  needs: number;
  status: string;
}

interface ChartDataItem {
  date: string;
  Volunteers: number;
}

const prepareVolunteersData = (events: Event[]): ChartDataItem[] => {
  const monthlyData: Record<number, number> = {};
  
  events.forEach(event => {
    if (event.endDate && event.volunteerslist) {
      const date = new Date(event.endDate);
      const month = date.getMonth();
      
      const volunteersCount = event.volunteerslist
        .split(',')
        .filter(v => v.trim() !== '').length;
      
      monthlyData[month] = (monthlyData[month] || 0) + volunteersCount;
    }
  });
  
  const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];
  
  return monthNames.map((name, index) => ({
    date: name,
    Volunteers: monthlyData[index] || 0
  }));
};

const Demo = () => {
  const filteredEvents = events.filter(event => {
    const volunteersCount = event.volunteerslist.split(', ').length;
    return volunteersCount < event.needs && event.status === 'активно';
  });

  return (
    <Paper shadow="md" radius="lg" withBorder p="xl">
      <div style={{ resize: 'horizontal', overflow: 'hidden', maxWidth: '100%' }}>
        <Grid type="container"
          breakpoints={{ xs: '100px', sm: '200px', md: '300px', lg: '400px', xl: '500px' }}> 
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <Grid.Col span="auto">
                <Card key={event.id} shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section>
                    <Image
                      src={event.pic}
                      height={160}
                      alt={event.name}
                    />
                  </Card.Section>
                  <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>{event.name}</Text>
                    <Badge color="pink">Важно</Badge>
                  </Group>
                  <Text size="sm" c="dimmed">
                    <strong>Даты проведения:</strong> {event.startDate} – {event.endDate}
                  </Text>
                  <Text size="sm" c="dimmed">
                    <strong>Время проведения:</strong> {event.time}
                  </Text>
                  <Text size="sm" c="dimmed">
                    <strong>Место проведения:</strong> {event.city}, {event.place}
                  </Text>
                  <Button color="orange" fullWidth mt="md" radius="md">
                    Подробнее
                  </Button>
                </Card>
              </Grid.Col>
            ))
          ) : (
            <Text size="sm" c="dimmed" style={{ textAlign: 'center' }}>
              Нет мероприятий, соответствующих условиям.
            </Text>
          )}
        </Grid>
      </div>
    </Paper>
  );
};
// Функция для подготовки данных о проваленных мероприятиях по годам
const prepareFailedEventsByYear = (events: Event[]): { year: string; count: number }[] => {
  const yearlyData: Record<string, number> = {};

  events.forEach(event => {
    if (event.status === 'провалено' && event.endDate) {
      const year = new Date(event.endDate).getFullYear().toString();
      yearlyData[year] = (yearlyData[year] || 0) + 1;
    }
  });

  // Сортируем годы по возрастанию
  return Object.entries(yearlyData)
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => parseInt(a.year) - parseInt(b.year));
};
export default function App() {
  const volunteersData = prepareVolunteersData(events);
  const failedEventsData = prepareFailedEventsByYear(events);
  return (
    <>
      <Container size="xl">
        <Select
          label="Направление"
          placeholder="Выберите значение"
          data={[ "Дети и молодежь",
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
    "Другое"]}
          w={400}
        />

<AreaChart
  h={300}
  data={volunteersData}
  dataKey="date"
  series={[{ name: 'Volunteers', color: 'orange' }]}
  curveType="linear"
  connectNulls
  tooltipProps={{
    content: CustomTooltip, // Просто передайте компонент
  }}
/>

        <Grid>
          <Grid.Col span={4}>
          <BarChart
            h={200}
            data={failedEventsData} 
            dataKey="year"
            orientation="vertical"
            barProps={{ radius: 10 }}
            series={[{ name: 'count', color: 'red.6', label: 'Проваленные мероприятия' }]}
            tooltipProps={{
              formatter: (value) => [`${value} мероприятий`, null],
              labelFormatter: (label) => `Год: ${label}`
            }}
            yAxisProps={{
              width: 80,
              label: { value: 'Год', angle: -90, position: 'insideLeft' }
            }}
            xAxisProps={{
              label: { value: 'Количество', position: 'insideBottom', offset: -5 }
            }}
          />
          </Grid.Col>
          <Grid.Col span={4}>
            <BarChart
              h={200}
              data={chartData} 
              dataKey="month"
              orientation="vertical"
              yAxisProps={{ width: 80 }}
              barProps={{ radius: 10 }}
              series={[{ name: 'Smartphones', color: 'blue.6' }]}
            />
          </Grid.Col>
        </Grid>

        <Demo />
      </Container>
    </>
  );
}