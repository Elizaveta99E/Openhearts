import { useState } from 'react';
import {
  Avatar,
  Text,
  Button,
  Paper,
  Title,
  Divider,
  Group,
  Stack,
  LoadingOverlay,
  Notification
} from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IconCheck, IconX } from '@tabler/icons-react';
import { getUserProfile, updateProfile, setPassword } from '../../api/userApi';
import EditProfileModal from './EditProfileModal';
import SetPasswordModal from './SetPasswordModal';

export default function UserProfile() {
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [passwordModalOpened, setPasswordModalOpened] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    success: boolean;
    message: string;
  }>({ show: false, success: false, message: '' });

  // Получение данных профиля (используем один запрос)
  const { 
    data: userData, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
    onError: () => {
      setNotification({
        show: true,
        success: false,
        message: 'Ошибка загрузки профиля'
      });
    }
  });

  // Мутация для обновления профиля
  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      refetch();
      setNotification({
        show: true,
        success: true,
        message: 'Профиль успешно обновлен'
      });
      setEditModalOpened(false);
    },
    onError: () => {
      setNotification({
        show: true,
        success: false,
        message: 'Ошибка при обновлении профиля'
      });
    }
  });

  // Мутация для установки пароля
  const setPasswordMutation = useMutation({
    mutationFn: setPassword,
    onSuccess: () => {
      setNotification({
        show: true,
        success: true,
        message: 'Пароль успешно установлен'
      });
      setPasswordModalOpened(false);
    },
    onError: () => {
      setNotification({
        show: true,
        success: false,
        message: 'Ошибка при установке пароля'
      });
    }
  });

  const handleEditSubmit = (values: {
    birthDate: string;
    phone: string;
    email: string;
  }) => {
    updateProfileMutation.mutate(values);
  };

  const handleSetPassword = (password: string) => {
    setPasswordMutation.mutate(password);
  };

  if (isLoading) {
    return <LoadingOverlay visible />;
  }

  if (error) {
    return (
      <Paper p="md" radius="md" shadow="sm">
        <Text color="red">Ошибка загрузки профиля</Text>
        <Button mt="md" onClick={() => refetch()}>
          Повторить попытку
        </Button>
      </Paper>
    );
  }

  if (!userData) {
    return <Text>Данные профиля отсутствуют</Text>;
  }

  return (
    <Paper p="md" radius="md" shadow="sm" style={{ maxWidth: 400, margin: '0 auto' }}>
      <Stack align="center" gap="md">
        {/* Уведомления */}
        {notification.show && (
          <Notification
            title={notification.success ? 'Успех' : 'Ошибка'}
            color={notification.success ? 'teal' : 'red'}
            icon={notification.success ? <IconCheck /> : <IconX />}
            onClose={() => setNotification({ ...notification, show: false })}
            style={{ width: '100%' }}
          >
            {notification.message}
          </Notification>
        )}

        {/* Аватар */}
        <Avatar 
          src={userData.avatar || 'https://placehold.co/200x200?text=No+Avatar'} 
          size={200} 
          radius={100} 
          alt="Аватар пользователя"
        />
        
        {/* Кнопка редактирования */}
        <Button 
          variant="light" 
          onClick={() => setEditModalOpened(true)}
          loading={updateProfileMutation.isPending}
        >
          Редактировать профиль
        </Button>
        
        <Divider my="sm" style={{ width: '100%' }} />
        
        {/* Основная информация */}
        <Title order={4} style={{ alignSelf: 'flex-start' }}>
          Основная информация
        </Title>
        
        <Stack style={{ width: '100%' }}>
          <Group justify="space-between">
            <Text color="dimmed">Дата регистрации:</Text>
            <Text>{userData.registrationDate || 'Не указана'}</Text>
          </Group>
          
          <Group justify="space-between">
            <Text color="dimmed">Дата рождения:</Text>
            <Text>{userData.birthDate || 'Не указана'}</Text>
          </Group>
          
          <Group justify="space-between">
            <Text color="dimmed">Номер телефона:</Text>
            <Text>{userData.phone || 'Не указан'}</Text>
          </Group>
          
          <Group justify="space-between">
            <Text color="dimmed">Почта:</Text>
            <Text>{userData.email || 'Не указана'}</Text>
          </Group>
        </Stack>
        
        {/* Кнопка назначения пароля */}
        <Button 
          variant="outline" 
          mt="md"
          onClick={() => setPasswordModalOpened(true)}
          loading={setPasswordMutation.isPending}
        >
          Назначить пароль
        </Button>
      </Stack>

      {/* Модальные окна */}
      <EditProfileModal
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        onSubmit={handleEditSubmit}
        initialValues={{
          birthDate: userData.birthDate,
          phone: userData.phone,
          email: userData.email
        }}
        isLoading={updateProfileMutation.isPending}
      />

      <SetPasswordModal
        opened={passwordModalOpened}
        onClose={() => setPasswordModalOpened(false)}
        onSubmit={handleSetPassword}
        isLoading={setPasswordMutation.isPending}
      />
    </Paper>
  );
}