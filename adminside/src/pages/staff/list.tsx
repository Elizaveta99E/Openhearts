import { Title, TextInput } from '@mantine/core';

import { IconAt } from '@tabler/icons-react';
const icon = <IconAt size={16} />;
export function StaffList() {
    const icon = <IconAt size={16} />;
    return <>
        <Title order={1}>Сотрудники</Title>
        <TextInput
            leftSectionPointerEvents="none"
            leftSection={icon}
            label="Input label"
            description="Input description"
            placeholder="Input placeholder"
        />
    </>
}