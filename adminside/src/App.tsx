import "@mantine/core/styles.css";
import '@mantine/charts/styles.css';
import { BarChart } from '@mantine/charts';
import { Select, Grid, Container, Card, Image, Text, Group, Button, Badge, Paper, Title, SimpleGrid, Alert, LoadingOverlay } from "@mantine/core";
import { AreaChart } from '@mantine/charts';
import { useState, useEffect } from 'react';
import { TooltipProps } from 'recharts';
import { IconAlertCircle } from '@tabler/icons-react';

interface Course {
  id: number;
  name: string;
}

interface Event {
  id: number;
  name: string;
  pic: string | null;
  startDate: string;
  endDate: string;
  time: string;
  place: string;
  needs: number;
  Activities?: { id: number }[];
  city?: string;
  description?: string;
}

interface VolunteerActivity {
  month: string;
  count: string;
}

interface YearlyStat {
  year: string;
  count: string;
}

interface DashboardData {
  courses: Course[];
  activeEvents: number;
  completedEvents: number;
  newVolunteers: number;
  volunteerActivity: VolunteerActivity[];
  failedEvents: YearlyStat[];
  newVolunteersByYear: YearlyStat[];
  eventsNeedVolunteers: Event[];
  eventsWithoutVolunteers: number;
}

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

