import { Modal, TextInput, Button, Group, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';

interface EditProfileModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: {
    birthDate: string;
    phone: string;
    email: string;
  }) => void;
  initialValues: {
    birthDate: string;
    phone: string;
    email: string;
  };
  isLoading: boolean;
}

export default function EditProfileModal({
  opened,
  onClose,
  onSubmit,
  initialValues,
  isLoading
}: EditProfileModalProps) {
  const form = useForm({
    initialValues: {
      birthDate: initialValues.birthDate,
      phone: initialValues.phone,
      email: initialValues.email
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Некорректный email'),
      phone: (value) => (value.length > 5 ? null : 'Некорректный номер телефона')
    }
  });

  const handleSubmit = (values: typeof form.values) => {
    onSubmit({
      ...values,
      birthDate: values.birthDate
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Редактирование профиля"
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <DatePickerInput
            label="Дата рождения"
            placeholder="Выберите дату"
            {...form.getInputProps('birthDate')}
          />

          <TextInput
            label="Номер телефона"
            placeholder="+7 XXX XXX XX XX"
            {...form.getInputProps('phone')}
          />

          <TextInput
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />

          <Group mt="md">
            <Button variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" loading={isLoading}>
              Сохранить
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}