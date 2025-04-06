import "@mantine/core/styles.css";
import '@mantine/charts/styles.css';
import { BarChart } from '@mantine/charts';
import { Select, Grid, Container, Card, Image, Text, Group, Button, Badge } from "@mantine/core";
import { AreaChart } from '@mantine/charts';
import { data } from './data'; // данные для графиков
import { lose as chartData } from './lose'; // данные для графиков
import React from 'react';
import {events} from './pages/events/list';


const Demo = () => {
  const filteredEvents = events.filter(event => {
      const volunteersCount = event.volunteerslist.split(', ').length;
      return volunteersCount < event.needs && event.status === 'активно';
  });

  return (
      <Grid grow>
          {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
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
                ))
            ) : (
                <Text size="sm" c="dimmed" style={{ textAlign: 'center' }}>
                    Нет мероприятий, соответствующих условиям.
                </Text>
            )}
        </Grid>
    );
};

export default function App() {
    return (
        <>
            <Container size="xl">
                <Select
                    label="Направление"
                    placeholder="Pick value"
                    data={['Помощь животным', 'Помощь старикам', 'Садоводство', 'Медицина']}
                    w={400}
                />

                <AreaChart
                    h={300}
                    data={data}
                    dataKey="date"
                    series={[{ name: 'Apples', color: 'indigo.6' }]}
                    curveType="linear"
                    connectNulls
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
