import { Modal, PasswordInput, Button, Group, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';

interface SetPasswordModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  isLoading: boolean;
}

export default function SetPasswordModal({
  opened,
  onClose,
  onSubmit,
  isLoading
}: SetPasswordModalProps) {
  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validate: {
      password: (value) => (value.length >= 6 ? null : 'Пароль должен содержать минимум 6 символов'),
      confirmPassword: (value, values) =>
        value === values.password ? null : 'Пароли не совпадают'
    }
  });

  const handleSubmit = (values: typeof form.values) => {
    onSubmit(values.password);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Установка пароля"
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Text size="sm" color="dimmed">
            Установите новый пароль для пользователя
          </Text>

          <PasswordInput
            label="Новый пароль"
            placeholder="Введите пароль"
            {...form.getInputProps('password')}
          />

          <PasswordInput
            label="Подтвердите пароль"
            placeholder="Повторите пароль"
            {...form.getInputProps('confirmPassword')}
          />

          <Group mt="md">
            <Button variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" loading={isLoading}>
              Установить пароль
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}