import React from 'react';
import {
    Group, Loader
} from '@mantine/core';

export default function LoadingView(){
    return (
        <Group style={{marginTop: 'auto', marginBottom: 'auto'}} direction='column' align={'center'}>
            <Loader size={'sm'} />
        </Group>
    )
}