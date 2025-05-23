import { Title, TextInput, Select, Group, Stack, Button, Text, LoadingOverlay } from '@mantine/core';
import { Table } from '@mantine/core';
import { Pagination } from '@mantine/core';
import { IconSearch, IconPlus, IconArrowRight } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface StaffMember {
  id: number;
  name: string;
  phone: string;
  birthday: string;
  StaffRole: {
    name: string;
  };
  users: Array<{
    mail: string;
    regDate: string;
  }>;
}

export function StaffList() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState<string>('10');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('От А-Я');
  const [totalPages, setTotalPages] = useState(1);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/stafftable?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}&searchField=name&sort=${sortBy}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setStaff(data.staff);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [currentPage, itemsPerPage, searchTerm, sortBy]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value: string | null) => {
    if (value) {
      setItemsPerPage(value);
      setCurrentPage(1);
    }
  };

  const handleSortChange = (value: string | null) => {
    if (value) {
      setSortBy(value);
      setCurrentPage(1);
    }
  };

  const rows = staff.map((member) => {
    const user = member.users.length > 0 ? member.users[0] : null;
    
    return (
      <Table.Tr key={member.id}>
        <Table.Td>{member.id}</Table.Td>
        <Table.Td>{user?.mail || 'Нет данных'}</Table.Td>
        <Table.Td>{member.name}</Table.Td>
        <Table.Td>{member.phone}</Table.Td>
        <Table.Td>{user?.regDate || 'Нет данных'}</Table.Td>
        <Table.Td>{member.birthday}</Table.Td>
        <Table.Td>{member.StaffRole?.name || 'Нет данных'}</Table.Td>
        <Table.Td>
          <Button
            component={Link}
            to={`/staff/${member.id}`}
            rightSection={<IconArrowRight size={14} />}
            variant="subtle"
            size="xs"
          >
            Перейти
          </Button>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <>
      <Text size="xs">Таблицы/Сотрудники</Text>
      <Stack gap="lg">
        <Group justify="space-between">
          <Title order={1}>Сотрудники</Title>
          <Group>
            <TextInput
              placeholder="Поиск по имени..."
              leftSection={<IconSearch size={16} />}
              value={searchTerm}
              onChange={handleSearchChange}
              w={300}
            />
            <Button leftSection={<IconPlus size={16} />}>Добавить</Button>
          </Group>
        </Group>
      </Stack>

      <Group justify="space-between" mt="md">
        <Select
          label="Количество записей на странице"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          data={['1','2','5', '10', '20', '50']}
        />
        
        <Pagination 
          total={totalPages} 
          value={currentPage}
          onChange={setCurrentPage}
          styles={{ control: { width: 30 } }}
        />
        
        <Select
          label="Сортировать"
          value={sortBy}
          onChange={handleSortChange}
          data={['От А-Я', 'От Я-А', 'Самые молодые', 'Самые взрослые']}
        />
      </Group>

      <Table.ScrollContainer minWidth={800}>
        <Table striped highlightOnHover mt="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>ФИО</Table.Th>
              <Table.Th>Телефон</Table.Th>
              <Table.Th>Дата регистрации</Table.Th>
              <Table.Th>Дата рождения</Table.Th>
              <Table.Th>Роль</Table.Th>
              <Table.Th>Действия</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {loading ? (
              <Table.Tr>
                <Table.Td colSpan={8}>
                  <LoadingOverlay visible={loading} />
                </Table.Td>
              </Table.Tr>
            ) : (
              rows.length > 0 ? rows : (
                <Table.Tr>
                  <Table.Td colSpan={8} style={{ textAlign: 'center' }}>
                    <Text c="dimmed">Нет данных для отображения</Text>
                  </Table.Td>
                </Table.Tr>
              )
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Group justify="space-between" mt="md">
        <Text c="dimmed">Всего записей: {staff.length}</Text>
        <Pagination 
          total={totalPages} 
          value={currentPage}
          onChange={setCurrentPage}
          styles={{ control: { width: 30 } }}
        />
        <Button leftSection={<IconPlus size={16} />}>Добавить сотрудника</Button>
      </Group>
    </>
  );
}