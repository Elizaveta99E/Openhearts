import { useState } from 'react';
import cx from 'clsx';
import { MantineProvider,
  Container,
  createTheme,
  Image,
  Group,
  Button,
  Text,
  Title,
  Select,
  TextInput,
  Input,
  PasswordInput,
  Paper,
  List
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useMask } from '@react-input/mask';
import { IconPhone } from '@tabler/icons-react';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
      }),
    }),
  },
});

export function SignIn() {
  const [value, setValue] = useState('Clear me');

  const inputRef = useMask({ 
    mask: '+7 (___) ___-__-__', 
    replacement: { _: /\d/ } 
  });

  return (
  <>
    
    <MantineProvider theme={theme}>
      <Container size="responsive">

        <Image
        h={42}
        w={296}
        fit="contain"
        mt={50}
        src="./public/logo.svg"
        />

        <Group justify="left" mt={10}>
          <Button ml={60} leftSection={<Image src="./public/backArrow.svg" alt="Назад" w={24} h={24} />} variant="default" style={{ border: 'none'}}>
            <Text size='20px'>Назад</Text>
          </Button>
        </Group>

        <Group justify='center' mt={40} style={{ flexDirection: 'column', gap:'20px' }}>

          <Title order={1} size={40} mb={25}>Регистрация сотрудника</Title>
          
          <Select
          w={400}
          data={['Администратор', 'Координатор', 'Менеджер']}
          placeholder="Роль"
          required
          />

          <TextInput
          w={400}
          placeholder="ФИО"
          required
          />
          
          <DateInput
          w={400}
          placeholder="Дата рождения"
          rightSection={<Image src="./public/calendar.svg" alt="Назад" w={20} h='auto' />}
          />

          <Input
          w={400}
          rightSection={<Image src="./public/email.svg" alt="Назад" w={20} h='auto' />}
          placeholder="Электронная почта"
          />

          <TextInput
          w={400}
          ref={inputRef}
          rightSection={<IconPhone width={20} />}
          placeholder="Телефон"
          styles={{
          input: {
          paddingLeft: '40px !important',
          }
          }}
          />

          <PasswordInput
          w={400}
          placeholder="Пароль"
          required
          visibilityToggleIcon={({ reveal }) => (reveal ? <img src="./public/openEye.svg" width={20} /> : <img src="./public/closedEye.svg" width={20} />
          )}
          />

          <Paper radius={30} p={20} bg="#c6c6c6" w={400}>
            <Text style={{color:'#ffffff'}} fw={"bold"}>
            Пароль должен содержать:
              <List>
                <List.Item>минимум 6 символов</List.Item>
                <List.Item>заглавные буквы (A-Z)</List.Item>
                <List.Item>cтрочные буквы (a-z)</List.Item>
                <List.Item>цифры (0-9)</List.Item>
                <List.Item>спецсимволы (!@#$%^&*)</List.Item>
              </List>
            </Text>
          </Paper>

          <PasswordInput
          w={400}
          placeholder="Повторите пароль"
          required
          visibilityToggleIcon={({ reveal }) => (reveal ? <img src="./public/openEye.svg" width={20} /> : <img src="./public/closedEye.svg" width={20} />
          )}
          />

          <Button variant="default" radius="md">
            <Image src></Image>
          </Button>

        </Group>

      </Container>
    </MantineProvider>

    </> 
    );
}