import { useState } from 'react';
import { Container, Stepper } from '@mantine/core';

export function StyledStepper(props) {
  return (
    <Container my={40} size={600} >
    <Stepper
    size='xs'
      styles={{
        stepBody: {
          display: 'none',
        },

        step: {
          padding: 0,
        },

        stepIcon: {
          borderWidth: 4,
        },

        separator: {
          marginLeft: -2,
          marginRight: -2,
          height: 10,
        },
      }}
      {...props}
    />
    </Container>
  );
}