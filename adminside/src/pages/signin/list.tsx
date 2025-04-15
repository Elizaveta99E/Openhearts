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
  List,
  Anchor,
  Flex
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useMask } from '@react-input/mask';
import { IconPhone, IconCheck } from '@tabler/icons-react';
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

  const [checked, setChecked] = useState(false);

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

        <Button 
          component="a" 
          href="/some-page" 
          target="_blank"
          mt={10} ml={60} leftSection={<Image src="./public/backArrow.svg" alt="Назад" w={24} h={24} />} variant="default" style={{ border: 'none'}}>
          <Text size='20px'>Назад</Text>
        </Button>

        <Group justify='center' mt={40} style={{ flexDirection: 'column', gap:'20px' }}>

          <Title order={1} size={40} mb={25}>Регистрация сотрудника</Title>
          
          <Select
            w={400}
            data={['Администратор', 'Координатор', 'Менеджер']}
            placeholder="Роль"
            required
            styles={{
              input:{
                color:'black',
                borderColor:'#878787',
              }
            }}
          />

          <TextInput
            w={400}
            placeholder="ФИО"
            required
            styles={{
              input:{
                color:'black',
                borderColor:'#878787',
              }
            }}
          />
          
          <DateInput
            w={400}
            placeholder="Дата рождения"
            valueFormat="DD.MM.YYYY" // Формат отображения
            dateParser={(input) => {
            // Парсинг введенной даты
            const parts = input.split('.');
            if (parts.length === 3) {
              const [day, month, year] = parts;
              return new Date(`${year}-${month}-${day}`);
            }
            return null;
            }}
            rightSection={<Image src="./public/calendar.svg" alt="Календарь" w={20} h="auto" />}
            styles={{
              input: {
                color: 'black',
                borderColor: '#878787',
              }
            }}
          />

          <Input
            w={400}
            rightSection={<Image src="./public/email.svg" alt="Назад" w={20} h='auto' />}
            placeholder="Электронная почта"
            styles={{
              input:{
                color:'black',
                borderColor:'#878787',
              }
            }}
          />

          <TextInput
            w={400}
            ref={inputRef}
            rightSection={<IconPhone width={20} />}
            placeholder="Телефон"
            styles={{
              input: {
                color:'black',
                borderColor:'#878787',
                paddingLeft: '40px !important',
              }
            }}
          />

          <PasswordInput
            w={400}
            placeholder="Пароль"
            required
            visibilityToggleIcon={({ reveal }) =>
              (reveal ? <img src="./public/openEye.svg" width={20} /> : <img src="./public/closedEye.svg" width={20} />
            )}
            styles={{
              input:{
                color:'black',
                borderColor:'#878787',
              }
            }}
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
            visibilityToggleIcon={({ reveal }) => (reveal ? <img src="./public/openEye.svg" width={20} /> : <img src="./public/closedEye.svg" width={20} />)}
            styles={{
              input:{
                color:'black',
                borderColor:'#878787',
              }
            }}
          />

          <Flex w={400} h="auto" justify="center" align="center" direction="row" gap={20}>
            <Button
              miw={34}
              mih={34}
              p={0}
              variant="outline"
              onClick={() => setChecked(!checked)}
              styles={{
                root: {
                  borderRadius: '10px',
                  border: checked ? '1px solid #FF4A01' : '1px solid #878787',
                  backgroundColor: checked ? '#FF4A01' : 'white',
                  position: 'relative',
                  overflow: 'hidden',
                },
              }}
              >
              <IconCheck
                size={30}
                style={{
                  color: 'white',
                  opacity: checked ? 1 : 0,
                  transform: `scale(${checked ? 1 : 0.5})`,
                }}
              />
            </Button>
            <Text size='14px' style={{ wordBreak: "keep-all" }}>Соглашаюсь на{' '}
              <Anchor href="./static/documents/agreement.docx" target="_blank" underline="never" c="#ff4a01">
                обработку моих персональных данных
              </Anchor>
              , с{' '}
              <Anchor href="./static/documents/agreement.docx" target="_blank" underline="never" c="#ff4a01">
                правилами пользования сайтом{' '}
              </Anchor>
              и принимаю{' '}
              <Anchor href="./static/documents/agreement.docx" target="_blank" underline="never" c="#ff4a01">
                Пользовательское соглашение*
              </Anchor>
            </Text>
          </Flex>

          <Button
            w={400}
            variant="filled"
            color="primary.0"
            fw="normal">
              Зарегистрироваться
          </Button>
        
        </Group>

      </Container>
    </MantineProvider>

  </> 
  );
}