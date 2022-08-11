import { Loader, Center } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';


const LoaderCard = () => {
    const { height, width } = useViewportSize()
    return (
        <Center style={{height: height, width: width}}>
            <Loader variant='dots' />
        </Center>
    )
}

export default LoaderCard;


