import { useState } from 'react';
import cx from 'clsx';
import { MantineProvider,
  Container,
  createTheme,
  Title,
  Group,
  Avatar,
  Select,
  TextInput,
  Image,
  Button,
  Input,
  Flex
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useMask } from '@react-input/mask';
import { IconChevronRight, IconChevronLeft, IconPhone } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import classes from '../Demo.module.css';

const theme = createTheme({
    components: {
      Container: Container.extend({
        classNames: (_, { size }) => ({
          root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
        }),
      }),
    },
  });

export function WorkerEditProfile() {
    const [value, setValue] = useState('Clear me');

    const inputRef = useMask({ 
        mask: '+7 (___) ___-__-__', 
        replacement: { _: /\d/ } 
      });

    return(
      <>

      <MantineProvider theme={theme}>

          <Container size="responsive">

            <Group justify='center' mt={40} style={{ flexDirection: 'column', gap:'20px' }}>

                <Title order={1} size={40} mb={25}>Редактировать профиль</Title>

                <Avatar className={classes.avatar} src="avatar.png" alt="аватар"></Avatar>

                <Select
                    w={400}
                    radius={10}
                    data={['Администратор', 'Координатор', 'Менеджер']}
                    placeholder="Роль"
                    rightSection={<Image src="./public/downArrow.svg" w={24}/>}
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
                radius={10}
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
                    radius={10}
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
                    nextIcon={<IconChevronRight size={16}/>}
                    previousIcon={<IconChevronLeft size={16}/>}
                />

                <Input
                    w={400}
                    radius={10}
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
                    radius={10}
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

                <Flex justify="space-between">
                    <Button component={Link} to="/" variant="transparent" style={{fontSize:"24px", fontWeight:"normal"}}>Сменить пароль</Button>
                    <Button className={classes.grayButton} variant="outline" color="#c6c6c6" size='md'>Удалить аккаунт</Button>
                </Flex>

            </Group>

          </Container>

      </MantineProvider>
      
      </>
    );
}