import { Group, Button, Text, useMantineTheme, MantineTheme } from '@mantine/core';
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useRef } from 'react';

function getIconColor(status, theme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}


export const dropzoneChildren = (status, theme) => (
  <Group hidden position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
    <div>
      <Text size="xl" inline>
        Drag images here or click to select files
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Attach as many files as you like, each file should not exceed 5mb
      </Text>
    </div>
  </Group>
);

export function UploadImage() {
  const theme = useMantineTheme();
  const openRef = useRef();
  return (
    <>
    <Dropzone
        openRef={openRef}
      onDrop={(files) => console.log('accepted files', files)}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
    >
      {(status) => dropzoneChildren(status, theme)}
    </Dropzone>
    <Group position="center" mt="md">
        <Button onClick={() => openRef.current()}>Select files</Button>
      </Group>
    </>
  );
}

export function UploadPDF() {
    const theme = useMantineTheme();
    const openRef = useRef();
    return (
      <>
      <Dropzone
          openRef={openRef}
        onDrop={(files) => console.log('accepted files', files)}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={PDF_MIME_TYPE}
      >
        {(status) => dropzoneChildren(status, theme)}
      </Dropzone>
      <Group position="center" mt="md">
          <Button onClick={() => openRef.current()}>Select files</Button>
        </Group>
      </>
    );
  }

  export function UploadSpreadshit() {
    const theme = useMantineTheme();
    const openRef = useRef();
    return (
      <>
      <Dropzone
          openRef={openRef}
        onDrop={(files) => console.log('accepted files', files)}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={MS_EXCEL_MIME_TYPE}
      >
        {(status) => dropzoneChildren(status, theme)}
      </Dropzone>
      <Group position="center" mt="md">
          <Button onClick={() => openRef.current()}>Select files</Button>
        </Group>
      </>
    );
  }

  export function UploadDocument() {
    const theme = useMantineTheme();
    const openRef = useRef();
    return (
      <>
      <Dropzone
          openRef={openRef}
        onDrop={(files) => console.log('accepted files', files)}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={MS_WORD_MIME_TYPE}
      >
        {(status) => dropzoneChildren(status, theme)}
      </Dropzone>
      <Group position="center" mt="md">
          <Button onClick={() => openRef.current()}>Select files</Button>
        </Group>
      </>
    );
  }

  export function UploadPresentation() {
    const theme = useMantineTheme();
    const openRef = useRef();
    return (
      <>
      <Dropzone
          openRef={openRef}
        onDrop={(files) => console.log('accepted files', files)}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={MS_POWERPOINT_MIME_TYPE}
      >
        {(status) => dropzoneChildren(status, theme)}
      </Dropzone>
      <Group position="center" mt="md">
          <Button onClick={() => openRef.current()}>Select files</Button>
        </Group>
      </>
    );
  }

  export function UploadVideo() {
    const theme = useMantineTheme();
    const openRef = useRef();
    return (
      <>
      <Dropzone
          openRef={openRef}
        onDrop={(files) => console.log('accepted files', files)}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={[MIME_TYPES.mp4]}
      >
        {(status) => dropzoneChildren(status, theme)}
      </Dropzone>
      <Group position="center" mt="md">
          <Button onClick={() => openRef.current()}>Select files</Button>
        </Group>
      </>
    );
  }

  export function UploadAudio() {
    const theme = useMantineTheme();
    const openRef = useRef();
    return (
      <>
      <Dropzone
          openRef={openRef}
        onDrop={(files) => console.log('accepted files', files)}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={[MIME_TYPES.mp3]}
      >
        {(status) => dropzoneChildren(status, theme)}
      </Dropzone>
      <Group position="center" mt="md">
          <Button onClick={() => openRef.current()}>Select files</Button>
        </Group>
      </>
    );
  }

  export function UploadAny() {
    const theme = useMantineTheme();
    const openRef = useRef();
    return (
      <>
      <Dropzone
          openRef={openRef}
        onDrop={(files) => console.log('accepted files', files)}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
      >
        {(status) => dropzoneChildren(status, theme)}
      </Dropzone>
      <Group position="center" mt="md">
          <Button onClick={() => openRef.current()}>Select files</Button>
        </Group>
      </>
    );
  }

  