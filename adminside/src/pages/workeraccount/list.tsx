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
  Button
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

export function WorkerAccount() {
    const [value, setValue] = useState('Clear me');

    return(
      <>

      <MantineProvider theme={theme}>

          <Container className={classes.responsiveContainer}>

            <Text className={classes.pagination}>Личная страничка сотрудника</Text>

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
                </Paper>

                <Button component={Link} to="/" variant="transparent" style={{fontSize:"24px", fontWeight:"normal"}}>Редактировать</Button>

                <Button className={classes.grayButton} variant="outline" color="#c6c6c6" size='md'>Выйти</Button>

              </Stack>

              <Stack w="auto">

                <Title className={classes.header4}>ФИО</Title>
                <Title className={classes.header4}>ID сотрудника: </Title>

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