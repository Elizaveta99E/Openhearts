import { useState } from 'react';
import cx from 'clsx';
import { MantineProvider,
  Container,
  createTheme,
  Flex,
  Paper,
  Title,
  Text,
  Avatar,
  Group,
  Stack,
  Button, Textarea
} from '@mantine/core';
import classes from '../Demo.module.css';
import { Link } from 'react-router-dom'; 

const theme = createTheme({
    components: {
      Container: Container.extend({
        classNames: (_, { size }) => ({
          root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
        }),
      }),
    },
  });

export function VolunteerAccount() {
    const [value, setValue] = useState('Clear me');

    return(
      <>

      <MantineProvider theme={theme}>

          <Container className={classes.responsiveContainer}>

            <Text className={classes.pagination}>Таблицы/Волонтеры/id</Text>

            <Flex direction={{base: 'column', md: 'row'}}  className={classes.flexes} wrap="wrap">

              <Stack align='center' >

                <Paper className={classes.mainInfoPaper}>
                  <Avatar className={classes.avatar} src="avatar.png" alt="аватар" />
                  <Title className={classes.header4}>Основная информация</Title>
                  <Group className={classes.mainInformation} align="flex-start">
                    <Text>
                      <Text className={classes.textMainInfo}>Дата регистрации:</Text>
                      {/* {userData.registrationDate} */}
                    </Text>
                    <Text>
                      <Text className={classes.textMainInfo}>Дата рождения:</Text>
                      {/* {userData.birthDate} */}
                    </Text>
                    <Text>
                      <Text className={classes.textMainInfo}>Номер телефона:</Text>
                      {/* {userData.phone} */}
                    </Text>
                    <Text>
                      <Text className={classes.textMainInfo}>Почта:</Text>
                      {/* {userData.email} */}
                    </Text>
                  </Group>
                  <Group justify="center">    
                       <Button className={classes.grayButton} justify="center"  variant="outline" color="#FF4A01" size='md'>Сбросить пароль</Button>
                  </Group>
                </Paper>
                <Paper className={classes.mainInfoPaper} style={{ width: '300px' }}>
                <Textarea
                    variant="unstyled"
                    label={
                        <Text className={classes.header4} style={{ fontWeight: 700 }}>
                          Комментарий
                        </Text>
                      }
                    autosize
                    minRows={2}
                />
                </Paper>
                <Button className={classes.grayButton} variant="outline" color="#FF4A01" size='md'>Заблокировать</Button>

              </Stack>

              <Stack w="auto">

                <Title className={classes.header4}>ФИО</Title>
                <Title className={classes.header4}>ID волонтера: </Title>

                <Paper className={classes.mainInfoPaper}>
                  <Title className={classes.header4}>Ближайшие мероприятия</Title>
                </Paper>

                <Paper className={classes.mainInfoPaper}>
                  <Title className={classes.header4}>Список пройденных мероприятия</Title>
                </Paper>

              </Stack>
              
              
            </Flex>

          </Container>

      </MantineProvider>
      
      </>
    );
}