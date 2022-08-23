import { Group, Button, Text, useMantineTheme, MantineTheme } from '@mantine/core';
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useRef } from 'react';
import { uploadFile } from 'lib/upload';

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

export function UploadImage( props ) {
  const handleFileInput = (e) => {
    console.log(e.target.files[0])
    uploadFile(e.target.files[0], props.position)
}
  
  return (
    <>
    <Group position="center" mt="md">
    <input type='file' onChange={handleFileInput} accept="image/jpeg,image/gif,image/png"  />
      </Group>
    </>
  );
}

export function UploadPDF( props ) {
    const handleFileInput = (e) => {
      console.log(e.target.files[0])
      uploadFile(e.target.files[0], props.position)
  }
    
    return (
      <>
      <Group position="center" mt="md">
      <input type='file' onChange={handleFileInput} accept="application/pdf application/vnd.ms-excel"  />
        </Group>
      </>
    );
  }

  export function UploadSpreadshit(props) {
    const handleFileInput = (e) => {
      uploadFile(e.target.files[0], props.position)
  }
    
    return (
      <>
      <Group position="center" mt="md">
      <input type='file' onChange={handleFileInput} accept="application/vnd.ms-excel"  />
        </Group>
      </>
    );
  }

  export function UploadDocument(props) {
    const theme = useMantineTheme();
    const openRef = useRef();
    return (
      <>
      <Dropzone
          openRef={openRef}
        onDrop={(files) => uploadFile(files, props.position)}
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

  export function UploadPresentation(props) {
    const theme = useMantineTheme();
    const openRef = useRef();
    return (
      <>
      <Dropzone
          openRef={openRef}
        onDrop={(files) => uploadFile(files, props.position)}
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

  export function UploadVideo(props) {
    const theme = useMantineTheme();
    const openRef = useRef();
    return (
      <>
      <Dropzone
          openRef={openRef}
        onDrop={(files) => uploadFile(files, props.position)}
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

  export function UploadAudio(props) {
    const theme = useMantineTheme();
    const openRef = useRef();
    return (
      <>
      <Dropzone
          openRef={openRef}
        onDrop={(files) => uploadFile(files, props.position)}
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

  export function UploadAny(props) {
    const theme = useMantineTheme();
    const openRef = useRef();
    return (
      <>
      <Dropzone
          openRef={openRef}
        onDrop={(files) => uploadFile(files, props.position)}
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

  