import { useState } from 'react';
import { Input, CloseButton,Button } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';

export function SignIn() {
  const [value, setValue] = useState('Clear me');
  return (
    <>
    
      <Input placeholder="Your email" leftSection={<IconAt size={16}/>} />
      <Input
        placeholder="Clearable input"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        rightSectionPointerEvents="all"
        mt="md"
        w="xs"
        rightSection={
          <CloseButton
            aria-label="Clear input"
            onClick={() => setValue('')}
            style={{ display: value ? undefined : 'none' }}
          />
        }
      />
      <Button variant="filled" color='blue'>Button</Button>
    </>
  );
}