import { useState } from 'react';
import cx from 'clsx';
import { MantineProvider,
  Container,
  createTheme,
  Flex
} from '@mantine/core';
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

export function WorkerAccount() {
    const [value, setValue] = useState('Clear me');

    return(
      <>

      <MantineProvider theme={theme}>

          <Container size="responsive">

            <Flex>
              
            </Flex>

          </Container>

      </MantineProvider>
      
      </>
    );
}