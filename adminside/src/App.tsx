import "@mantine/core/styles.css";
import '@mantine/charts/styles.css';
import { BarChart } from '@mantine/charts';
import { Select, Grid, Container, Card, Image, Text, Group, Button, Badge, Paper } from "@mantine/core";
import { AreaChart } from '@mantine/charts';
import { data } from './data';
import { lose as chartData } from './lose';
import React from 'react';
import { events } from './pages/events/list';

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

export default function App() {
  const volunteersData = prepareVolunteersData(events);

  return (
    <>
      <Container size="xl">
        <Select
          label="Направление"
          placeholder="Выберите значение"
          data={['Помощь животным', 'Помощь старикам', 'Садоводство', 'Медицина']}
          w={400}
        />

        <AreaChart
          h={300}
          data={volunteersData}
          dataKey="date"
          series={[{ name: 'Volunteers', color: 'orange' }]}
          curveType="linear"
          connectNulls
          yAxisLabel="Количество волонтеров"
          xAxisLabel="Месяц"
        />

        <Grid>
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