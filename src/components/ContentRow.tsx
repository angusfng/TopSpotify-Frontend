import {
  Box,
  Flex,
  Heading,
  Td,
  Tr,
  Image,
  useMediaQuery,
  useColorModeValue,
} from "@chakra-ui/react";
import SpotifyButton from "./SpotifyButton";

interface ContentRowProps {
  id: string;
  idx: number;
  imageSrc: string;
  name: string;
  children: React.ReactNode;
  spotifyLink: string;
}

const ContentRow = ({
  id,
  idx,
  imageSrc,
  name,
  children,
  spotifyLink,
}: ContentRowProps) => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Tr
      key={id}
      _hover={{
        background: bg,
      }}
    >
      <Td fontSize="xl">{idx + 1}</Td>
      <Td w="79%">
        <Flex align="center">
          <Image boxSize="90px" minW="90px" borderRadius="md" src={imageSrc} />
          <Box mx="1rem">
            <Heading as="h4" size="sm" fontWeight="semibold" mb="0.5rem">
              {name}
            </Heading>
            <Box>{children}</Box>
          </Box>
        </Flex>
      </Td>
      {isLargerThan600 && (
        <Td textAlign="center">
          <SpotifyButton href={spotifyLink} />
        </Td>
      )}
    </Tr>
  );
};

export default ContentRow;