const Demo = ({ events }: { events: Event[] }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  return (
    <Paper shadow="md" radius="lg" withBorder p="xl">
      <Title order={1} mb="xl">Ближайшие мероприятия, нуждающиеся в волонтерах</Title>
      <div style={{ resize: 'horizontal', overflow: 'hidden', maxWidth: '100%' }}>
        <Grid>
          {events.length > 0 ? (
            events.map(event => (
              <Grid.Col span={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={event.id}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section>
                    <Image
                      src={event.pic || 'https://placehold.co/600x400?text=Нет+изображения'}
                      height={160}
                      alt={event.name}
                    />
                  </Card.Section>
                  <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500} lineClamp={1}>{event.name}</Text>
                    <Badge color="pink">Нужны волонтеры: {event.needs}</Badge>
                  </Group>
                  <Text size="sm" c="dimmed">
                    <strong>Даты:</strong> {formatDate(event.startDate)} – {formatDate(event.endDate)}
                  </Text>
                  <Text size="sm" c="dimmed">
                    <strong>Время:</strong> {event.time.slice(0, 5)}
                  </Text>
                  <Text size="sm" c="dimmed" lineClamp={1}>
                    <strong>Место:</strong> {event.city ? `${event.city}, ${event.place}` : event.place}
                  </Text>
                  {event.description && (
                    <Text size="sm" mt="xs" lineClamp={2}>
                      {event.description}
                    </Text>
                  )}
                  <Button 
                    component="a" 
                    href={`/events/${event.id}`} 
                    color="orange" 
                    fullWidth 
                    mt="md" 
                    radius="md"
                  >
                    Подробнее
                  </Button>
                </Card>
              </Grid.Col>
            ))
          ) : (
            <Grid.Col span={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Alert color="blue" title="Нет мероприятий">
                В настоящее время нет мероприятий, нуждающихся в волонтерах.
              </Alert>
            </Grid.Col>
          )}
        </Grid>
      </div>
    </Paper>
  );
};

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    activeEvents: 0,
    completedEvents: 0,
    eventsWithoutVolunteers: 0,
    newVolunteers: 0
  });
  const [chartData, setChartData] = useState({
    volunteerActivity: [] as { date: string; Volunteers: number }[],
    failedEvents: [] as { year: string; count: number }[],
    newVolunteersByYear: [] as { year: string; count: number }[]
  });
  const [eventsNeedVolunteers, setEventsNeedVolunteers] = useState<Event[]>([]);

  const fetchWithErrorHandling = async <T,>(url: string): Promise<T | null> => {
    try {
      const res = await fetch(url);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${res.status}`
        );
      }
      
      return await res.json();
    } catch (err) {
      console.error('Fetch error:', err);
      setError(`Ошибка загрузки: ${err instanceof Error ? err.message : String(err)}`);
      return null;
    }
  };

  const formatActivityData = (data: VolunteerActivity[]): { date: string; Volunteers: number }[] => {
    const monthMap: Record<string, string> = {
      "January": "Январь",
      "February": "Февраль",
      "March": "Март",
      "April": "Апрель",
      "May": "Май",
      "June": "Июнь",
      "July": "Июль",
      "August": "Август",
      "September": "Сентябрь",
      "October": "Октябрь",
      "November": "Ноябрь",
      "December": "Декабрь"
    };

    const monthOrder = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    return data
      .map(item => ({
        month: item.month.trim(),
        count: item.count
      }))
      .sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month))
      .map(item => ({
        date: monthMap[item.month] || item.month,
        Volunteers: Number(item.count) || 0
      }));
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const courseParam = selectedCourse ? `?courseId=${selectedCourse}` : '';
        
        const data = await fetchWithErrorHandling<DashboardData>(
          `http://localhost:8080/api/analitic/dashboard-data${courseParam}`
        );

        if (!isMounted || !data) return;
        
        setCourses(data.courses);
        setStats({
          activeEvents: data.activeEvents,
          completedEvents: data.completedEvents,
          eventsWithoutVolunteers: data.eventsWithoutVolunteers,
          newVolunteers: data.newVolunteers
        });
        
        setChartData({
          volunteerActivity: formatActivityData(data.volunteerActivity),
          failedEvents: data.failedEvents.map(item => ({ 
            year: item.year, 
            count: Number(item.count) 
          })),
          newVolunteersByYear: data.newVolunteersByYear.map(item => ({
            year: item.year,
            count: Number(item.count)
          }))
        });
        
        setEventsNeedVolunteers(data.eventsNeedVolunteers);
      } catch (err) {
        if (isMounted) {
          console.error('Ошибка загрузки данных:', err);
          setError(`Ошибка: ${err instanceof Error ? err.message : String(err)}`);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [selectedCourse]);

  const courseOptions = [
    { value: "", label: "Все направления" },
    ...courses.map(c => ({ value: c.id.toString(), label: c.name }))
  ];

  const handleCourseChange = (value: string | null) => {
    setSelectedCourse(value);
  };

  if (error) {
    return (
      <Container size="xl" py="xl">
        <Alert 
          icon={<IconAlertCircle size="1rem" />} 
          title="Ошибка!" 
          color="red"
          variant="filled"
        >
          {error}
          <Text mt="md">Проверьте:
            <ul>
              <li>Запущен ли сервер</li>
              <li>Правильность URL адресов API</li>
              <li>Наличие CORS заголовков на сервере</li>
            </ul>
          </Text>
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl" pos="relative">
      <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />

      <Select
        label="Направление"
        placeholder="Выберите направление"
        data={courseOptions}
        value={selectedCourse}
        onChange={handleCourseChange}
        w={400}
        mb="md"
        clearable
      />

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md" mb="md">
        <Paper withBorder p="md" radius="md">
          <Text size="xs" c="dimmed" fw={700}>Активные мероприятия</Text>
          <Text fw={700} size="xl">{stats.activeEvents}</Text>
        </Paper>
        
        <Paper withBorder p="md" radius="md">
          <Text size="xs" c="dimmed" fw={700}>Проведено в этом году</Text>
          <Text fw={700} size="xl">{stats.completedEvents}</Text>
        </Paper>
        
        <Paper withBorder p="md" radius="md">
          <Text size="xs" c="dimmed" fw={700}>Требуются волонтеры</Text>
          <Text fw={700} size="xl">{stats.eventsWithoutVolunteers}</Text>
        </Paper>
        
        <Paper withBorder p="md" radius="md">
          <Text size="xs" c="dimmed" fw={700}>Новых волонтеров</Text>
          <Text fw={700} size="xl">{stats.newVolunteers}</Text>
        </Paper>
      </SimpleGrid>

      <Paper shadow="md" radius="lg" withBorder p="xl" mb="md">
        <Title order={1} mb="xl">Активность волонтеров</Title>  
        <AreaChart
          h={300}
          data={chartData.volunteerActivity}
          dataKey="date"
          series={[{ name: 'Volunteers', color: 'orange' }]}
          curveType="linear"
          connectNulls
          tooltipProps={{
            content: CustomTooltip,
          }}
        />
      </Paper>

      <Grid gutter="md" mb="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="xl" radius="lg" withBorder p="xl">
            <Title order={2} mb="xl">Проваленные мероприятия по годам</Title>
            {chartData.failedEvents.length > 0 ? (
              <BarChart
                h={300}
                data={chartData.failedEvents} 
                dataKey="year"
                orientation="vertical"
                barProps={{ radius: 10 }}
                series={[{ 
                  name: 'count', 
                  color: 'red.6', 
                  label: 'Количество'
                }]}
                tooltipProps={{
                  formatter: (value) => [`${value} мероприятий`, null],
                  labelFormatter: (label) => `Год: ${label}`
                }}
              />
            ) : (
              <Text>Нет данных для отображения</Text>
            )}
          </Paper>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="xl" radius="lg" withBorder p="xl">
            <Title order={2} mb="xl">Новые волонтеры по годам</Title>
            {chartData.newVolunteersByYear.length > 0 ? (
              <BarChart
                h={300}
                data={chartData.newVolunteersByYear}
                dataKey="year"
                orientation="vertical"
                barProps={{ radius: 10 }}
                series={[{ 
                  name: 'count', 
                  color: 'green.6', 
                  label: 'Количество'
                }]}
                tooltipProps={{
                  formatter: (value) => [`${value} волонтеров`, null],
                  labelFormatter: (label) => `Год: ${label}`
                }}
              />
            ) : (
              <Text>Нет данных для отображения</Text>
            )}
          </Paper>
        </Grid.Col>
      </Grid>

      <Demo events={eventsNeedVolunteers} />
    </Container>
  );
}